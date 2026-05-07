import { Link, useLocation } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../content/index.jsx'
import logo from '../assets/brand-icon.png'
import { BOOKING_URL } from '../config/booking.js'

function NavItem({ to, label, end, activePath, onClick }) {
  const isActive = end ? activePath === to : activePath === to || activePath.startsWith(`${to}/`)

  return (
    <Link
      to={to}
      onClick={onClick}
      aria-current={isActive ? 'page' : undefined}
      className={
        'inline-flex items-center rounded-lg px-3 py-2 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 ' +
        (isActive
          ? 'bg-[#2F80ED]/18 text-[#F8FAFC] ring-1 ring-[#2F80ED]/35'
          : 'text-[#E5E7EB] hover:bg-[#101E2F] hover:text-[#38BDF8]')
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
  const location = useLocation()
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  const activePath = useMemo(() => location.pathname, [location.pathname])
  const consultationLabel = 'Book a Consultation'

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

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
      const focusable = drawerRef.current?.querySelectorAll('a[href], button:not([disabled])')
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
    <header className="enterprise-header fixed inset-x-0 top-0 z-50 h-16 border-b border-white/[0.08] bg-[rgba(7,17,31,0.88)] shadow-[0_18px_60px_-46px_rgba(0,0,0,0.95)] backdrop-blur-[14px] md:h-[72px]">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between gap-3 px-4">
        <Link to="/" className="flex shrink-0 items-center gap-3" aria-label="IT Outsource home">
          <span className="grid h-10 w-10 place-items-center overflow-hidden rounded-xl border border-white/[0.12] bg-[#07111F] p-0.5 md:h-11 md:w-11">
            <img src={logo} alt="IT Outsource Ltd." width="512" height="512" className="h-full w-full object-cover" loading="eager" />
          </span>
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-1 lg:flex" aria-label="Primary navigation">
          {links.map((l) => (
            <NavItem key={l.to} to={l.to} end={l.end} label={l.label} activePath={activePath} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
            className="hidden items-center gap-1 rounded-lg border border-white/[0.12] bg-[#101E2F] px-3 py-2 text-xs font-semibold text-[#F8FAFC] hover:bg-[#0B1B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 sm:inline-flex"
            aria-label="Toggle language"
          >
            <span className={lang === 'bg' ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'}>BG</span>
            <span className="text-[#94A3B8]">/</span>
            <span className={lang === 'en' ? 'text-[#F8FAFC]' : 'text-[#94A3B8]'}>EN</span>
          </button>

          <a
            href={BOOKING_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex h-10 items-center justify-center rounded-full bg-[#2F80ED] px-3 text-xs font-bold text-[#0F172A] shadow-[0_14px_34px_-20px_rgba(47,128,237,0.95)] ring-1 ring-[#38BDF8]/35 transition hover:bg-[#2F80ED] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 sm:px-4 sm:text-sm md:px-5"
          >
            {consultationLabel}
          </a>

          <button
            ref={menuButtonRef}
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#101E2F] text-[#F8FAFC] hover:bg-[#0B1B2B] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="text-xl leading-none">{open ? '×' : '☰'}</span>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-x-0 top-16 z-[60] border-b border-white/[0.12] bg-[#07111F] shadow-2xl lg:hidden md:top-[72px]">
          <div id="mobile-navigation" ref={drawerRef} role="dialog" aria-modal="true" aria-label="Site navigation" className="w-full px-4 py-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">Menu</span>
              <button ref={closeButtonRef} type="button" className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.12] bg-[#101E2F] text-2xl leading-none text-[#F8FAFC] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70" aria-label="Close menu" onClick={() => setOpen(false)}>×</button>
            </div>

            <nav className="grid gap-3 text-base" aria-label="Mobile navigation">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} end={l.end} label={l.label} activePath={activePath} onClick={() => setOpen(false)} />
              ))}
            </nav>

            <div className="mt-4 grid gap-2">
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" onClick={() => setOpen(false)} className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-[#2F80ED] px-4 text-sm font-semibold text-[#0F172A] ring-1 ring-[#38BDF8]/25">{consultationLabel}</a>
              <button type="button" onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')} className="inline-flex h-11 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 text-sm font-semibold text-[#CBD5E1]">BG / EN</button>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
