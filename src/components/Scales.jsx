import { useEffect, useMemo, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import * as THREE from 'three'

const gold = {
  color: '#c9a227',
  metalness: 1,
  roughness: 0.27,
  envMapIntensity: 1.2,
}

export default function Scales({ reduced }) {
  const group = useRef(null)
  const base = useRef(null)
  const column = useRef(null)
  const beam = useRef(null)
  const panLeft = useRef(null)
  const panRight = useRef(null)

  const pointer = useRef({ x: 0, y: 0 })
  const drag = useRef({ active: false, lastX: 0, rotation: 0, velocity: 0 })
  const hovered = useRef(null)

  const panMaterials = useMemo(() => {
    const make = () =>
      new THREE.MeshStandardMaterial({
        color: '#c9a227',
        metalness: 1,
        roughness: 0.24,
        envMapIntensity: 1.25,
        emissive: new THREE.Color('#c9a227'),
        emissiveIntensity: 0,
      })
    return [make(), make()]
  }, [])

  useEffect(() => () => panMaterials.forEach((material) => material.dispose()), [panMaterials])

  useEffect(() => {
    const onPointerMove = (event) => {
      pointer.current.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('pointermove', onPointerMove, { passive: true })
    return () => window.removeEventListener('pointermove', onPointerMove)
  }, [])

  const { gl } = useThree()

  useEffect(() => {
    const canvas = gl.domElement
    canvas.style.cursor = 'grab'

    const onDown = (event) => {
      drag.current.active = true
      drag.current.lastX = event.clientX
      drag.current.velocity = 0
      canvas.style.cursor = 'grabbing'
      canvas.setPointerCapture?.(event.pointerId)
    }

    const onMove = (event) => {
      if (!drag.current.active) return
      const dx = event.clientX - drag.current.lastX
      drag.current.lastX = event.clientX
      drag.current.rotation += dx * 0.007
      drag.current.velocity = dx * 0.007
    }

    const onUp = () => {
      drag.current.active = false
      canvas.style.cursor = 'grab'
    }

    canvas.addEventListener('pointerdown', onDown)
    window.addEventListener('pointermove', onMove)
    window.addEventListener('pointerup', onUp)
    window.addEventListener('pointercancel', onUp)

    return () => {
      canvas.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
    }
  }, [gl])

  useEffect(() => {
    if (reduced) return

    const timeline = gsap.timeline({ defaults: { ease: 'power3.out' } })
    timeline
      .from(base.current.scale, { x: 0.01, y: 0.01, z: 0.01, duration: 0.7 })
      .from(column.current.scale, { y: 0.01, duration: 0.7, ease: 'power2.out' }, '-=0.45')
      .from(beam.current.scale, { x: 0.01, duration: 0.6 }, '-=0.35')
      .from(
        [panLeft.current.position, panRight.current.position],
        { y: 0.85, duration: 0.9, ease: 'bounce.out', stagger: 0.12 },
        '-=0.35',
      )

    return () => {
      timeline.revert()
      timeline.kill()
    }
  }, [reduced])

  useFrame((state, delta) => {
    if (!group.current) return
    const dt = Math.min(delta, 0.05)
    const time = state.clock.elapsedTime

    if (!drag.current.active) {
      drag.current.rotation += drag.current.velocity
      drag.current.velocity *= 0.94
    }

    const scroll = Math.min(window.scrollY / (window.innerHeight || 1), 1)
    const targetY = reduced
      ? 0.35
      : drag.current.rotation + pointer.current.x * 0.35 + scroll * 1.15
    const targetX = reduced ? 0 : -pointer.current.y * 0.1

    group.current.rotation.y = THREE.MathUtils.damp(group.current.rotation.y, targetY, 3.5, dt)
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, targetX, 3.5, dt)

    const hoverSwing = hovered.current !== null ? Math.sin(time * 2.4) * 0.05 : 0
    const sway = reduced
      ? 0
      : Math.sin(time * 0.85) * 0.05 + pointer.current.x * 0.05 + hoverSwing

    if (beam.current) beam.current.rotation.z = sway
    if (panLeft.current) panLeft.current.rotation.z = -sway
    if (panRight.current) panRight.current.rotation.z = -sway

    const hoveredIndex = hovered.current === -1 ? 0 : hovered.current === 1 ? 1 : -1
    panMaterials.forEach((material, index) => {
      material.emissiveIntensity = THREE.MathUtils.damp(
        material.emissiveIntensity,
        index === hoveredIndex ? 0.5 : 0,
        8,
        dt,
      )
    })
  })

  return (
    <group ref={group} position={[0, -0.85, 0]} rotation={[0, 0.35, 0]}>
      <mesh ref={base} position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.62, 0.78, 0.14, 64]} />
        <meshStandardMaterial {...gold} roughness={0.36} />
      </mesh>
      <mesh position={[0, 0.18, 0]}>
        <cylinderGeometry args={[0.3, 0.5, 0.1, 64]} />
        <meshStandardMaterial {...gold} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.27, 0.021, 12, 64]} />
        <meshStandardMaterial {...gold} />
      </mesh>

      <mesh ref={column} position={[0, 0.83, 0]}>
        <cylinderGeometry args={[0.05, 0.07, 1.16, 32]} />
        <meshStandardMaterial {...gold} roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.4, 0]}>
        <sphereGeometry args={[0.085, 32, 32]} />
        <meshStandardMaterial {...gold} />
      </mesh>

      <group ref={beam} position={[0, 1.42, 0]}>
        <mesh>
          <boxGeometry args={[1.9, 0.055, 0.055]} />
          <meshStandardMaterial {...gold} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <sphereGeometry args={[0.09, 32, 32]} />
          <meshStandardMaterial {...gold} />
        </mesh>

        {[-1, 1].map((side) => (
          <group
            key={side}
            ref={side === -1 ? panLeft : panRight}
            position={[side * 0.9, 0, 0]}
            onPointerEnter={() => {
              hovered.current = side
            }}
            onPointerLeave={() => {
              hovered.current = null
            }}
          >
            <mesh position={[0, -0.28, 0]}>
              <cylinderGeometry args={[0.009, 0.009, 0.56, 12]} />
              <meshStandardMaterial {...gold} />
            </mesh>
            <group position={[0, -0.6, 0]}>
              <mesh material={panMaterials[side === -1 ? 0 : 1]}>
                <cylinderGeometry args={[0.3, 0.2, 0.07, 48, 1, true]} />
              </mesh>
              <mesh
                material={panMaterials[side === -1 ? 0 : 1]}
                position={[0, 0.035, 0]}
                rotation={[Math.PI / 2, 0, 0]}
              >
                <torusGeometry args={[0.3, 0.012, 12, 48]} />
              </mesh>
            </group>
          </group>
        ))}
      </group>

      <mesh position={[0, 1.56, 0]}>
        <coneGeometry args={[0.055, 0.14, 24]} />
        <meshStandardMaterial {...gold} />
      </mesh>
    </group>
  )
}
