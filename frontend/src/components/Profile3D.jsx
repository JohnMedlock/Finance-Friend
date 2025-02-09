import React from 'react'
import { Canvas } from '@react-three/fiber'
import { useGLTF, Environment } from '@react-three/drei'

function Model(props) {
  const { nodes, materials } = useGLTF('/suzanne.gltf')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Suzanne.geometry}
        material={nodes.Suzanne.material}
        position={[0, 1, 2]}
      />
    </group>
  )
}

useGLTF.preload('/suzanne.gltf')

export function Profile3D() {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 60 }} >
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <Environment preset="sunset"/>
      <Model/>
    </Canvas>
  )
}
