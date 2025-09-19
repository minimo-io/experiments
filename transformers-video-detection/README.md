# Real-time In-Browser Object Detection with Transformers.js

This project demonstrates real-time object detection running entirely in a web browser. It uses a webcam feed and the [Hugging Face Transformers.js](https://huggingface.co/docs/transformers.js) library to identify objects in the video stream.

The application is built as a single, self-contained HTML file (`working-4.html`) that leverages modern web technologies to perform machine learning tasks on the client-side without needing a server backend for inference.

## Features

- **Real-time Object Detection**: Identifies and labels objects from a live webcam feed.
- **Client-Side ML**: The object detection model is downloaded and runs directly in the browser.
- **Responsive UI**: Utilizes a Web Worker to run the computationally intensive model inference, preventing the main UI thread from freezing and ensuring a smooth user experience.
- **Performance Optimized**:
    - Video frames are downscaled before processing to significantly speed up detection.
    - A frame-skipping mechanism ensures that a new frame is only processed after the previous one is complete, preventing a backlog of requests.
- **Visualization**: Overlays bounding boxes and labels directly onto the video feed and provides a list of currently detected objects with their confidence scores.

## How It Works

The application's logic is contained within `working-4.html` and operates on two main threads:

1.  **Main Thread**:
    - Handles user interaction (starting/stopping the webcam).
    - Manages the video and canvas elements.
    - Captures frames from the webcam.
    - Renders the video feed and the bounding boxes received from the worker.
    - Displays the list of detected objects.

2.  **Web Worker Thread**:
    - Initializes the object detection pipeline from Transformers.js.
    - The model (`Xenova/detr-resnet-50`) is downloaded from the Hugging Face Hub.
    - Receives downscaled video frames (as `ImageBitmap` objects) from the main thread.
    - Performs the object detection inference.
    - Sends the results (bounding boxes, labels, and scores) back to the main thread for display.

This separation ensures that the heavy computation of the model does not block the user interface.

## How to Use

1.  **Serve the file**: Due to browser security policies regarding `file://` access for webcam streams, you should serve the files using a local web server. A simple way to do this is with Python:

    ```bash
    # Navigate to the project directory in your terminal
    python -m http.server
    ```

    Or if you have Node.js:

    ```bash
    npx http-server
    ```

2.  **Open in browser**: Navigate to `http://localhost:8000/working-4.html` (or the appropriate URL provided by your server).

3.  **Start detection**:
    - Wait for the status message to change from "Loading model..." to "Model loaded. Ready to detect!".
    - Click the "Start Webcam" button.
    - Allow the browser to access your camera when prompted.

The application will start displaying the webcam feed with bounding boxes around any detected objects.
