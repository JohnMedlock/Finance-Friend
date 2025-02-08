import { Canvas } from '@react-three/fiber'
import React from 'react'

function Box() {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="purple" />
    </mesh>
  )
}

export function Profile3D() {
  return (
    <Canvas style={{ height: '200px', width: '200px', borderRadius: '50%' }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}