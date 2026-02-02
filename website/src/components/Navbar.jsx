import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import logo from '../assets/logo.png'

const navLinkClass = ({ isActive }) =>
  [
    'text-sm tracking-wide transition',
    isActive ? 'text-white' : 'text-white/70 hover:text-white'
  ].join(' ')

export default function Navbar() {
  const [open, setOpen] = useState(false)

  // Close on ESC
  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  const links = [
    { to: '/', label: 'Home', end: true },
    { to: '/it-support-services', label: 'Support' },
    { to: '/it-infrastructure-services', label: 'Infrastructure' },
    { to: '/it-consulting-services', label: 'Consulting' },
    { to: '/solutions', label: 'Solutions' },
    { to: '/about', label: 'About' },
    { to: '/contacts', label: 'Contact' }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink-950/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src={logo} alt="IT Outsource Ltd." className="h-10 w-auto" loading="eager" />
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end} className={navLinkClass}>
              {l.label}
            </NavLink>
          ))}
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

          {/* mobile menu button */}
          <button
            type="button"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white md:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-lg leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {/* mobile drawer */}
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] md:hidden"
          >
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />

            <motion.div
              initial={{ y: -12, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -12, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative mx-auto mt-16 w-full max-w-6xl px-4"
            >
              <div className="rounded-2xl border border-white/10 bg-ink-950/95 p-3 shadow-2xl backdrop-blur">
                <div className="grid gap-1">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      end={l.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'rounded-xl px-4 py-3 text-sm font-medium transition',
                          isActive
                            ? 'bg-white/10 text-white'
                            : 'text-white/75 hover:bg-white/5 hover:text-white'
                        ].join(' ')
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-3 grid gap-2">
                  <Link
                    to="/contacts"
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center justify-center rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-400"
                  >
                    Get a quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
