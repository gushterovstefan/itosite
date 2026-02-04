import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function isDesktop() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(min-width: 768px)').matches
}

export default function HeroWebGL({ logoSrc, showCoin = true }) {
  const hostRef = useRef(null)

  useEffect(() => {
    if (!isDesktop()) return

    const host = hostRef.current
    if (!host) return

    // Respect reduced motion
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) return

    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100)
    camera.position.set(0, 0, 9)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2))
    renderer.setClearColor(0x000000, 0)

    host.appendChild(renderer.domElement)

    // Lights
    const ambient = new THREE.AmbientLight(0xffffff, 0.8)
    scene.add(ambient)
    const key = new THREE.DirectionalLight(0xffffff, 1.1)
    key.position.set(2.5, 2.2, 4)
    scene.add(key)
    const rim = new THREE.PointLight(0xd946ef, 1.1, 30)
    rim.position.set(-3, -2, 5)
    scene.add(rim)

    // --- Abstract network field (points + lines) ---
    const field = new THREE.Group()
    scene.add(field)

    const COUNT = 120
    const positions = new Float32Array(COUNT * 3)
    const velocities = new Float32Array(COUNT * 3)
    const bounds = { x: 8, y: 4.5, z: 2.2 }

    for (let i = 0; i < COUNT; i++) {
      const i3 = i * 3
      positions[i3 + 0] = (Math.random() - 0.5) * bounds.x
      positions[i3 + 1] = (Math.random() - 0.5) * bounds.y
      positions[i3 + 2] = (Math.random() - 0.5) * bounds.z - 2.0

      velocities[i3 + 0] = (Math.random() - 0.5) * 0.003
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.003
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.001
    }

    const pointsGeo = new THREE.BufferGeometry()
    pointsGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))

    const pointsMat = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.045,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.18,
      depthWrite: false
    })

    const points = new THREE.Points(pointsGeo, pointsMat)
    field.add(points)

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xd946ef,
      transparent: true,
      opacity: 0.12,
      depthWrite: false
    })
    const lineGeom = new THREE.BufferGeometry()
    const line = new THREE.LineSegments(lineGeom, lineMat)
    field.add(line)

    // --- Optional 3D logo coin ---
    let coinGroup = null
    let coinGeo = null
    let edgeMat = null
    let faceMat = null
    let glowTex = null
    let glowMat = null

    if (showCoin) {
      coinGroup = new THREE.Group()
      scene.add(coinGroup)

      const texLoader = new THREE.TextureLoader()
      const logoTex = texLoader.load(logoSrc)
      logoTex.colorSpace = THREE.SRGBColorSpace
      logoTex.anisotropy = 8

      const radius = 1.55
      const thickness = 0.22
      coinGeo = new THREE.CylinderGeometry(radius, radius, thickness, 84, 1, false)

      edgeMat = new THREE.MeshStandardMaterial({
        color: 0x2a2238,
        metalness: 0.75,
        roughness: 0.35,
        emissive: new THREE.Color(0x120818),
        emissiveIntensity: 0.35
      })

      faceMat = new THREE.MeshStandardMaterial({
        map: logoTex,
        metalness: 0.15,
        roughness: 0.6,
        transparent: true
      })

      const coin = new THREE.Mesh(coinGeo, [edgeMat, faceMat, faceMat])
      coin.rotation.x = Math.PI / 2
      coinGroup.add(coin)

      // glow sprite behind coin
      const glowCanvas = document.createElement('canvas')
      glowCanvas.width = 128
      glowCanvas.height = 128
      const gctx = glowCanvas.getContext('2d')
      const grd = gctx.createRadialGradient(64, 64, 8, 64, 64, 64)
      grd.addColorStop(0, 'rgba(217,70,239,0.55)')
      grd.addColorStop(0.45, 'rgba(116,173,60,0.10)')
      grd.addColorStop(1, 'rgba(0,0,0,0)')
      gctx.fillStyle = grd
      gctx.fillRect(0, 0, 128, 128)

      glowTex = new THREE.CanvasTexture(glowCanvas)
      glowMat = new THREE.SpriteMaterial({ map: glowTex, transparent: true, opacity: 0.55, depthWrite: false })
      const glow = new THREE.Sprite(glowMat)
      glow.scale.set(6, 6, 1)
      glow.position.set(0, 0, -1.2)
      coinGroup.add(glow)
    }

    // Layout / resize
    const resize = () => {
      const r = host.getBoundingClientRect()
      renderer.setSize(r.width, r.height, false)
      camera.aspect = r.width / Math.max(1, r.height)
      camera.updateProjectionMatrix()
    }

    const ro = new ResizeObserver(resize)
    ro.observe(host)
    resize()

    // Pointer tilt (subtle)
    let targetRx = 0
    let targetRy = 0
    const onMove = (e) => {
      const r = host.getBoundingClientRect()
      const px = (e.clientX - r.left) / r.width
      const py = (e.clientY - r.top) / r.height
      targetRy = (px - 0.5) * 0.35
      targetRx = (0.5 - py) * 0.22
    }
    window.addEventListener('pointermove', onMove, { passive: true })

    let raf = 0
    let t0 = performance.now()

    const tick = (t) => {
      const dt = Math.min(32, t - t0)
      t0 = t

      // animate points
      for (let i = 0; i < COUNT; i++) {
        const i3 = i * 3
        positions[i3 + 0] += velocities[i3 + 0] * dt
        positions[i3 + 1] += velocities[i3 + 1] * dt
        positions[i3 + 2] += velocities[i3 + 2] * dt

        if (positions[i3 + 0] > bounds.x / 2 || positions[i3 + 0] < -bounds.x / 2) velocities[i3 + 0] *= -1
        if (positions[i3 + 1] > bounds.y / 2 || positions[i3 + 1] < -bounds.y / 2) velocities[i3 + 1] *= -1
        if (positions[i3 + 2] > -0.5 || positions[i3 + 2] < -4.0) velocities[i3 + 2] *= -1
      }
      pointsGeo.attributes.position.needsUpdate = true

      // build connection lines
      const maxDist = 1.2
      const verts = []
      for (let i = 0; i < COUNT; i++) {
        const ax = positions[i * 3 + 0]
        const ay = positions[i * 3 + 1]
        const az = positions[i * 3 + 2]
        for (let j = i + 1; j < COUNT; j++) {
          const bx = positions[j * 3 + 0]
          const by = positions[j * 3 + 1]
          const bz = positions[j * 3 + 2]
          const dx = ax - bx
          const dy = ay - by
          const dz = az - bz
          const d = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (d < maxDist) verts.push(ax, ay, az, bx, by, bz)
        }
      }
      lineGeom.setAttribute('position', new THREE.Float32BufferAttribute(verts, 3))
      lineGeom.computeBoundingSphere()

      // optional coin motion
      if (coinGroup) {
        coinGroup.rotation.y += 0.004
        coinGroup.rotation.x += 0.0012
        coinGroup.rotation.x += (targetRx - coinGroup.rotation.x) * 0.05
        coinGroup.rotation.y += (targetRy - coinGroup.rotation.y) * 0.05
        coinGroup.position.y = Math.sin(t * 0.0012) * 0.12
      }

      camera.position.x = Math.sin(t * 0.0004) * 0.25
      camera.position.y = Math.cos(t * 0.00035) * 0.18
      camera.lookAt(0, 0, 0)

      renderer.render(scene, camera)
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('pointermove', onMove)
      ro.disconnect()

      renderer.dispose()

      pointsGeo.dispose()
      pointsMat.dispose()
      lineGeom.dispose()
      lineMat.dispose()

      if (coinGeo) coinGeo.dispose()
      if (edgeMat) edgeMat.dispose()
      if (faceMat) faceMat.dispose()
      if (glowTex) glowTex.dispose()
      if (glowMat) glowMat.dispose()

      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement)
      }
    }
  }, [logoSrc, showCoin])

  return <div ref={hostRef} aria-hidden="true" className="pointer-events-none absolute inset-0" />
}
