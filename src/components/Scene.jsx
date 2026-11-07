import { useRef } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  Sparkles,
} from '@react-three/drei'
import Scales from './Scales'
import { useInView, usePrefersReducedMotion } from '../hooks'

export default function Scene() {
  const wrap = useRef(null)
  const inView = useInView(wrap)
  const reduced = usePrefersReducedMotion()

  return (
    <div className="scene" ref={wrap}>
      <Canvas
        dpr={[1, 1.65]}
        camera={{ position: [0, 0.15, 5.6], fov: 34 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={inView && !reduced ? 'always' : 'demand'}
      >
        <ambientLight intensity={0.35} />
        <directionalLight position={[4, 6, 4]} intensity={2.4} color="#ffd98a" />
        <directionalLight position={[-5, 3, -3]} intensity={1.3} color="#5878d8" />
        <spotLight position={[0, 7, 2]} angle={0.55} penumbra={1} intensity={25} color="#fff0c4" />

        <Environment resolution={256} frames={1}>
          <color attach="background" args={['#04060a']} />
          <Lightformer intensity={3.2} form="ring" position={[3, 5, -3]} scale={5} color="#ffe6a3" />
          <Lightformer
            intensity={1.6}
            form="rect"
            position={[-5, 2, 2]}
            scale={[7, 4, 1]}
            color="#7fa2ff"
          />
          <Lightformer
            intensity={1.1}
            form="rect"
            position={[0, -3, 3]}
            scale={[9, 4, 1]}
            color="#ffffff"
          />
        </Environment>

        <Float speed={1.1} rotationIntensity={0.18} floatIntensity={0.45} floatingRange={[-0.06, 0.1]}>
          <Scales reduced={reduced} />
        </Float>

        {!reduced && (
          <Sparkles count={26} scale={[4.5, 3.4, 3]} size={1.6} speed={0.25} color="#e8cd7a" opacity={0.5} />
        )}

        <ContactShadows
          position={[0, -0.9, 0]}
          opacity={0.6}
          scale={7}
          blur={2.6}
          far={3.5}
          color="#000000"
        />
      </Canvas>
    </div>
  )
}
