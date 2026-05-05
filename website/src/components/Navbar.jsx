import { Link, NavLink } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../content/index.jsx'
import SheenButton from './SheenButton.jsx'
import logo from '../assets/logo-globe-small.jpg'

const navCopy = {
  en: {
    menu: 'Menu',
    cta: 'Request IT Assessment',
    mobileCta: 'Assessment',
    links: [
      ['Services', '/managed-it-support'],
      ['Microsoft 365', '/microsoft-365'],
      ['Azure & Infrastructure', '/azure-cloud'],
      ['Cybersecurity', '/cybersecurity'],
      ['Backup & Disaster Recovery', '/backup-disaster-recovery'],
      ['Case Studies', '/case-studies'],
      ['About', '/about'],
      ['Contact', '/contacts']
    ]
  },
  bg: {
    menu: 'Меню',
    cta: 'Заявете ИТ оценка',
    mobileCta: 'Оценка',
    links: [
      ['Услуги', '/managed-it-support'],
      ['Microsoft 365', '/microsoft-365'],
      ['Azure и инфраструктура', '/azure-cloud'],
      ['Киберсигурност', '/cybersecurity'],
      ['Backup и DR', '/backup-disaster-recovery'],
      ['Казуси', '/case-studies'],
      ['За нас', '/about'],
      ['Контакти', '/contacts']
    ]
  }
}

function NavItem({ to, label, end, activePath }) {
  const { localizedPath } = useContent()
  const localizedTo = localizedPath(to)
  const isActive = end ? activePath === to : activePath === to || activePath.startsWith(`${to}/`)

  return (
    <Link
      to={localizedTo}
      aria-current={isActive ? 'page' : undefined}
      className={
        'relative rounded-full px-3 py-2 text-[13px] font-semibold tracking-wide transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 ' +
        (isActive ? 'text-navy-950' : 'text-white/72 hover:text-white')
      }
    >
      {isActive ? <span className="absolute inset-0 rounded-full bg-brand-300 ring-1 ring-brand-200/60" /> : null}
      <span className="relative z-10 whitespace-nowrap">{label}</span>
    </Link>
  )
}

export default function Navbar() {
  const { lang, setLang, basePath, localizedPath } = useContent()
  const [open, setOpen] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const menuButtonRef = useRef(null)
  const closeButtonRef = useRef(null)
  const drawerRef = useRef(null)

  const activePath = useMemo(() => basePath, [basePath])
  const copy = navCopy[lang] || navCopy.en
  const links = copy.links.map(([label, to]) => ({ label, to }))

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
      const focusable = drawerRef.current?.querySelectorAll('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])')
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

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div
        className="absolute left-0 top-0 h-[2px] w-full origin-left bg-gradient-to-r from-brand-700 via-brand-400 to-brand-200"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />

      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-4">
        <div className="relative rounded-2xl border border-white/12 bg-navy-950/90 px-3 shadow-[0_14px_50px_-28px_rgba(0,0,0,0.55)] backdrop-blur-xl md:px-4">
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-r from-brand-400/12 via-white/5 to-brand-200/8" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-white/5" />
          <div className="pointer-events-none absolute inset-x-0 top-0 h-px rounded-2xl bg-gradient-to-r from-transparent via-white/18 to-transparent" />

          <div className="relative z-10 flex h-16 items-center justify-between gap-3">
            <Link to={localizedPath('/')} className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt="IT Outsource Ltd."
                width="96"
                height="92"
                className="h-10 w-auto md:h-12"
                loading="eager"
              />
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Primary navigation">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} label={l.label} activePath={activePath} />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <SheenButton to="/contacts" className="inline-flex px-3 py-2 text-[12px] font-semibold sm:px-4 sm:text-sm">
                <span className="hidden sm:inline">{copy.cta}</span>
                <span className="sm:hidden">{copy.mobileCta}</span>
              </SheenButton>

              <button
                type="button"
                onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                className="hidden items-center gap-1 rounded-full border border-white/12 bg-white/8 px-3 py-2 text-xs font-semibold text-white/75 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 lg:inline-flex"
                aria-label="Toggle language"
              >
                <span className={lang === 'bg' ? 'text-brand-100' : 'text-white/45'}>BG</span>
                <span className="text-white/25">/</span>
                <span className={lang === 'en' ? 'text-brand-100' : 'text-white/45'}>EN</span>
              </button>

              <button
                ref={menuButtonRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/12 bg-white/10 text-white/85 hover:bg-white/16 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/70 xl:hidden"
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
        <div className="fixed inset-0 z-[60] xl:hidden">
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />

          <div
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="relative mx-auto mt-20 w-full max-w-2xl px-4"
          >
            <div className="rounded-2xl border border-black/10 bg-white/96 p-3 shadow-2xl backdrop-blur">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">{copy.menu}</span>
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

              <div className="grid gap-1 sm:grid-cols-2">
                {links.map((l) => (
                  <NavLink
                    key={l.to}
                    to={localizedPath(l.to)}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      [
                        'rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70',
                        isActive
                          ? 'bg-brand-200/60 text-ink-950 ring-1 ring-brand-300/40'
                          : 'text-ink-950/75 hover:bg-white/70 hover:text-ink-950'
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                <SheenButton to="/contacts" onClick={() => setOpen(false)} className="w-full rounded-xl px-4 py-3 text-sm font-semibold">
                  {copy.cta}
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
