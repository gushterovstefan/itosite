import { Link, NavLink } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo-globe-small.jpg'
import { BOOKING_URL } from '../config/booking.js'

function NavItem({ to, label, end, activePath }) {
  const { localizedPath } = useContent()
  const localizedTo = localizedPath(to)
  const isActive = end ? activePath === to : activePath.startsWith(to)

  return (
    <Link
      to={localizedTo}
      aria-current={isActive ? 'page' : undefined}
      className={
        'relative rounded-full px-3 py-2 text-sm font-medium tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 ' +
        (isActive ? 'text-navy-950' : 'text-white/72 hover:text-white')
      }
    >
      {isActive ? (
        <span
          className="absolute inset-0 rounded-full bg-brand-300 ring-1 ring-brand-200/60"
        />
      ) : null}
      <span className="relative z-10">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const { lang, setLang, content, basePath } = useContent()
  const ui = content.shared.ui
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  const activePath = useMemo(() => basePath, [basePath])
  const bookingLabel = lang === 'bg' ? 'Консултация' : 'Consultation'

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
      if (e.key === 'Escape') {
        setOpen(false)
        menuButtonRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  // Prevent background scroll when menu is open
  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : ''
    if (open) window.setTimeout(() => closeButtonRef.current?.focus(), 0)
    return () => {
      document.documentElement.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    if (!open) return undefined
    const onKeyDown = (event) => {
      if (event.key !== 'Tab') return
      const focusable = drawerRef.current?.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
      if (!focusable?.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
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
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-700 via-brand-400 to-brand-200"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="relative">
          <div className="relative rounded-2xl border border-white/12 bg-navy-950/88 px-4 shadow-[0_14px_50px_-28px_rgba(0,0,0,0.45)] backdrop-blur transition-transform duration-200 hover:-translate-y-0.5">
            {/* glass edge + sheen */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-400/12 via-white/5 to-brand-200/8" />
            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-white/18 to-transparent" />

            <div className="relative z-10 flex h-14 items-center justify-between">
              {/* brand: logo only */}
              <Link to={lang === 'bg' ? '/bg' : '/'} className="flex items-center" onClick={() => setOpen(false)}>
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
                  className="ml-1 inline-flex items-center gap-1 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold text-white/75 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70"
                  aria-label="Toggle language"
                >
                  <span className={lang === 'bg' ? 'text-brand-100' : 'text-white/45'}>BG</span>
                  <span className="text-white/25">/</span>
                  <span className={lang === 'en' ? 'text-brand-100' : 'text-white/45'}>EN</span>
                </button>
              </nav>

              {/* actions */}
              <div className="flex items-center gap-2">
                <SheenButton to="/contacts" className="hidden px-4 py-2 md:inline-flex">
                  {ui.getQuote}
                </SheenButton>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden items-center justify-center rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/14 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 md:inline-flex"
                >
                  {bookingLabel}
                </a>


                <button
                  ref={menuButtonRef}
                  type="button"
                  className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-black/10 bg-white/70 text-ink-900/80 hover:text-ink-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70 md:hidden"
                  aria-label={open ? 'Close menu' : 'Open menu'}
                  aria-expanded={open}
                  aria-controls="mobile-navigation"
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

            <div
              id="mobile-navigation"
              ref={drawerRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="relative mx-auto mt-16 w-full max-w-6xl px-4"
            >
              <div className="rounded-2xl border border-black/10 bg-white/95 p-3 shadow-2xl backdrop-blur">
                <div className="mb-2 flex items-center justify-between px-1">
                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">Menu</span>
                  <button
                    ref={closeButtonRef}
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
                      to={lang === 'bg' ? `/bg${l.to === '/' ? '' : l.to}` : l.to}
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

                  <a
                    href={BOOKING_URL}
                    target="_blank"
                    rel="noreferrer"
                    onClick={() => setOpen(false)}
                    className="inline-flex w-full items-center justify-center rounded-xl border border-black/10 bg-white/80 px-4 py-3 text-sm font-semibold text-ink-950/90 hover:bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
                  >
                    {bookingLabel}
                  </a>

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
