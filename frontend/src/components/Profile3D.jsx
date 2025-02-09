import { Environment, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import React, { useRef } from 'react';
import { Vector3, Euler } from 'three';

function Model(props) {
  const { nodes } = useGLTF('/suzanne.glb');
  const meshRef = useRef();

  // Store the initial rotation
  const defaultRotation = new Euler(-Math.PI/1.3, 0, 0);

  // Function to reset model rotation
  props.onResetRotation.current = () => {
    meshRef.current.rotation.copy(defaultRotation);
  };

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 1, 0]}
        rotation={[-Math.PI/1.3, 0, 0]} // Initial rotation: 180 degrees around the X-axis
      />
    </group>
  );
}

export function Profile3D() {
  const controlsRef = useRef();
  const defaultCameraPosition = new Vector3(0, 5, 2);
  const modelResetRef = useRef(() => {}); // Function reference to reset the model

  const handleEnd = () => {
    let progress = 0;
    const startPosition = controlsRef.current.object.position.clone();
    const targetPosition = defaultCameraPosition.clone();

    const animateBack = () => {
      progress += 0.05;
      if (progress <= 1) {
        controlsRef.current.object.position.lerpVectors(startPosition, targetPosition, progress);
        controlsRef.current.object.lookAt(0, 1, 0); // Keep the camera focused on the model
        requestAnimationFrame(animateBack);
      } else {
        modelResetRef.current(); // Reset the model's rotation once the camera snaps back
      }
    };
    animateBack();
  };

  return (
    <Canvas shadows camera={{ position: [0, 5, 2], fov: 60 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Environment preset="sunset" />
      <Model onResetRotation={modelResetRef} />
      <OrbitControls
        ref={controlsRef}
        enableDamping={true}
        dampingFactor={0.1}
        onEnd={handleEnd}
      />
    </Canvas>
  );
}
