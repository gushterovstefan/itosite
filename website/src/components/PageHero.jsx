import { Link } from 'react-router-dom'
import { Icon, icons } from './Icons.jsx'
import SheenButton from './SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

export default function PageHero({
  eyebrow,
  title,
  lead,
  subline,
  aside,
  primaryCta = { to: '/contacts', label: 'Contact us' },
  secondaryCta = { to: '/solutions', label: 'Explore solutions' }
}) {
  const { lang, localizedPath } = useContent()
  const bookingLabel = lang === 'bg' ? 'Запазете консултация' : 'Book a Consultation'
  const showSecondary = secondaryCta?.href !== BOOKING_URL

  return (
    <section className="relative overflow-hidden bg-navy-950 pt-24 text-white md:pt-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_8%,rgba(34,195,246,0.18),transparent_34%),radial-gradient(circle_at_82%_30%,rgba(120,212,255,0.09),transparent_35%),linear-gradient(180deg,rgba(255,255,255,0.045),transparent_40%,rgba(248,250,252,0.08)_82%,rgba(248,250,252,0.18)_100%)]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 pb-14 md:pb-20">
        <div className="grid min-w-0 gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center">
          <div className="min-w-0 max-w-3xl">
            {eyebrow ? (
              <div className="inline-flex items-center gap-2 rounded-full border border-white/14 bg-white/8 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.20em] text-brand-100">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden="true" />
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h1 className="mt-5 max-w-full text-[2.35rem] font-semibold leading-[1.06] tracking-tight md:text-5xl xl:text-6xl">{title}</h1>
            ) : null}

            {lead ? (
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/82 md:text-lg">{lead}</p>
            ) : null}

            {subline ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/64 md:text-base">
                {subline}
              </p>
            ) : null}

            <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <SheenButton
                to={primaryCta.to}
                href={primaryCta.href}
                target={primaryCta.href ? '_blank' : undefined}
                rel={primaryCta.href ? 'noreferrer' : undefined}
                className="w-full px-5 py-3 text-center sm:w-auto"
              >
                {primaryCta.label}
              </SheenButton>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-white/8 px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/14 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950 sm:w-auto"
              >
                <span>{bookingLabel}</span>
              </a>
              {showSecondary && secondaryCta.href ? (
                <a
                  href={secondaryCta.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-transparent px-5 py-3 text-center text-sm font-semibold text-white/88 hover:bg-white/10 sm:w-auto"
                >
                  <span>{secondaryCta.label}</span>
                </a>
              ) : showSecondary ? (
                <Link
                  to={localizedPath(secondaryCta.to)}
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/18 bg-transparent px-5 py-3 text-center text-sm font-semibold text-white/88 hover:bg-white/10 sm:w-auto"
                >
                  <span>{secondaryCta.label}</span>
                </Link>
              ) : null}
            </div>
          </div>

          {aside ? (
            <div className="min-w-0 rounded-3xl border border-white/12 bg-white/7 p-5 shadow-[0_20px_80px_-60px_rgba(0,0,0,0.9)] backdrop-blur md:p-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.20em] text-brand-100/78">
                    {aside.eyebrow}
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                    {aside.title}
                  </div>
                  {aside.lead ? (
                    <div className="mt-2 text-sm leading-relaxed text-white/66">{aside.lead}</div>
                  ) : null}
                </div>
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl border border-white/12 bg-white/8">
                  <Icon as={icons[aside.icon] ?? icons.tools} className="h-6 w-6 text-brand-200" />
                </span>
              </div>

              {aside.items?.length ? (
                <div className="mt-6 grid gap-3 sm:grid-cols-3">
                  {aside.items.map((it) => (
                    <div key={it.k} className="rounded-2xl border border-white/10 bg-white/7 px-4 py-3">
                      <div className="text-xs text-white/55">{it.k}</div>
                      <div className="mt-1 text-sm font-semibold text-white">{it.v}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-10 h-px bg-gradient-to-r from-transparent via-brand-200/28 to-transparent" />
      </div>

      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent via-slate-50/8 to-slate-50" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 -bottom-px h-px bg-slate-50" />
    </section>
  )
}
