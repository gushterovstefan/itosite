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
  secondary: '#CBD5E1',
  muted: '#94A3B8',
  accent: '#38BDF8',
  deepBlue: '#2563EB',
  green: '#22C55E',
  red: '#EF4444'
}

const SERVICES = ['Microsoft 365', 'Entra ID', 'Intune', 'Defender', 'SharePoint', 'Backup & DR', 'Managed IT Support']

function useMediaQuery(query, initial = false) {
  const [matches, setMatches] = useState(initial)

  useEffect(() => {
    if (typeof window === 'undefined') return
    const mq = window.matchMedia(query)
    const update = () => setMatches(mq.matches)
    update()
    mq.addEventListener?.('change', update)
    return () => mq.removeEventListener?.('change', update)
  }, [query])

  return matches
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

function makeCardTexture({ title, subtitle, status = 'normal', width = 512, height = 210 }) {
  const canvas = document.createElement('canvas')
  canvas.width = width
  canvas.height = height
  const ctx = canvas.getContext('2d')
  const accent = status === 'warning' ? COLORS.red : status === 'secure' ? COLORS.green : COLORS.accent

  ctx.clearRect(0, 0, width, height)
  roundedRect(ctx, 18, 18, width - 36, height - 36, 26)
  ctx.fillStyle = COLORS.surface
  ctx.fill()
  ctx.strokeStyle = status === 'warning' ? 'rgba(239,68,68,0.46)' : status === 'secure' ? 'rgba(34,197,94,0.42)' : 'rgba(56,189,248,0.28)'
  ctx.lineWidth = 2
  ctx.stroke()

  ctx.fillStyle = accent
  ctx.beginPath()
  ctx.arc(52, 58, 7, 0, Math.PI * 2)
  ctx.fill()

  ctx.fillStyle = COLORS.text
  ctx.font = '700 30px Inter, Arial, sans-serif'
  ctx.fillText(title, 74, 68)

  ctx.fillStyle = COLORS.secondary
  ctx.font = '500 18px Inter, Arial, sans-serif'
  ctx.fillText(subtitle, 42, 118)

  ctx.strokeStyle = 'rgba(148,163,184,0.16)'
  ctx.beginPath()
  ctx.moveTo(42, 150)
  ctx.lineTo(width - 42, 150)
  ctx.stroke()

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.generateMipmaps = false
  texture.minFilter = THREE.LinearFilter
  texture.magFilter = THREE.LinearFilter
  return texture
}

function makeCard(title, subtitle, options = {}) {
  const texture = makeCardTexture({ title, subtitle, status: options.status })
  const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: options.opacity ?? 1, depthWrite: false })
  const mesh = new THREE.Mesh(new THREE.PlaneGeometry(options.width ?? 1.55, options.height ?? 0.64), material)
  mesh.userData.texture = texture
  return mesh
}

function makeLine(from, to, color = COLORS.accent, opacity = 0) {
  const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...from), new THREE.Vector3(...to)])
  const material = new THREE.LineBasicMaterial({ color: new THREE.Color(color), transparent: true, opacity })
  return new THREE.Line(geometry, material)
}

function disposeObject(object) {
  object.traverse((child) => {
    child.geometry?.dispose?.()
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material]
      materials.forEach((material) => {
        material.map?.dispose?.()
        material.dispose?.()
      })
    }
    child.userData?.texture?.dispose?.()
  })
}

