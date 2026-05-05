import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo-globe-small.jpg'

function NavItem({ to, label, end, activePath }) {
  const isActive = end ? activePath === to : activePath.startsWith(to)

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={
        'relative rounded-full px-3 py-2 text-sm font-medium tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 ' +
        (isActive ? 'text-ink-950' : 'text-ink-900/70 hover:text-ink-950')
      }
    >
      {isActive ? (
        <span
          className="absolute inset-0 rounded-full bg-brand-200/50 ring-1 ring-brand-300/40"
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
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()

  const activePath = useMemo(() => location.pathname, [location.pathname])

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      setScrollProgress(max > 0 ? Math.min(window.scrollY / max, 1) : 0)
    }
    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])

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
      <div
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-600 via-brand-500 to-brand-300"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="relative">
          <div className="relative rounded-2xl border border-black/10 bg-white/75 px-4 shadow-[0_14px_50px_-28px_rgba(0,0,0,0.25)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5">
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
                    width="96"
                    height="92"
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
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-black/10 bg-white/70 px-3 py-2 text-xs font-semibold text-ink-900/80 hover:text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
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
                  className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-ink-900/80 hover:text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 md:hidden"
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
      </div>

      {/* mobile drawer */}
      {open ? (
          <div className="fixed inset-0 z-[60] md:hidden">
            <button
              type="button"
              aria-label="Close menu"
              className="absolute inset-0 bg-black/60"
              onClick={() => setOpen(false)}
            />

            <div className="relative mx-auto mt-16 w-full max-w-6xl px-4">
              <div className="rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">Menu</span>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 bg-white/80 text-2xl leading-none text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
                    aria-label="Close menu"
                    onClick={() => setOpen(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="grid gap-1">
                  {links.map((l) => (
                    <NavLink
                      key={l.to}
                      to={l.to}
                      end={l.end}
                      onClick={() => setOpen(false)}
                      className={({ isActive }) =>
                        [
                          'rounded-xl px-4 py-3 text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70',
                          isActive
                            ? 'bg-brand-200/50 text-ink-950 ring-1 ring-brand-300/40'
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
                    className="inline-flex items-center justify-center rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink-950/80 hover:text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
                  >
                    {lang === 'bg' ? 'EN' : 'BG'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : null}
    </header>
  )
}
