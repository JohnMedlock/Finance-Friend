import React, { useRef, useState, useEffect, use } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Vector3, Euler, RGBA_ASTC_10x10_Format } from 'three';
import './Profile3D.css';

const API_URL = 'http://localhost:3000/api';

// Model Component
function Model({ onResetRotation, modelData, ...props }) {
  // Dynamically load the GLB file from the URL returned by fetch
  const { scene } = useGLTF(modelData);
  const meshRef = useRef();

  // Store the initial rotation (example: tilt the head downward)
  const defaultRotation = new Euler(0, 0, 0);
  

  // Provide a way for the parent to reset the mesh rotation
  onResetRotation.current = () => {
    if (meshRef.current) {
      meshRef.current.rotation.copy(defaultRotation);
    }
  };

  return <primitive ref={meshRef} object={scene} {...props} />
}

// Main Component
export function Profile3D({ modelName = 'Snoop Dogg'}) {
  const controlsRef = useRef();
  const defaultCameraPosition = new Vector3(0, 0, 2.3);
  const modelResetRef = useRef(() => {}); // Function reference to reset model
  const [modelData, setModelData] = useState(null);

  // Fetch the model URL from the backend
  useEffect(() => {

    const email = localStorage.getItem('email');

    console.log('email:', email);

    const token = localStorage.getItem('token');

    fetch(`${API_URL}/download`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: email, modelName: modelName }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch model');
        }
        return response.blob();
      })
      .then((blob) => {
        // Create a local object URL from the blob
        const url = URL.createObjectURL(blob);
        setModelData(url);
      })
      .catch((error) => console.error('Error:', error));
    
  }, []);

  // Smoothly animate the camera back to the default position
  const handleEnd = () => {
    let progress = 0;
    const startPosition = controlsRef.current.object.position.clone();
    const targetPosition = defaultCameraPosition.clone();

    const animateBack = () => {
      progress += 0.05;
      if (progress <= 1) {
        // Animate camera smoothly
        controlsRef.current.object.position.lerpVectors(startPosition, targetPosition, progress);
        // Keep the camera looking at the model
        controlsRef.current.object.lookAt(0, 1, 0);
        requestAnimationFrame(animateBack);
      } else {
        // Once camera is back, reset model’s rotation
        modelResetRef.current();
      }
    };
    animateBack();
  };

  return (
    <Canvas className="canvas3DProfile" shadows camera={{ position: [0, 0, 2.3], rotation: new Euler(0, 0, 0), fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Environment preset="sunset" />

      {/* Render the model only when the modelUrl is available */}
      {modelData && (
        <Model
          onResetRotation={modelResetRef}
          modelData={modelData}
          modelName={modelName}
        />
      )}

      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        target={[0, 0, 0]} 
        dampingFactor={0.1}
        onEnd={handleEnd}
      />
    </Canvas>
  );
}
