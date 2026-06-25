import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber'
import {
  Float,
  Environment,
  MeshDistortMaterial,
  Sparkles,
  AdaptiveDpr,
  PerformanceMonitor,
} from '@react-three/drei'
import * as THREE from 'three'

/** Central distorted crystal that gently reacts to the pointer. */
function Crystal() {
  const ref = useRef<THREE.Mesh>(null)
  const target = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    target.current.x = state.pointer.y * 0.4
    target.current.y = state.pointer.x * 0.6
    if (ref.current) {
      ref.current.rotation.x += (target.current.x - ref.current.rotation.x) * 0.05
      ref.current.rotation.y += (target.current.y - ref.current.rotation.y) * 0.05 + 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <mesh ref={ref} scale={1.6}>
        <icosahedronGeometry args={[1, 12]} />
        <MeshDistortMaterial
          color="#7c5cff"
          emissive="#3a1d8a"
          emissiveIntensity={0.4}
          roughness={0.05}
          metalness={0.9}
          distort={0.35}
          speed={1.8}
          envMapIntensity={1.4}
        />
      </mesh>
    </Float>
  )
}

/** A ring of small orbiting glass shards. */
function OrbitingShards() {
  const group = useRef<THREE.Group>(null)
  const shards = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2
        return {
          pos: [Math.cos(angle) * 3.1, Math.sin(angle * 1.3) * 1.2, Math.sin(angle) * 3.1] as [number, number, number],
          scale: 0.16 + (i % 3) * 0.05,
        }
      }),
    [],
  )

  useFrame((_, delta) => {
    if (group.current) group.current.rotation.y += delta * 0.15
  })

  return (
    <group ref={group}>
      {shards.map((s, i) => (
        <Float key={i} speed={1.5} floatIntensity={1.5} rotationIntensity={2}>
          <mesh position={s.pos} scale={s.scale}>
            <octahedronGeometry args={[1, 0]} />
            <meshStandardMaterial
              color={i % 2 === 0 ? '#22d3ee' : '#f472b6'}
              metalness={1}
              roughness={0.15}
              emissive={i % 2 === 0 ? '#0e7490' : '#9d174d'}
              emissiveIntensity={0.5}
            />
          </mesh>
        </Float>
      ))}
    </group>
  )
}

function Lights(props: ThreeElements['group']) {
  return (
    <group {...props}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={120} color="#7c5cff" />
      <pointLight position={[-5, -2, -4]} intensity={80} color="#22d3ee" />
      <pointLight position={[0, -4, 4]} intensity={60} color="#f472b6" />
    </group>
  )
}

export default function HeroScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 0, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
    >
      <PerformanceMonitor>
        <AdaptiveDpr pixelated />
        <Suspense fallback={null}>
          <Lights />
          <Crystal />
          <OrbitingShards />
          <Sparkles count={120} scale={12} size={2.4} speed={0.3} color="#a78bfa" opacity={0.7} />
          <Environment preset="city" />
        </Suspense>
      </PerformanceMonitor>
    </Canvas>
  )
}
