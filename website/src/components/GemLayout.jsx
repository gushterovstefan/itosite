import { Outlet } from 'react-router-dom'
import Navbar from './Navbar.jsx'
import Footer from './Footer.jsx'

export default function GemLayout() {
  return (
    <div className="min-h-dvh bg-ink-950 text-white">
      <Navbar />
      <main className="pt-14 md:pt-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
