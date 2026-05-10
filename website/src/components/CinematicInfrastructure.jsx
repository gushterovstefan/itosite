import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import * as THREE from 'three'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const COLORS = {
  bg: '#07111F',
  bg2: '#0B1728',
  surface: '#101C2E',
  text: '#F8FAFC',
  muted: '#CBD5E1',
  accent: '#38BDF8',
  deep: '#2563EB',
  green: '#22C55E',
  red: '#EF4444'
}

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

function roundedRect(ctx, x, y, width, height, radius) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.arcTo(x + width, y, x + width, y + height, radius)
  ctx.arcTo(x + width, y + height, x, y + height, radius)
  ctx.arcTo(x, y + height, x, y, radius)
  ctx.arcTo(x, y, x + width, y, radius)
  ctx.closePath()
}

function makeLabelTexture({ title, subtitle, status = 'neutral', width = 512, height = 220 }) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const statusColor = status === 'risk' ? COLORS.red : status === 'secure' ? COLORS.green : COLORS.accent

  ctx.clearRect(0, 0, width, height)

  roundedRect(ctx, 18, 18, width - 36, height - 36, 28)
  ctx.fillStyle = COLORS.surface
  ctx.fill()
  ctx.strokeStyle = status === 'risk' ? 'rgba(239,68,68,0.46)' : status === 'secure' ? 'rgba(34,197,94,0.42)' : 'rgba(56,189,248,0.34)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = statusColor
  ctx.beginPath()
  ctx.arc(56, 62, 9, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.text
  ctx.font = '700 32px Inter, Arial, sans-serif'
  ctx.fillText(title, 82, 72)

  ctx.fillStyle = COLORS.muted
  ctx.font = '500 20px Inter, Arial, sans-serif'
  ctx.fillText(subtitle, 44, 126)

  ctx.strokeStyle = 'rgba(203,213,225,0.16)'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.moveTo(44, 158)
  ctx.lineTo(width - 44, 158)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function makePanel(title, subtitle, options = {}) {
  const texture = makeLabelTexture({ title, subtitle, status: options.status })
  const material = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: options.opacity ?? 0.95,
    depthWrite: false
  })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(options.width ?? 1.75, options.height ?? 0.76), material)
  mesh.userData.texture = texture
  return mesh
}