export default function CinematicInfrastructure() {
  const sectionRef = useRef(null)
  const canvasRef = useRef(null)
  const reduce = useMediaQuery('(prefers-reduced-motion: reduce)')
  const mobile = useMediaQuery('(max-width: 767px)')

  useEffect(() => {
    if (reduce || mobile || typeof window === 'undefined' || !sectionRef.current || !canvasRef.current) return undefined

    gsap.registerPlugin(ScrollTrigger)

    const section = sectionRef.current
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    scene.fog = new THREE.Fog(0x07111f, 9, 18)

    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 40)
    camera.position.set(0, 0.15, 8.4)

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' })
    renderer.setClearColor(0x07111f, 0)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.35))

    const sceneGroup = new THREE.Group()
    const backgroundLayer = new THREE.Group()
    const fragmentedLayer = new THREE.Group()
    const structuredLayer = new THREE.Group()
    const serviceLayer = new THREE.Group()
    const securityLayer = new THREE.Group()
    scene.add(sceneGroup)
    sceneGroup.add(backgroundLayer, fragmentedLayer, structuredLayer, serviceLayer, securityLayer)

    scene.add(new THREE.AmbientLight(0x9cc7f5, 0.95))

    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(9.5, 5.2),
      new THREE.MeshBasicMaterial({ color: 0x0b1728, transparent: true, opacity: 0.78 })
    )
    floor.position.set(0, -1.9, -1.35)
    floor.rotation.x = -Math.PI / 2
    backgroundLayer.add(floor)

    const grid = new THREE.GridHelper(8.8, 10, 0x2563eb, 0x20314d)
    grid.position.set(0, -1.88, -1.35)
    grid.material.transparent = true
    grid.material.opacity = 0.10
    backgroundLayer.add(grid)

    const assetDefs = [
      { title: 'Users', sub: 'access requests', from: [-3.0, 1.08, -0.1], to: [-2.25, 0.78, 0], status: 'normal' },
      { title: 'Laptops', sub: 'endpoint estate', from: [2.72, 1.05, -0.15], to: [-2.2, -0.68, 0], status: 'normal' },
      { title: 'Servers', sub: 'legacy workloads', from: [-2.82, -1.1, -0.35], to: [-0.95, -1.22, 0], status: 'normal' },
      { title: 'Mail', sub: 'messages · calendar', from: [2.86, -1.05, 0], to: [2.12, 0.7, 0], status: 'normal' },
      { title: 'Files', sub: 'collaboration data', from: [-0.62, 1.72, -0.25], to: [2.08, -0.72, 0], status: 'normal' },
      { title: 'Cloud Apps', sub: 'Microsoft services', from: [0.82, -1.55, -0.2], to: [0.95, 1.15, 0], status: 'normal' },
      { title: 'Alerts', sub: 'risk signals', from: [0.1, 0.35, 0.45], to: [0, -1.55, 0], status: 'warning' }
    ]

    const fragmentedAssets = assetDefs.map((asset, index) => {
      const mesh = makeCard(asset.title, asset.sub, { status: asset.status, width: 1.42, height: 0.58 })
      mesh.position.set(...asset.from)
      mesh.rotation.y = (index - 3) * 0.025
      mesh.userData.target = asset.to
      fragmentedLayer.add(mesh)
      return mesh
    })

    const identity = makeCard('Identity', 'MFA · access · governance', { status: 'secure', width: 2.15, height: 0.76, opacity: 0 })
    identity.position.set(0, 0, 0.15)
    structuredLayer.add(identity)

    const connectionLines = assetDefs.map((asset) => {
      const line = makeLine(asset.to, [0, 0, 0.15], asset.status === 'warning' ? COLORS.green : COLORS.accent, 0)
      structuredLayer.add(line)
      return line
    })

    const serviceCards = SERVICES.map((service, index) => {
      const mesh = makeCard(service, index < 5 ? 'service layer' : 'operations layer', { status: index === 3 ? 'secure' : 'normal', width: 1.58, height: 0.5, opacity: 0 })
      const row = index < 4 ? 0 : 1
      const col = index < 4 ? index : index - 4
      mesh.position.set(-2.45 + col * 1.62 + (row ? 0.8 : 0), row ? -1.95 : 1.95, -0.1)
      serviceLayer.add(mesh)
      return mesh
    })

    const governanceRing = new THREE.Mesh(
      new THREE.RingGeometry(2.72, 2.76, 160),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0, side: THREE.DoubleSide })
    )
    governanceRing.position.set(0, 0, -0.12)
    securityLayer.add(governanceRing)

    const secureRing = new THREE.Mesh(
      new THREE.RingGeometry(3.08, 3.12, 160),
      new THREE.MeshBasicMaterial({ color: 0x22c55e, transparent: true, opacity: 0, side: THREE.DoubleSide })
    )
    secureRing.position.set(0, 0, -0.16)
    securityLayer.add(secureRing)

    const finalPanel = makeCard('Managed Infrastructure', 'secure · monitored · recoverable · supported', {
      status: 'secure',
      width: 3.25,
      height: 0.96,
      opacity: 0
    })
    finalPanel.position.set(0, 0.05, 0.32)
    securityLayer.add(finalPanel)

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
        end: '+=3500',
        scrub: 1.4,
        pin: true,
        anticipatePin: 1
      }
    })

    tl.to(camera.position, { z: 7.2, x: 0.8, duration: 1.2 })
      .to(sceneGroup.rotation, { y: 0.08, duration: 1.2 }, '<')

    fragmentedAssets.forEach((mesh) => {
      tl.to(mesh.position, { x: mesh.userData.target[0], y: mesh.userData.target[1], z: mesh.userData.target[2], duration: 1.25 }, 'align')
        .to(mesh.rotation, { x: 0, y: 0, z: 0, duration: 1.25 }, 'align')
        .to(mesh.scale, { x: 0.92, y: 0.92, z: 0.92, duration: 1.25 }, 'align')
    })
    tl.to(identity.material, { opacity: 1, duration: 0.9 }, 'align+=0.3')
      .to(connectionLines.map((line) => line.material), { opacity: 0.34, duration: 0.9 }, 'align+=0.45')
      .to(camera.position, { z: 6.75, x: 0.38, duration: 1.0 }, 'align+=0.25')

    tl.to(serviceCards.map((mesh) => mesh.material), { opacity: 0.88, duration: 0.8, stagger: 0.045 }, 'services')
      .to(serviceCards.map((mesh) => mesh.scale), { x: 1, y: 1, z: 1, duration: 0.8, stagger: 0.045 }, 'services')
      .to(camera.position, { z: 6.35, x: 0.12, duration: 1.0 }, 'services')

    tl.to(governanceRing.material, { opacity: 0.48, duration: 0.8 }, 'security')
      .to(secureRing.material, { opacity: 0.32, duration: 0.8 }, 'security+=0.15')
      .to(camera.position, { z: 6.05, x: 0, duration: 0.9 }, 'security')

    tl.to(fragmentedAssets.map((mesh) => mesh.material), { opacity: 0.24, duration: 0.9 }, 'final')
      .to(serviceCards.map((mesh) => mesh.material), { opacity: 0.22, duration: 0.9 }, 'final')
      .to(identity.material, { opacity: 0.16, duration: 0.9 }, 'final')
      .to(connectionLines.map((line) => line.material), { opacity: 0.10, duration: 0.9 }, 'final')
      .to(finalPanel.material, { opacity: 1, duration: 0.9, ease: 'power2.out' }, 'final+=0.15')
      .to(securityLayer.scale, { x: 1.05, y: 1.05, z: 1.05, duration: 0.9 }, 'final+=0.15')

    let raf = 0
    const render = () => {
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
  }, [reduce, mobile])

  if (reduce || mobile) return <StaticInfrastructureStory />

  return (
    <section ref={sectionRef} className="cinematic-section relative overflow-hidden bg-[#07111F] text-[#F8FAFC]">
      <div className="relative min-h-screen">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />
        <div className="pointer-events-none absolute inset-0 z-[2] bg-[linear-gradient(90deg,rgba(7,17,31,0.98)_0%,rgba(7,17,31,0.86)_44%,rgba(7,17,31,0.34)_78%,rgba(7,17,31,0.74)_100%)]" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-56 bg-gradient-to-t from-[#07111F] to-transparent" />

        <div className="relative z-[5] mx-auto flex min-h-screen max-w-6xl flex-col justify-between px-4 py-10 md:py-14">
          <div className="cinematic-text-panel">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              Microsoft cloud · security · managed IT
            </div>
            <h2 className="cinematic-title mt-5">From IT complexity to controlled digital infrastructure.</h2>
            <p className="cinematic-subtitle mt-5">
              We design, secure, migrate, and operate Microsoft cloud environments, endpoints, identity, data protection, backup, and managed IT support — with one accountable partner.
            </p>
          </div>

          <div className="flex justify-start md:justify-end">
            <div className="pointer-events-auto w-full max-w-xl rounded-3xl border border-white/[0.10] bg-[#07111F]/86 p-5 text-left shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] backdrop-blur-md md:text-right">
              <div className="text-sm font-semibold text-[#F8FAFC]">Ready to bring control to your IT environment?</div>
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

function StaticInfrastructureStory() {
  return (
    <section className="relative overflow-hidden bg-[#07111F] px-4 py-16 text-[#F8FAFC] md:py-24">
      <div className="absolute inset-0 bg-[linear-gradient(180deg,#07111F,#0B1728)]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="cinematic-text-panel">
          <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
            Microsoft cloud · security · managed IT
          </div>
          <h2 className="cinematic-title mt-5">From IT complexity to controlled digital infrastructure.</h2>
          <p className="cinematic-subtitle mt-5">
            We design, secure, migrate, and operate Microsoft cloud environments, endpoints, identity, data protection, backup, and managed IT support — with one accountable partner.
          </p>
        </div>

        <div className="mt-8 rounded-[2rem] border border-white/[0.10] bg-[#101C2E] p-5 shadow-[0_24px_90px_-60px_rgba(0,0,0,0.95)] md:p-8">
          <div className="grid gap-3 md:grid-cols-4">
            {['Fragmented IT', 'Identity center', 'Security layer', 'Managed operations'].map((item, index) => (
              <div key={item} className="rounded-2xl border border-white/[0.10] bg-[#0B1728] p-4">
                <div className="text-xs font-semibold text-[#38BDF8]">0{index + 1}</div>
                <div className="mt-2 text-sm font-semibold text-[#F8FAFC]">{item}</div>
                <div className="mt-2 h-1 rounded-full bg-[#101C2E]">
                  <div className="h-1 rounded-full bg-[#38BDF8]" style={{ width: `${35 + index * 18}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/contacts" className="rounded-full bg-[#2563EB] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]">Book an IT Assessment</Link>
            <Link to="/solutions" className="rounded-full border border-white/[0.14] bg-[#101C2E] px-5 py-2.5 text-sm font-semibold text-[#F8FAFC]">Explore Services</Link>
          </div>
        </div>
      </div>
    </section>
  )
}
