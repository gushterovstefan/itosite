import { lazy, Suspense, useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'
import CookieConsent from './CookieConsent.jsx'
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
    <div className="min-h-dvh bg-white text-ink-900">
      <Navbar />
      <main className="relative isolate pt-14 md:pt-16">
        {/* global WebGL network background (desktop only) */}
        {!reduce && desktop ? (
          <div className="pointer-events-none absolute inset-0 z-0 hidden md:block">
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
      <CookieConsent />
    </div>
  )
}
