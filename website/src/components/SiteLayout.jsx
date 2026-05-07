import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Spotlight from './Spotlight.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logo from '../assets/logo-green.jpg'

const HeroWebGL = lazy(() => import('./HeroWebGL.jsx'))

export default function SiteLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#07111F] text-[#F8FAFC]">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-16 md:pt-[72px]">
        {/* global WebGL network background (desktop only) */}
        <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
          <Suspense fallback={null}>
            <HeroWebGL logoSrc={logo} showCoin={false} />
          </Suspense>
        </div>

        {/* global subtle spotlight (kept out of the navbar area) */}
        <Spotlight className="z-[1] opacity-40" />

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
