import { Link, NavLink } from 'react-router-dom'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useContent } from '../content/index.jsx'
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
      ['Backup & DR', '/backup-disaster-recovery'],
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
        'rounded-lg px-2.5 py-2 text-[13px] font-semibold tracking-normal transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 ' +
        (isActive ? 'bg-navy-950 text-white' : 'text-slate-700 hover:bg-slate-100 hover:text-navy-950')
      }
    >
      <span className="whitespace-nowrap">{label}</span>
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
        <div className="rounded-2xl border border-slate-200/80 bg-white/96 px-3 shadow-[0_12px_36px_-28px_rgba(15,23,42,0.55)] backdrop-blur-xl md:px-4">
          <div className="flex h-14 items-center justify-between gap-3">
            <Link to={localizedPath('/')} className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
              <img
                src={logo}
                alt="IT Outsource Ltd."
                width="96"
                height="92"
                className="h-8 w-auto md:h-9"
                loading="eager"
              />
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-center gap-0.5 xl:flex" aria-label="Primary navigation">
              {links.map((l) => (
                <NavItem key={l.to} to={l.to} label={l.label} activePath={activePath} />
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-2">
              <Link
                to={localizedPath('/contacts')}
                className="hidden items-center justify-center rounded-lg bg-navy-950 px-3 py-2 text-[12px] font-semibold text-white shadow-sm transition hover:bg-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 sm:inline-flex sm:px-4 sm:text-sm"
              >
                <span className="hidden sm:inline">{copy.cta}</span>
                <span className="sm:hidden">{copy.mobileCta}</span>
              </Link>

              <button
                type="button"
                onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                className="hidden items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 lg:inline-flex"
                aria-label="Toggle language"
              >
                <span className={lang === 'bg' ? 'text-navy-950' : 'text-slate-400'}>BG</span>
                <span className="text-slate-300">/</span>
                <span className={lang === 'en' ? 'text-navy-950' : 'text-slate-400'}>EN</span>
              </button>

              <button
                ref={menuButtonRef}
                type="button"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70 xl:hidden"
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
          <button type="button" aria-label="Close menu" className="absolute inset-0 bg-slate-950/55" onClick={() => setOpen(false)} />

          <div
            id="mobile-navigation"
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site navigation"
            className="relative mx-auto mt-20 w-full max-w-2xl px-4"
          >
            <div className="rounded-2xl border border-slate-200 bg-white p-3 shadow-2xl">
              <div className="mb-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">{copy.menu}</span>
                <button
                  ref={closeButtonRef}
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 bg-white text-2xl leading-none text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70"
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
                        'rounded-xl px-4 py-3 text-sm font-semibold transition focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70',
                        isActive
                          ? 'bg-navy-950 text-white'
                          : 'text-slate-700 hover:bg-slate-100 hover:text-navy-950'
                      ].join(' ')
                    }
                  >
                    {l.label}
                  </NavLink>
                ))}
              </div>

              <div className="mt-3 grid gap-2 sm:grid-cols-[1fr_auto]">
                <Link
                  to={localizedPath('/contacts')}
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-navy-950 px-4 py-3 text-sm font-semibold text-white hover:bg-navy-900"
                >
                  {copy.cta}
                </Link>

                <button
                  type="button"
                  onClick={() => setLang(lang === 'bg' ? 'en' : 'bg')}
                  className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-800 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500/70"
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
