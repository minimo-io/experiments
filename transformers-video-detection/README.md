# Real-time In-Browser Object Detection with Transformers.js

This project demonstrates real-time object detection running entirely in a web browser. It uses a webcam feed and the [Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js) library to identify objects in the video stream.

The application is built as a single, self-contained HTML file (`working-4.html` is the best example -yet still unsatisfactory)
that leverages modern web technologies to perform machine learning tasks on the client-side without
needing a server backend for inference.

## Features

-   **Real-time Object Detection**: Identifies and labels objects from a live webcam feed.
-   **Client-Side ML**: The object detection model is downloaded and runs directly in the browser.
-   **Responsive UI**: Utilizes a Web Worker to run the computationally intensive model inference, preventing the main UI thread from freezing and ensuring a smooth user experience.
-   **Performance Optimized**:
    -   Video frames are downscaled before processing to significantly speed up detection.
    -   A frame-skipping mechanism ensures that a new frame is only processed after the previous one is complete, preventing a backlog of requests.
-   **Visualization**: Overlays bounding boxes and labels directly onto the video feed and provides a list of currently detected objects with their confidence scores.

## How It Works

The application's logic is contained within `working-4.html` and operates on two main threads:

1.  **Main Thread**: Handles UI, video rendering, and communication.
2.  **Web Worker Thread**: Runs the object detection model to avoid blocking the interface (not working fine).

## Achievements

-   Successfully demonstrated a proof-of-concept for a purely client-side, real-time object detection system using standard web technologies.
-   Correctly integrated the Hugging Face Transformers.js library to run a sophisticated AI model (`Xenova/detr-resnet-50`) directly in the browser.
-   Effectively used a Web Worker to offload the demanding inference task, ensuring the main application UI remained responsive (while still not working as expected probably due to inference response times).

## Challenges

-   **Performance Latency**: At least on our MacOS test host machine, there was too much latency in the model performing the object detection in relation to the image output. Even with optimizations like using Web Workers and downscaling frames, the results were still unsatisfactory for a truly smooth, real-time experience.

## Future Exploration

To improve performance and reduce latency, the following areas could be explored:

-   **Model Quantization**: Investigate using quantized models. Quantized models are smaller and computationally less expensive, which can lead to significant speedups. Check the Hugging Face Hub for quantized versions of the model (e.g., models with `-quantized` in their name).
-   **Alternative Models**: Experiment with lighter and faster object detection models that are specifically designed for edge devices, such as MobileDET, TinyYOLO, or a DETR model with a smaller backbone (like ResNet-18).
-   **Hardware Acceleration (WebGPU)**: Explicitly enable and test the WebGPU backend for Transformers.js. For supported hardware, WebGPU can offer superior performance over the default WebGL backend.
-   **Dynamic Performance Tuning**: Add UI controls to allow the user to adjust parameters in real-time, such as the processing resolution (`processScale`) or the confidence `threshold`, to find the best balance between accuracy and speed for their specific hardware.
-   **Advanced Frame Skipping**: Implement a more dynamic frame-processing strategy. Instead of simply waiting for the worker, the main thread could decide to process only every Nth frame to maintain a consistent frame rate.

## How to Use

1.  **Serve the file**: Use a local web server for best results.
    ```bash
    # With Python
    python -m http.server
    # Or with Node.js
    npx http-server
    ```
2.  **Open in browser**: Navigate to `http://localhost:8000/working-4.html`.
3.  **Start detection**: Wait for the model to load, then click "Start Webcam" and grant camera permissions.

## Future explorations

youtube.com/watch?v=PQKZk3zn7yc&source_ve_path=MTc4NDI0
