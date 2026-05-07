import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import logo from '../assets/logo-green.jpg'

const HeroWebGL = lazy(() => import('./HeroWebGL.jsx'))

export default function GemLayout() {
  const [desktop, setDesktop] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)')
    const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    const update = () => {
      setDesktop(desktopQuery.matches)
      setReduce(reduceQuery.matches)
    }
    update()
    desktopQuery.addEventListener?.('change', update)
    reduceQuery.addEventListener?.('change', update)
    return () => {
      desktopQuery.removeEventListener?.('change', update)
      reduceQuery.removeEventListener?.('change', update)
    }
  }, [])

  return (
    <div className="min-h-dvh bg-[#07111F] text-[#F8FAFC]">
      <Navbar />
      <main className="relative isolate overflow-hidden pt-16 md:pt-[72px]">
        {/* global WebGL network background (desktop only) */}
        {!reduce && desktop ? (
          <div className="pointer-events-none absolute inset-x-0 top-0 z-[1] hidden h-[760px] opacity-80 md:block [mask-image:linear-gradient(to_bottom,black_0%,black_58%,transparent_100%)]">
            <Suspense fallback={null}>
              <HeroWebGL logoSrc={logo} showCoin={false} />
            </Suspense>
          </div>
        ) : null}

        <div className="relative z-10">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  )
}
