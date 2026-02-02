import { Link, NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useScroll } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo.png'

function NavItem({ to, label, end, activePath }) {
  const isActive = end ? activePath === to : activePath.startsWith(to)

  return (
    <Link
      to={to}
      className={
        'relative rounded-full px-3 py-2 text-sm font-medium tracking-wide transition ' +
        (isActive ? 'text-white' : 'text-white/70 hover:text-white')
      }
    >
      {isActive ? (
        <motion.span
          layoutId="nav-pill"
          className="absolute inset-0 rounded-full bg-white/8 ring-1 ring-white/10"
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
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-400 via-brand-300 to-fuchsia-400"
        style={{ scaleX: scrollYProgress }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="relative rounded-2xl border border-white/10 bg-ink-950/55 px-4 shadow-[0_12px_40px_-24px_rgba(0,0,0,0.85)] backdrop-blur">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-500/10 via-white/5 to-fuchsia-500/10" />

          <div className="relative z-10 flex h-14 items-center justify-between">
            {/* brand */}
            <motion.div
              whileHover={{ rotateX: 6, rotateY: -8 }}
              transition={{ type: 'spring', stiffness: 220, damping: 24 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="relative flex items-center gap-3"
            >
              <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
                <div className="relative rounded-2xl border border-white/10 bg-white/5 p-2 shadow-[0_10px_30px_-22px_rgba(0,0,0,0.9)]">
                  <img src={logo} alt="IT Outsource Ltd." className="h-9 w-auto" loading="eager" />
                </div>
                <div className="hidden leading-tight md:block">
                  <div className="text-sm font-semibold tracking-wide text-white">IT Outsource LTD</div>
                  <div className="text-xs text-white/55">Delivery-first IT services</div>
                </div>
              </Link>
            </motion.div>

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
                className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:text-white"
                aria-label="Toggle language"
              >
                <span className={lang === 'bg' ? 'text-white' : 'text-white/60'}>BG</span>
                <span className="text-white/30">/</span>
                <span className={lang === 'en' ? 'text-white' : 'text-white/60'}>EN</span>
              </button>
            </nav>

            {/* actions */}
            <div className="flex items-center gap-3">
              <SheenButton to="/contacts" className="hidden px-4 py-2 md:inline-flex">
                {ui.getQuote}
              </SheenButton>

              <motion.a
                whileHover={{ y: -1 }}
                whileTap={{ scale: 0.98 }}
                href="#top"
                className="inline-flex rounded-full border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:text-white"
              >
                Modern UI (v1)
              </motion.a>

              <button
                type="button"
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80 hover:text-white md:hidden"
                aria-label={open ? 'Close menu' : 'Open menu'}
                aria-expanded={open}
                onClick={() => setOpen((v) => !v)}
              >
                <span className="text-xl leading-none">{open ? '×' : '☰'}</span>
              </button>
            </div>
          </div>
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
                    className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-white/80 hover:text-white"
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
