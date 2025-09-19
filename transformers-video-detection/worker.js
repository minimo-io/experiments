import { pipeline, env } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// This is required to make the library's internal workers function correctly
env.allowLocalModels = false;

let detector = null;

// Self-executing async function to load the model once when the worker starts
(async function () {
    try {
        // Load the pipeline and keep the detector object in scope
        detector = await pipeline("object-detection", "Xenova/detr-resnet-50");

        // Let the main thread know we're ready
        self.postMessage({ type: "ready" });
    } catch (error) {
        self.postMessage({ type: "error", message: `Model loading failed: ${error.message}` });
        console.error("Worker error during model loading:", error);
    }
})();

// Listen for messages from the main thread
self.onmessage = async (event) => {
    const { type, imageBitmap } = event.data;

    // Only process a 'detect' message if the detector has been loaded
    if (type === "detect" && detector) {
        try {
            // Create a temporary offscreen canvas to draw the bitmap
            const canvas = new OffscreenCanvas(imageBitmap.width, imageBitmap.height);
            const ctx = canvas.getContext("2d");
            ctx.drawImage(imageBitmap, 0, 0);

            // Use the canvas as input for the detector, which is a supported type
            const results = await detector(canvas, {
                threshold: 0.7,
                percentage: true,
            });

            // Send the results back to the main thread
            self.postMessage({ type: "results", results });
        } catch (error) {
            self.postMessage({ type: "error", message: `Detection failed: ${error.message}` });
            console.error("Worker error during detection:", error);
        }
    }
};
