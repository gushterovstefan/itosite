import { Outlet } from 'react-router-dom'
import Spotlight from './Spotlight.jsx'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function SiteLayout() {
  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* global subtle spotlight */}
      <Spotlight className="opacity-60" />

      <Navbar />
      <main className="relative pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
