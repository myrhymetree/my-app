import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-backend-webgl';

function App() {
  const videoRef = useRef(null);
  const videoElement = null;

  useEffect(() => {
    async function setupCamera() {
      const stream = await navigator.mediaDevices.getUserMedia({ 'video': true });
      videoRef.current.srcObject = stream;
      return new Promise((resolve) => {
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          resolve(videoRef.current);
        };
      });
    }

    async function detectLandmarks() {
      const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
      const detectorConfig = {
        runtime: 'tfjs',
      };

      const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
      const estimationConfig = {flipHorizontal: false};
      
      setInterval(async () => {

        const predictions = await detector.estimateFaces(
          videoRef.current, estimationConfig);
          
        if (predictions.length > 0) {
          console.log(predictions[0].landmarks);
        } else {
          console.log('error');
        }
      }, 100);
    }

    setupCamera().then(detectLandmarks);
  }, []);

  return (
    <div className="App">
       <canvas id="output"></canvas>
      <video id="myVideo" ref={videoRef} style={{ width: '480', height: '480' }} autoPlay muted />
    </div>
  );
}

export default App;