import { Outlet } from 'react-router-dom'
import Spotlight from './Spotlight.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function SiteLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      <Navbar />
      <main className="relative pt-16">
        {/* global subtle spotlight (kept out of the navbar area) */}
        <Spotlight className="opacity-40" />

        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
