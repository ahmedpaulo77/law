import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, Float, Lightformer, Sparkles } from '@react-three/drei'
import Rings from './Rings'
import { useInView, usePrefersReducedMotion } from '../hooks'

export default function RingsScene({ progress }) {
  const wrap = useRef(null)
  const inView = useInView(wrap)
  const reduced = usePrefersReducedMotion()

  return (
    <div className="scene" ref={wrap}>
      <Canvas
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.6], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView && !reduced ? 'always' : 'demand'}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffd98a" />
        <directionalLight position={[-4, 2, -3]} intensity={1.4} color="#5d7fe0" />
        <spotLight position={[0, 6, 3]} angle={0.6} penumbra={1} intensity={22} color="#fff0c4" />

        <Environment resolution={256} frames={1}>
          <color attach="background" args={['#04060a']} />
          <Lightformer intensity={3} form="ring" position={[3, 4, -3]} scale={5} color="#ffe6a3" />
          <Lightformer
            intensity={1.5}
            form="rect"
            position={[-4, 1, 2]}
            scale={[6, 4, 1]}
            color="#8fb0ff"
          />
          <Lightformer
            intensity={1}
            form="rect"
            position={[0, -3, 2]}
            scale={[8, 4, 1]}
            color="#ffffff"
          />
        </Environment>

        <Float speed={1} rotationIntensity={0.16} floatIntensity={0.4} floatingRange={[-0.05, 0.09]}>
          <Rings progress={progress} reduced={reduced} />
        </Float>

        {!reduced && (
          <Sparkles count={26} scale={[5, 4, 3]} size={1.5} speed={0.22} color="#e8cd7a" opacity={0.45} />
        )}
      </Canvas>
    </div>
  )
}
