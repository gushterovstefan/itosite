import { Link, NavLink, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo-globe-small.jpg'
import { BOOKING_URL } from '../config/booking.js'

function NavItem({ to, label, end, activePath }) {
  const isActive = end ? activePath === to : activePath.startsWith(to)

  return (
    <Link
      to={to}
      aria-current={isActive ? 'page' : undefined}
      className={
        'relative rounded-lg px-3 py-2 text-sm font-semibold tracking-normal transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 ' +
        (isActive ? 'bg-[#101E33] text-[#F8FAFC]' : 'text-[#CBD5E1] hover:bg-[#101E33] hover:text-[#F8FAFC]')
      }
    >
      {label}
    </Link>
  )
}

export default function Navbar() {
  const { lang, setLang, content } = useContent()
  const ui = content.shared.ui
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  const activePath = useMemo(() => location.pathname, [location.pathname])
  const bookingLabel = lang === 'bg' ? 'Запазете разговор' : 'Book a 30-min call'

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
    <header className="fixed inset-x-0 top-0 z-50 bg-[#07111F] pb-3 shadow-[0_12px_40px_-34px_rgba(0,0,0,0.95)]">
      <div
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-[#2563EB]"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto max-w-6xl px-4 pt-3">
        <div className="rounded-2xl border border-white/10 bg-[#07111F]/95 px-4 shadow-[0_18px_70px_-38px_rgba(0,0,0,0.95)] backdrop-blur-xl">
          <div className="flex h-14 items-center justify-between gap-3">
            <Link to="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
              <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/10 bg-[#0B1728] md:h-11 md:w-11">
                <img src={logo} alt="IT Outsource Ltd." width="96" height="92" className="h-9 w-auto md:h-10" loading="eager" />
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} end={l.end} label={l.label} activePath={activePath} />
              ))}
              <button
                type="button"
                onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                className="ml-1 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-[#101E33] px-3 py-2 text-xs font-semibold text-[#CBD5E1] hover:text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"
                aria-label="Toggle language"
              >
                <span className={lang === 'bg' ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'}>BG</span>
                <span className="text-[#94A3B8]">/</span>
                <span className={lang === 'en' ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'}>EN</span>
              </button>
            </nav>

            <div className="flex items-center gap-2">
              <SheenButton to="/contacts" className="hidden px-4 py-2 md:inline-flex">
                {ui.getQuote}
              </SheenButton>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="hidden items-center justify-center rounded-full border border-white/10 bg-[#101E33] px-4 py-2 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#0B1728] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 md:inline-flex"
              >
                {bookingLabel}
              </a>

              <button
                ref={menuButtonRef}
                type="button"
                className="ml-1 inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-[#101E33] text-[#F8FAFC] hover:bg-[#0B1728] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 md:hidden"
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

      {open ? (
        <div className="fixed inset-0 z-[60] md:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/70" onClick={() => setOpen(false)} />
          <div id="mobile-navigation" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site navigation" className="relative mx-auto mt-16 w-full max-w-6xl px-4">
            <div className="rounded-2xl border border-white/10 bg-[#07111F] p-3 shadow-2xl">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">Menu</span>
                <button ref={closeButtonRef} type="button" className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-[#101E33] text-2xl leading-none text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
              </div>
              <div className="grid gap-1">
                {links.map((l) => (
                  <NavLink key={l.to} to={l.to} end={l.end} onClick={() => setOpen(false)} className={({ isActive }) => ['rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70', isActive ? 'bg-[#101E33] text-[#F8FAFC]' : 'text-[#CBD5E1] hover:bg-[#101E33] hover:text-[#F8FAFC]'].join(' ')}>
                    {l.label}
                  </NavLink>
                ))}
              </div>
              <div className="mt-3 grid gap-2">
                <SheenButton to="/contacts" onClick={() => setOpen(false)} className="w-full rounded-xl px-4 py-3 text-sm font-semibold">{ui.getQuote}</SheenButton>
                <a href={BOOKING_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="inline-flex w-full items-center justify-center rounded-xl border border-white/10 bg-[#101E33] px-4 py-3 text-sm font-semibold text-[#F8FAFC] hover:bg-[#0B1728]">{bookingLabel}</a>
                <button type="button" onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')} className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-[#101E33] px-4 py-3 text-sm font-semibold text-[#CBD5E1] hover:text-[#F8FAFC]">BG / EN</button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
