// import { pipeline } from "https://cdn.jsdelivr.net/npm/@huggingface/transformers";

// // Start the Web Worker with the Transformers.js message handler.
// // This is the key change. This script now acts as a dedicated worker for the library.
// self.addEventListener("message", async (event) => {
//     const { type, payload } = event.data;

//     // Acknowledge the 'initiate' message from the main thread
//     if (type === "initiate") {
//         try {
//             const detector = await pipeline("object-detection", "Xenova/detr-resnet-50");
//             self.postMessage({ type: "ready" });
//         } catch (error) {
//             self.postMessage({ type: "error", message: `Model loading failed: ${error.message}` });
//         }
//     }

//     // Process the 'run' message with the image data
//     if (type === "run") {
//         try {
//             // The payload contains the image data. The pipeline function will handle it.
//             const results = await pipeline("object-detection", "Xenova/detr-resnet-50", payload);
//             self.postMessage({ type: "results", results });
//         } catch (error) {
//             self.postMessage({ type: "error", message: `Detection failed: ${error.message}` });
//         }
//     }
// });
