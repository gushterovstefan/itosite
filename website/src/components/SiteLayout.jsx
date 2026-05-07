import { lazy, Suspense } from 'react'
import { Outlet } from 'react-router-dom'
import Spotlight from './Spotlight.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logo from '../assets/logo-green.jpg'

const HeroWebGL = lazy(() => import('./HeroWebGL.jsx'))

export default function SiteLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden bg-[#07111F] text-[#FFFFFF]">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-16 md:pt-[72px]">
        {/* global WebGL network background (desktop only) */}
        <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[760px] opacity-80 md:block [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]">
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
