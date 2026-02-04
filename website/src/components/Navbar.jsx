import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useMotionValue, useScroll, useSpring } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo-globe.jpg'

function NavItem({ to, label, end, activePath }) {
  const isActive = end ? activePath === to : activePath.startsWith(to)

  return (
    <Link
      to={to}
      className={
        'relative rounded-full px-3 py-2 text-sm font-medium tracking-wide transition ' +
        (isActive ? 'text-ink-950' : 'text-ink-900/70 hover:text-ink-950')
      }
    >
      {isActive ? (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-brand-200/50 ring-1 ring-brand-300/40"
          transition={{ type: 'spring', stiffness: 420, damping: 34 }}
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const { lang, setLang, content } = useContent()
  const ui = content.shared.ui
  const [open, setOpen] = useState(false)
  const { scrollYProgress } = useScroll()
  const location = useLocation()

  const activePath = useMemo(() => location.pathname, [location.pathname])

  // dynamic 3D tilt for the bar
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const lift = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 220, damping: 24 })
  const sry = useSpring(ry, { stiffness: 220, damping: 24 })
  const slift = useSpring(lift, { stiffness: 240, damping: 26 })

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
    { to: '/', label: ui.home, end: true },
    { to: '/it-support-services', label: ui.support },
    { to: '/it-infrastructure-services', label: ui.infrastructure },
    { to: '/it-consulting-services', label: ui.consulting },
    { to: '/solutions', label: ui.solutions },
    { to: '/about', label: ui.about },
    { to: '/contacts', label: ui.contact }
  ]

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* scroll progress */}
      <motion.div
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <motion.div style={{ perspective: 900 }} className="relative">
          <motion.div
            onMouseMove={(e) => {
              const r = e.currentTarget.getBoundingClientRect()
              const px = (e.clientX - r.left) / r.width
              const py = (e.clientY - r.top) / r.height
              const max = 6
              rx.set((0.5 - py) * max)
              ry.set((px - 0.5) * max)
              lift.set(-2)
            }}
            onMouseLeave={() => {
              rx.set(0)
              ry.set(0)
              lift.set(0)
            }}
            style={{ transformStyle: 'preserve-3d', rotateX: srx, rotateY: sry, y: slift }}
            className="relative rounded-2xl border border-black/10 bg-white/75 px-4 shadow-[0_14px_50px_-28px_rgba(0,0,0,0.25)] backdrop-blur"
          >
            {/* glass edge + sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-300/16 via-white/70 to-brand-200/10" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-black/5" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-black/10 to-transparent" />

            <div className="relative z-10 flex h-14 items-center justify-between">
              {/* brand: logo only */}
              <Link to="/" className="flex items-center" onClick={() => setOpen(false)}>
                <div className="relative">
                  <img
                    src={logo}
                    alt="IT Outsource Ltd."
                    className="h-10 w-auto md:h-12"
                    loading="eager"
                  />
                </div>
              </Link>

              {/* links */}
              <nav className="hidden items-center gap-1 md:flex">
                {links.map((l) => (
                  <NavItem
                    key={l.to}
                    to={l.to}
                    end={l.end}
                    label={l.label}
                    activePath={activePath}
                  />
                ))}
                <button
                  type="button"
                  onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-semibold text-ink-900/80 hover:text-ink-950"
                  aria-label="Toggle language"
                >
                  <span className={lang === 'bg' ? 'text-ink-950' : 'text-ink-900/60'}>BG</span>
                  <span className="text-ink-900/30">/</span>
                  <span className={lang === 'en' ? 'text-ink-950' : 'text-ink-900/60'}>EN</span>
                </button>
              </nav>

              {/* actions */}
              <div className="flex items-center gap-3">
                <SheenButton to="/contacts" className="hidden px-4 py-2 md:inline-flex">
                  {ui.getQuote}
                </SheenButton>


                <button
                  type="button"
                  className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-ink-900/80 hover:text-ink-950 md:hidden"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  onClick={() => setOpen((v) => !v)}
                >
                  <span className="text-xl leading-none">{open ? '×' : '☰'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
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
              <div className="rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur">
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
                            ? 'bg-white/10 text-ink-950'
                            : 'text-ink-950/75 hover:bg-white/70 hover:text-ink-950'
                        ].join(' ')
                      }
                    >
                      {l.label}
                    </NavLink>
                  ))}
                </div>

                <div className="mt-3 grid gap-2">
                  <SheenButton
                    to="/contacts"
                    onClick={() => setOpen(false)}
                    className="w-full rounded-xl px-4 py-3 text-sm font-semibold"
                  >
                    {ui.getQuote}
                  </SheenButton>

                  <button
                    type="button"
                    onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink-950/80 hover:text-ink-950"
                  >
                    {lang === 'bg' ? 'EN' : 'BG'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
