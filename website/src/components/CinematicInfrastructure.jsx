import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const serviceLayers = ['Microsoft 365', 'Entra ID', 'Intune', 'Defender', 'SharePoint', 'Backup & DR', 'Managed IT Support']

function useReducedMotionPreference() {
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => setReduce(query.matches)
    update()
    query.addEventListener?.('change', update)
    return () => query.removeEventListener?.('change', update)
  }, [])

  return reduce
}

function makePanelTexture({ title, subtitle, tone = 'cyan', warning = false, width = 512, height = 256 }) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const accent = warning ? '#F97373' : tone === 'blue' ? '#2F80ED' : '#38BDF8'

  ctx.clearRect(0, 0, width, height)
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, 'rgba(16, 30, 47, 0.92)')
  gradient.addColorStop(1, 'rgba(7, 17, 31, 0.78)')
  roundRect(ctx, 18, 18, width - 36, height - 36, 30)
  ctx.fillStyle = gradient
  ctx.fill()
  ctx.strokeStyle = warning ? 'rgba(249,115,115,0.42)' : 'rgba(56,189,248,0.28)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.shadowColor = accent
  ctx.shadowBlur = 20
  ctx.fillStyle = accent
  ctx.beginPath()
  ctx.arc(58, 68, 12, 0, Math.PI * 2)
  ctx.fill()
  ctx.shadowBlur = 0

  ctx.fillStyle = '#F8FAFC'
  ctx.font = '700 34px Inter, Arial, sans-serif'
  ctx.fillText(title, 92, 78)
  ctx.fillStyle = warning ? '#FCA5A5' : '#CBD5E1'
  ctx.font = '500 20px Inter, Arial, sans-serif'
  ctx.fillText(subtitle, 44, 136)

  ctx.strokeStyle = warning ? 'rgba(249,115,115,0.26)' : 'rgba(56,189,248,0.20)'
  ctx.lineWidth = 1.5
  for (let i = 0; i < 4; i += 1) {
    const y = 170 + i * 18
    ctx.beginPath()
    ctx.moveTo(44, y)
    ctx.lineTo(width - 50 - i * 34, y)
    ctx.stroke()
  }

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  return texture
}

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function panelMesh(label, subtitle, options = {}) {
  const texture = makePanelTexture({ title: label, subtitle, warning: options.warning, tone: options.tone })
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: options.opacity ?? 0.92, depthWrite: false })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(options.width ?? 1.8, options.height ?? 0.9), material)
  mesh.userData.texture = texture
  return mesh
}

function lineBetween(a, b, opacity = 0.18) {
  const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...a), new THREE.Vector3(...b)])
  const material = new THREE.LineBasicMaterial({ color: 0x38bdf8, transparent: true, opacity })
  return new THREE.Line(geometry, material)
}

function disposeObject(object) {
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose()
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        if (material.map) material.map.dispose()
        material.dispose()
      })
    }
    if (child.userData?.texture) child.userData.texture.dispose()
  })
}

