import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import '@tensorflow/tfjs-core';
// Register WebGL backend.
import '@tensorflow/tfjs-backend-webgl';
import '@mediapipe/face_mesh';
import React, { useEffect, useState, useCallback, useRef } from 'react';
import imageUrl from './faceface.jpg';

function App() {
  const image = new Image();
  image.src = imageUrl;

  const imageRef = useRef(null);
  const canvasRef = useRef(null);

  const [faces, setFaces] = useState([]);
  const [loadedImage, setLoadedImage] = useState(null); // 이미지 상태 추가

  // async function init() {
  //   const image = new Image();
  //   image.src = imageUrl; // 오타 수정: imageUrl
  //   image.width = 100
  //   image.height = 100

  //   image.onload = async () => { // 이미지 로드 완료 후 처리
  //     setLoadedImage(imageUrl);

  //     const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
  //     const detectorConfig = {
  //       runtime: 'tfjs',
  //     };
  //     const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
  
  //     const estimationConfig = {flipHorizontal: false};
  //     const faces = await detector.estimateFaces(image, estimationConfig);
  //     console.log(faces);
  //     setFaces(faces);
  //   }
  // }

  async function detectLandmarks() {
    const model = faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh;
    const estimationConfig = {flipHorizontal: false};
    const detectorConfig = {
            runtime: 'tfjs',
          };

    const detector = await faceLandmarksDetection.createDetector(model, detectorConfig);
    
    const faces = await detector.estimateFaces(imageRef.current, estimationConfig);
    console.log(faces);
    if (faces.length > 0) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = 'red';

      for (let i = 0; i < faces[0].keypoints.length; i++) {
        const x = faces[0].keypoints[i][0];
        const y = faces[0].keypoints[i][1];
        ctx.fillRect(x, y, 2, 2); // 각 랜드마크를 2x2 크기의 빨간색 점으로 그립니다.
      }

      console.log(ctx);
    }
  }

  useEffect(
    () => {
  
      if (imageRef.current) {
        detectLandmarks();
      }
    }
  )

  return (
    <>
      <h1>얼굴 랜드마크</h1>
      
      <div id="stats"></div>
        <div id="main">
          <div className="container">
            <div className="canvas-wrapper">
              <canvas id="output"></canvas>
            </div>
             {/* 이미지 표시 */}
             <img ref={imageRef} src={imageUrl} alt="Face" onLoad={() => detectLandmarks()} style={{position: 'absolute'}} />
             <canvas ref={canvasRef} style={{position: 'absolute'}} />
          </div>
        </div>
        <div>
          
        </div>
    </>
  );
}

export default App;
