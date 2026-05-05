import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logo from '../assets/logo-green.jpg'

const HeroWebGL = lazy(() => import('./HeroWebGL.jsx'))

export default function GemLayout() {
  return (
    <div className="min-h-dvh bg-white text-ink-900">
      <Navbar />
      <main className="relative isolate pt-14 md:pt-16">
        {/* global WebGL network background (desktop only) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <Suspense fallback={null}>
            <HeroWebGL logoSrc={logo} showCoin={false} />
          </Suspense>
        </div>

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
