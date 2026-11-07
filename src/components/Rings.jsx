import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const gold = {
  color: '#c9a227',
  metalness: 1,
  roughness: 0.24,
  envMapIntensity: 1.3,
}

export default function Rings({ progress, reduced }) {
  const group = useRef(null)
  const ringA = useRef(null)
  const ringB = useRef(null)
  const ringC = useRef(null)

  useFrame((state, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, 0.05)
    const time = state.clock.elapsedTime
    const p = progress?.current ?? 0

    const targetY = reduced ? 0.5 : 0.5 + p * Math.PI * 2
    const targetX = reduced ? 0.35 : 0.35 + p * 0.45
    const targetZ = reduced ? 0 : p * 1.4

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 4, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 4, dt)
    group.current.position.z = THREE.MathUtils.damp(group.current.position.z, targetZ, 4, dt)

    if (!reduced && ringA.current && ringB.current && ringC.current) {
      ringA.current.rotation.z = time * 0.14 + p * 1.4
      ringB.current.rotation.x = time * 0.11 + p * 2.2
      ringC.current.rotation.y = time * 0.16 - p * 1.8
    }
  })

  return (
    <group ref={group}>
      <group rotation={[0.45, 0.15, 0]}>
        <mesh ref={ringA}>
          <torusGeometry args={[1.05, 0.042, 24, 96]} />
          <meshStandardMaterial {...gold} />
        </mesh>
      </group>

      <group rotation={[1.05, 0.6, 0.3]}>
        <mesh ref={ringB} scale={0.82}>
          <torusGeometry args={[1.05, 0.038, 24, 96]} />
          <meshStandardMaterial {...gold} roughness={0.28} />
        </mesh>
      </group>

      <group rotation={[0.15, 1.2, 0.95]}>
        <mesh ref={ringC} scale={0.64}>
          <torusGeometry args={[1.05, 0.034, 24, 96]} />
          <meshStandardMaterial {...gold} roughness={0.3} />
        </mesh>
      </group>

      <mesh>
        <icosahedronGeometry args={[0.16, 1]} />
        <meshStandardMaterial {...gold} roughness={0.18} />
      </mesh>
    </group>
  )
}
