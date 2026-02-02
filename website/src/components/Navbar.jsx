import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import logo from '../assets/logo.png'

const navLinkClass = ({ isActive }) =>
  [
    'text-sm tracking-wide transition',
    isActive ? 'text-white' : 'text-white/70 hover:text-white'
  ].join(' ')

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logo}
            alt="IT Outsource Ltd."
            className="h-10 w-auto"
            loading="eager"
          />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          <NavLink to="/" className={navLinkClass} end>
            Home
          </NavLink>
          <NavLink to="/it-support-services" className={navLinkClass}>
            Support
          </NavLink>
          <NavLink to="/it-infrastructure-services" className={navLinkClass}>
            Infrastructure
          </NavLink>
          <NavLink to="/it-consulting-services" className={navLinkClass}>
            Consulting
          </NavLink>
          <NavLink to="/solutions" className={navLinkClass}>
            Solutions
          </NavLink>
          <NavLink to="/about" className={navLinkClass}>
            About
          </NavLink>
          <NavLink to="/contacts" className={navLinkClass}>
            Contact
          </NavLink>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contacts"
            className="hidden rounded-full bg-brand-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-brand-500/20 transition hover:bg-brand-400 md:inline-flex"
          >
            Get a quote
          </Link>
          <motion.a
            whileHover={{ y: -1 }}
            whileTap={{ scale: 0.98 }}
            href="#top"
            className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:text-white"
          >
            Modern UI (v1)
          </motion.a>
        </div>
      </div>
    </header>
  )
}