export default function CinematicInfrastructure() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const reduce = useReducedMotionPreference()

  useEffect(() => {
    if (reduce || typeof window === 'undefined' || !sectionRef.current || !canvasRef.current) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const isMobile = window.matchMedia('(max-width: 767px)').matches
    const section = sectionRef.current
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(0x07111f, isMobile ? 0.06 : 0.038)

    const camera = new THREE.PerspectiveCamera(isMobile ? 55 : 48, 1, 0.1, 80)
    camera.position.set(0, 0.25, isMobile ? 10 : 11)

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, alpha: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x07111f, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.6))
    renderer.shadowMap.enabled = !isMobile
    renderer.shadowMap.type = THREE.PCFSoftShadowMap

    const ambient = new THREE.AmbientLight(0x5f7ea8, 1.15)
    const key = new THREE.DirectionalLight(0x9fdcff, 2.2)
    key.position.set(4, 5, 8)
    key.castShadow = !isMobile
    const rim = new THREE.PointLight(0x38bdf8, 20, 20)
    rim.position.set(-3, 1.8, 4)
    scene.add(ambient, key, rim)

    const root = new THREE.Group()
    const fragmented = new THREE.Group()
    const architecture = new THREE.Group()
    const services = new THREE.Group()
    const finalScene = new THREE.Group()
    scene.add(root)
    root.add(fragmented, architecture, services, finalScene)

    const assets = [
      ['Endpoints', 'laptops · mobile · users', [-3.4, 1.3, 0.4], [-2.7, 0.9, 0]],
      ['Servers', 'legacy workloads', [2.9, 1.5, -0.8], [-1.25, -0.3, 0]],
      ['Cloud', 'Microsoft services', [0.9, 2.35, -1.4], [1.25, 0.55, 0]],
      ['Identity', 'users · MFA · access', [-0.6, -1.0, 1.15], [0, 0.1, 0.25]],
      ['Mail', 'messages and calendars', [3.2, -0.75, 0.25], [2.35, -0.45, 0]],
      ['Files', 'data and collaboration', [-2.8, -1.6, -0.7], [1.15, -1.15, 0]],
      ['Risk', 'alerts · gaps · exposure', [0.2, 0.6, 2.0], [0, -1.85, 0.2], true]
    ]

    const usedAssets = isMobile ? assets.filter((_, index) => index % 2 === 0 || index === 3) : assets
    const meshes = usedAssets.map(([title, subtitle, from, to, warning], index) => {
      const mesh = panelMesh(title, subtitle, { warning, tone: index % 2 ? 'blue' : 'cyan', width: isMobile ? 1.35 : 1.7, height: isMobile ? 0.68 : 0.84 })
      mesh.position.set(...from)
      mesh.rotation.set((index % 2 ? -0.07 : 0.08), (index % 3 - 1) * 0.13, (index % 2 ? 0.05 : -0.04))
      mesh.userData.aligned = to
      fragmented.add(mesh)
      return mesh
    })

    const dataLines = []
    const hub = [0, 0.1, 0.25]
    usedAssets.forEach((asset) => {
      const line = lineBetween(asset[2], hub, asset[4] ? 0.10 : 0.13)
      fragmented.add(line)
      dataLines.push(line)
    })

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(12, 7),
      new THREE.MeshStandardMaterial({ color: 0x081624, roughness: 0.74, metalness: 0.18, transparent: true, opacity: 0.78 })
    )
    floor.position.set(0, -2.35, -1.5)
    floor.rotation.x = -Math.PI / 2
    floor.receiveShadow = !isMobile
    root.add(floor)

    const grid = new THREE.GridHelper(11, 18, 0x38bdf8, 0x1e3a5f)
    grid.position.set(0, -2.32, -1.5)
    grid.material.transparent = true
    grid.material.opacity = 0.16
    root.add(grid)

    const core = panelMesh('Identity Core', 'policy · access · governance', { width: isMobile ? 1.55 : 2.05, height: isMobile ? 0.78 : 1.02 })
    core.position.set(0, 0.1, 0.25)
    core.material.opacity = 0
    architecture.add(core)

    const shield = new THREE.Mesh(
      new THREE.TorusGeometry(isMobile ? 1.35 : 1.9, 0.012, 8, 120),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0 })
    )
    shield.position.set(0, 0.05, 0.15)
    shield.rotation.x = Math.PI / 2.08
    architecture.add(shield)

    const archLines = []
    ;[[0, 0.1, 0.25], [-2.7, 0.9, 0], [1.25, 0.55, 0], [2.35, -0.45, 0], [1.15, -1.15, 0]].forEach((point, index, arr) => {
      if (index === 0) return
      const line = lineBetween(arr[0], point, 0)
      architecture.add(line)
      archLines.push(line)
    })

    serviceLayers.forEach((name, index) => {
      const mesh = panelMesh(name, index === 0 ? 'productivity layer' : index < 5 ? 'control plane' : 'operations layer', {
        width: isMobile ? 1.75 : 2.25,
        height: isMobile ? 0.55 : 0.68,
        opacity: 0,
        tone: index % 2 ? 'blue' : 'cyan'
      })
      const angle = (index / serviceLayers.length) * Math.PI * 2
      const radius = isMobile ? 1.15 : 2.4
      mesh.position.set(Math.cos(angle) * radius, 1.45 - index * (isMobile ? 0.28 : 0.24), -0.35 + Math.sin(angle) * 0.75)
      mesh.rotation.y = Math.cos(angle) * 0.12
      mesh.scale.setScalar(0.88)
      services.add(mesh)
    })

    const finalCore = panelMesh('Controlled Digital Infrastructure', 'secure · governed · recoverable · supported', { width: isMobile ? 2.55 : 3.7, height: isMobile ? 1.0 : 1.35, opacity: 0 })
    finalCore.position.set(0, 0.18, 0.2)
    finalScene.add(finalCore)

    const finalRing = new THREE.Mesh(
      new THREE.TorusGeometry(isMobile ? 1.65 : 2.55, 0.018, 8, 150),
      new THREE.MeshBasicMaterial({ color: 0x2f80ed, transparent: true, opacity: 0 })
    )
    finalRing.position.set(0, 0.05, 0)
    finalRing.rotation.x = Math.PI / 2
    finalScene.add(finalRing)

    const particles = new THREE.Group()
    const particleGeometry = new THREE.SphereGeometry(0.018, 8, 8)
    const particleMaterial = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.42 })
    const particleCount = isMobile ? 18 : 42
    for (let i = 0; i < particleCount; i += 1) {
      const p = new THREE.Mesh(particleGeometry, particleMaterial)
      p.position.set((Math.random() - 0.5) * 8, (Math.random() - 0.5) * 4.5, (Math.random() - 0.5) * 5)
      particles.add(p)
    }
    root.add(particles)

    const resize = () => {
      const width = section.clientWidth
      const height = window.innerHeight
      renderer.setSize(width, height, false)
      camera.aspect = width / height
      camera.updateProjectionMatrix()
    }
    resize()
    window.addEventListener('resize', resize)

    const tl = gsap.timeline({
      defaults: { ease: 'power2.inOut' },
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: isMobile ? '+=2600' : '+=4000',
        scrub: 1.2,
        pin: true,
        anticipatePin: 1
      }
    })

    tl.to(camera.position, { z: isMobile ? 7.2 : 6.2, y: 0.05, duration: 1.1 })
      .to(root.rotation, { y: isMobile ? -0.08 : -0.16, x: 0.035, duration: 1.1 }, '<')
      .to(dataLines.map((line) => line.material), { opacity: 0.04, duration: 0.7 }, '<')

    meshes.forEach((mesh, index) => {
      tl.to(mesh.position, { x: mesh.userData.aligned[0], y: mesh.userData.aligned[1], z: mesh.userData.aligned[2], duration: 0.95 }, index === 0 ? 'align' : 'align')
        .to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 0.95 }, 'align')
        .to(mesh.scale, { x: 0.86, y: 0.86, z: 0.86, duration: 0.95 }, 'align')
    })
    tl.to(core.material, { opacity: 0.98, duration: 0.55 }, 'align+=0.25')
      .to(shield.material, { opacity: 0.48, duration: 0.7 }, 'align+=0.35')
      .to(archLines.map((line) => line.material), { opacity: 0.34, duration: 0.7 }, 'align+=0.35')
      .to(fragmented.position, { x: isMobile ? 0 : -0.35, z: -0.3, duration: 0.8 }, 'align+=0.2')
      .to(camera.position, { z: isMobile ? 6.7 : 5.45, duration: 0.9 }, 'align+=0.3')

    services.children.forEach((mesh, index) => {
      tl.to(mesh.material, { opacity: 0.95, duration: 0.34 }, `layers+=${index * 0.08}`)
        .to(mesh.scale, { x: 1.04, y: 1.04, z: 1.04, duration: 0.34 }, `layers+=${index * 0.08}`)
        .to(mesh.position, { z: mesh.position.z + (isMobile ? 0.35 : 0.65), duration: 0.5 }, `layers+=${index * 0.08}`)
    })
    tl.to(root.position, { x: isMobile ? 0 : -0.7, duration: 0.8 }, 'layers')
      .to(camera.position, { z: isMobile ? 6.4 : 5.1, duration: 0.8 }, 'layers')
      .to(shield.rotation, { z: Math.PI * 0.18, duration: 1.0 }, 'layers')

    tl.to(meshes.map((mesh) => mesh.material), { opacity: 0.18, duration: 0.75 }, 'final')
      .to(services.children.map((mesh) => mesh.material), { opacity: 0.22, duration: 0.75 }, 'final')
      .to(core.material, { opacity: 0.2, duration: 0.75 }, 'final')
      .to(finalCore.material, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 'final+=0.15')
      .to(finalRing.material, { opacity: 0.62, duration: 0.9, ease: 'power2.out' }, 'final+=0.15')
      .to(camera.position, { z: isMobile ? 6.1 : 4.8, duration: 0.9 }, 'final+=0.15')
      .to(root.position, { x: 0, duration: 0.9 }, 'final+=0.15')

    let raf = 0
    const clock = new THREE.Clock()
    const render = () => {
      const elapsed = clock.getElapsedTime()
      particles.rotation.y = elapsed * 0.025
      shield.rotation.z += 0.0015
      finalRing.rotation.z -= 0.001
      renderer.render(scene, camera)
      raf = window.requestAnimationFrame(render)
    }
    render()

    return () => {
      window.cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      tl.scrollTrigger?.kill()
      tl.kill()
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
      disposeObject(scene)
      renderer.dispose()
    }
  }, [reduce])

  if (reduce) {
    return <CinematicFallback />
  }

  return (
    <section ref={sectionRef} className="cinematic-section relative overflow-hidden bg-[#07111F] text-[#F8FAFC]">
      <div className="relative min-h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_25%_20%,rgba(56,189,248,0.16),transparent_34%),radial-gradient(circle_at_76%_62%,rgba(47,128,237,0.18),transparent_35%),linear-gradient(180deg,rgba(7,17,31,0.84),rgba(7,17,31,0.44)_42%,rgba(7,17,31,0.86))]" />
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-35" />
        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-4 py-10 md:py-14">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101E2F]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1] backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              Cinematic IT architecture
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight md:text-5xl">From fragmented IT to controlled digital infrastructure.</h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
              Scroll through the operating model: disconnected assets align around identity, cloud services, data protection, and managed support.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.85fr_1.15fr] md:items-end">
            <div className="rounded-3xl border border-white/[0.12] bg-[#101E2F]/72 p-5 shadow-[0_24px_90px_-58px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Scroll narrative</div>
              <div className="mt-3 space-y-2 text-sm text-[#CBD5E1]">
                <p>01 Fragmented endpoints, files, mail, cloud systems, and risk signals.</p>
                <p>02 Identity becomes central and data flows become governed.</p>
                <p>03 Microsoft 365, Entra ID, Intune, Defender, SharePoint, Backup & DR, and Managed IT Support form service layers.</p>
                <p>04 The scene resolves into stable, secure operational maturity.</p>
              </div>
            </div>

            <div className="pointer-events-auto rounded-3xl border border-white/[0.12] bg-[#07111F]/70 p-5 text-right shadow-[0_24px_90px_-58px_rgba(0,0,0,0.9)] backdrop-blur-md">
              <div className="text-sm font-semibold text-[#F8FAFC]">Ready to bring control to your IT environment?</div>
              <div className="mt-4 flex flex-wrap justify-end gap-3">
                <Link to="/contacts" className="rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_28px_rgba(47,128,237,0.24)] transition hover:bg-[#38BDF8] hover:text-[#07111F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70">
                  Book an IT Assessment
                </Link>
                <Link to="/solutions" className="rounded-full border border-white/[0.14] bg-[#101E2F] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8]/45 hover:text-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70">
                  Explore Services
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function CinematicFallback() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-[#F8FAFC] md:py-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(180deg,#07111F,#0B1B2B)]" />
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-white/[0.12] bg-[#101E2F]/78 p-6 shadow-[0_24px_90px_-58px_rgba(0,0,0,0.9)] md:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Controlled digital infrastructure</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight md:text-5xl">From fragmented IT to one governed operating model.</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {['Fragmented assets', 'Identity-led control', 'Service layers', 'Secure operations'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/[0.12] bg-[#0B1B2B] p-4">
              <div className="text-xs font-semibold text-[#38BDF8]">0{index + 1}</div>
              <div className="mt-2 text-sm font-semibold">{item}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contacts" className="rounded-full bg-[#2F80ED] px-5 py-2.5 text-sm font-semibold text-white">Book an IT Assessment</Link>
          <Link to="/solutions" className="rounded-full border border-white/[0.14] bg-[#101E2F] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]">Explore Services</Link>
        </div>
      </div>
    </section>
  )
}