function makeLine(from, to, color = COLORS.accent, opacity = 0.22) {
  const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)])
  const material = new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity })
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
  const copyRef = useRef(null)
  const reduce = useReducedMotionPreference()

  useEffect(() => {
    if (reduce || typeof window === 'undefined' || !sectionRef.current || !canvasRef.current) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const canvas = canvasRef.current
    const isMobile = window.matchMedia('(max-width: 767px)').matches

    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x07111f, isMobile ? 9 : 8, isMobile ? 18 : 16)

    const camera = new THREE.PerspectiveCamera(isMobile ? 50 : 45, 1, 0.1, 40)
    camera.position.set(0, 0.25, isMobile ? 9.5 : 8.8)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: !isMobile, powerPreference: 'high-performance' })
    renderer.setClearColor(0x07111f, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.15 : 1.45))

    const root = new THREE.Group()
    const backgroundLayer = new THREE.Group()
    const architectureLayer = new THREE.Group()
    const governanceLayer = new THREE.Group()
    scene.add(root)
    root.add(backgroundLayer, architectureLayer, governanceLayer)

    const ambient = new THREE.AmbientLight(0x8db7e8, 1.1)
    const key = new THREE.DirectionalLight(0xc8e8ff, 1.45)
    key.position.set(3, 4, 5)
    scene.add(ambient, key)

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(10, 5.8),
      new THREE.MeshBasicMaterial({ color: 0x0b1728, transparent: true, opacity: 0.72 })
    )
    floor.position.set(0, -2.05, -1.4)
    floor.rotation.x = -Math.PI / 2
    backgroundLayer.add(floor)

    const grid = new THREE.GridHelper(9, isMobile ? 8 : 12, 0x2563eb, 0x1f3557)
    grid.position.set(0, -2.02, -1.4)
    grid.material.transparent = true
    grid.material.opacity = 0.13
    backgroundLayer.add(grid)

    const initialAssets = [
      { title: 'Users', subtitle: 'access requests', from: [-2.75, 1.1, 0], to: [-2.1, 0.72, 0], status: 'neutral' },
      { title: 'Devices', subtitle: 'unmanaged endpoints', from: [2.55, 1.05, -0.2], to: [-1.95, -0.65, 0], status: 'risk' },
      { title: 'Cloud', subtitle: 'Microsoft services', from: [0.85, 1.75, -0.7], to: [1.95, 0.7, 0], status: 'neutral' },
      { title: 'Data', subtitle: 'mail · files · backup', from: [-2.25, -1.35, -0.35], to: [2.0, -0.62, 0], status: 'neutral' },
      { title: 'Alerts', subtitle: 'security gaps', from: [2.35, -1.28, 0.2], to: [0, -1.35, 0], status: 'risk' }
    ]

    const visibleAssets = isMobile ? initialAssets.filter((_, index) => index !== 4) : initialAssets
    const assetMeshes = visibleAssets.map((asset, index) => {
      const mesh = makePanel(asset.title, asset.subtitle, {
        status: asset.status,
        width: isMobile ? 1.45 : 1.7,
        height: isMobile ? 0.62 : 0.72
      })
      mesh.position.set(...asset.from)
      mesh.rotation.set(0, (index - 2) * 0.035, 0)
      mesh.userData.target = asset.to
      architectureLayer.add(mesh)
      return mesh
    })

    const identity = makePanel('Identity', 'policy · MFA · governance', {
      status: 'secure',
      width: isMobile ? 1.7 : 2.1,
      height: isMobile ? 0.7 : 0.86,
      opacity: 0
    })
    identity.position.set(0, 0, 0.18)
    architectureLayer.add(identity)

    const fragmentedLines = visibleAssets.map((asset) => {
      const line = makeLine(asset.from, [0, 0, 0.18], asset.status === 'risk' ? COLORS.red : COLORS.accent, asset.status === 'risk' ? 0.16 : 0.12)
      architectureLayer.add(line)
      return line
    })

    const structuredLines = visibleAssets.map((asset) => {
      const line = makeLine(asset.to, [0, 0, 0.18], asset.status === 'risk' ? COLORS.green : COLORS.accent, 0)
      governanceLayer.add(line)
      return line
    })

    const governanceRing = new THREE.Mesh(
      new THREE.RingGeometry(isMobile ? 1.72 : 2.35, isMobile ? 1.76 : 2.39, 128),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, side: THREE.DoubleSide })
    )
    governanceRing.position.set(0, 0, -0.04)
    governanceLayer.add(governanceRing)

    const securityRing = new THREE.Mesh(
      new THREE.RingGeometry(isMobile ? 2.08 : 2.9, isMobile ? 2.12 : 2.94, 128),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
    )
    securityRing.position.set(0, 0, -0.08)
    governanceLayer.add(securityRing)

    const finalPanel = makePanel('Managed Infrastructure', 'secure · monitored · recoverable', {
      status: 'secure',
      width: isMobile ? 2.35 : 3.2,
      height: isMobile ? 0.84 : 1.04,
      opacity: 0
    })
    finalPanel.position.set(0, 0.05, 0.32)
    governanceLayer.add(finalPanel)

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
        scrub: isMobile ? 1.2 : 1.6,
        pin: true,
        anticipatePin: 1
      }
    })

    tl.to(camera.position, { z: isMobile ? 8.2 : 7.35, x: isMobile ? 0 : -0.18, duration: 1.1 })
      .to(root.position, { x: isMobile ? 0 : -0.18, duration: 1.1 }, '<')

    assetMeshes.forEach((mesh) => {
      tl.to(mesh.position, { x: mesh.userData.target[0], y: mesh.userData.target[1], z: mesh.userData.target[2], duration: 1.15 }, 'align')
        .to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 1.15 }, 'align')
        .to(mesh.scale, { x: 0.9, y: 0.9, z: 0.9, duration: 1.15 }, 'align')
    })

    tl.to(fragmentedLines.map((line) => line.material), { opacity: 0.03, duration: 0.8 }, 'align')
      .to(identity.material, { opacity: 1, duration: 0.75 }, 'align+=0.35')
      .to(structuredLines.map((line) => line.material), { opacity: 0.36, duration: 0.85 }, 'align+=0.45')
      .to(camera.position, { z: isMobile ? 7.7 : 6.65, x: isMobile ? 0 : 0.28, duration: 1 }, 'align+=0.25')

    tl.to(governanceRing.material, { opacity: 0.58, duration: 0.8 }, 'governance')
      .to(securityRing.material, { opacity: 0.42, duration: 0.8 }, 'governance+=0.18')
      .to(assetMeshes.map((mesh) => mesh.material), { opacity: 0.72, duration: 0.7 }, 'governance')
      .to(camera.position, { z: isMobile ? 7.35 : 6.15, x: 0, duration: 1 }, 'governance')

    tl.to(assetMeshes.map((mesh) => mesh.material), { opacity: isMobile ? 0.2 : 0.28, duration: 0.85 }, 'final')
      .to(identity.material, { opacity: 0.18, duration: 0.85 }, 'final')
      .to(structuredLines.map((line) => line.material), { opacity: 0.12, duration: 0.85 }, 'final')
      .to(finalPanel.material, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 'final+=0.15')
      .to(governanceRing.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.9 }, 'final+=0.15')
      .to(securityRing.scale, { x: 1.08, y: 1.08, z: 1.08, duration: 0.9 }, 'final+=0.15')
      .to(camera.position, { z: isMobile ? 7.05 : 5.85, duration: 0.9 }, 'final+=0.15')

    let raf = 0
    const render = () => {
      const time = performance.now() * 0.001
      governanceRing.rotation.z = time * 0.025
      securityRing.rotation.z = -time * 0.018
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

  if (reduce) return <CinematicFallback />

  return (
    <section ref={sectionRef} className="cinematic-section relative overflow-hidden bg-[#07111F] text-[#F8FAFC]">
      <div className="relative min-h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.90)_34%,rgba(7,17,31,0.42)_68%,rgba(7,17,31,0.82)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-52 bg-gradient-to-t from-[#07111F] to-transparent" />

        <div className="relative z-10 mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-4 py-10 md:py-14">
          <div ref={copyRef} className="max-w-2xl rounded-[2rem] border border-white/[0.10] bg-[#07111F]/72 p-5 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md md:p-7">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              Secure managed infrastructure
            </div>
            <h2 className="mt-5 text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-5xl">
              From fragmented IT complexity to secure managed infrastructure.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
              A calm operating model where identity is central, endpoints and cloud services are governed, and security controls become visible.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-[0.95fr_1.05fr] md:items-end">
            <div className="rounded-3xl border border-white/[0.10] bg-[#07111F]/76 p-5 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Scroll story</div>
              <ol className="mt-3 space-y-2 text-sm leading-relaxed text-[#CBD5E1]">
                <li><span className="font-semibold text-[#F8FAFC]">01</span> Fragmented users, devices, cloud, and data create risk.</li>
                <li><span className="font-semibold text-[#F8FAFC]">02</span> Assets align around identity and clear architecture.</li>
                <li><span className="font-semibold text-[#F8FAFC]">03</span> Security and governance wrap the environment.</li>
                <li><span className="font-semibold text-[#F8FAFC]">04</span> The result is stable, monitored, recoverable IT.</li>
              </ol>
            </div>

            <div className="pointer-events-auto rounded-3xl border border-white/[0.10] bg-[#07111F]/78 p-5 text-left shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md md:text-right">
              <div className="text-sm font-semibold text-[#F8FAFC]">Bring control to your Microsoft cloud and IT operations.</div>
              <div className="mt-4 flex flex-wrap gap-3 md:justify-end">
                <Link to="/contacts" className="rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#38BDF8] hover:text-[#07111F] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70">
                  Book an IT Assessment
                </Link>
                <Link to="/solutions" className="rounded-full border border-white/[0.14] bg-[#101C2E] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8]/45 hover:text-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70">
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
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07111F,#0B1728)]" />
      <div className="relative mx-auto max-w-6xl rounded-[2rem] border border-white/[0.10] bg-[#101C2E] p-6 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] md:p-10">
        <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Secure managed infrastructure</div>
        <h2 className="mt-4 text-3xl font-semibold tracking-tight text-[#F8FAFC] md:text-5xl">From fragmented IT complexity to secure managed infrastructure.</h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
          Identity-led control, governed endpoints, protected data, and managed support in one stable operating model.
        </p>
        <div className="mt-8 grid gap-3 md:grid-cols-4">
          {['Fragmented IT', 'Identity center', 'Security layer', 'Managed operations'].map((item, index) => (
            <div key={item} className="rounded-2xl border border-white/[0.10] bg-[#0B1728] p-4">
              <div className="text-xs font-semibold text-[#38BDF8]">0{index + 1}</div>
              <div className="mt-2 text-sm font-semibold text-[#F8FAFC]">{item}</div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/contacts" className="rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]">Book an IT Assessment</Link>
          <Link to="/solutions" className="rounded-full border border-white/[0.14] bg-[#101C2E] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]">Explore Services</Link>
        </div>
      </div>
    </section>
  )
}
