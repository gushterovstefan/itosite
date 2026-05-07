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
  const { lang } = useContent()
  const bookingLabel = lang === 'bg' ? 'Запазете 30-минутен разговор' : 'Book a 30-min call'
  const showSecondary = secondaryCta?.href !== BOOKING_URL

  return (
    <section className="relative overflow-hidden bg-[#07111F] pt-12 text-[#F8FAFC] md:pt-16">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#07111F_0%,#0B1728_100%)]" />
        <div className="absolute inset-x-0 top-0 h-px bg-[#101E33]" />
        <div className="absolute inset-0 hero-grid opacity-20" />
      </div>

      <div className="relative mx-auto max-w-6xl px-4 py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            {eyebrow ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-[#101E33] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                {eyebrow}
              </div>
            ) : null}

            {title ? <h1 className="mt-5 text-4xl font-semibold tracking-tight text-[#F8FAFC] md:text-6xl">{title}</h1> : null}
            {lead ? <p className="mt-5 max-w-2xl text-base font-medium leading-relaxed text-[#CBD5E1] md:text-lg">{lead}</p> : null}
            {subline ? <p className="mt-4 max-w-2xl text-sm leading-relaxed text-[#94A3B8] md:text-base">{subline}</p> : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <SheenButton to={primaryCta.to} href={primaryCta.href} target={primaryCta.href ? '_blank' : undefined} rel={primaryCta.href ? 'noreferrer' : undefined}>{primaryCta.label}</SheenButton>
              <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-[#101E33] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#0B1728] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"><span>{bookingLabel}</span></a>
              {showSecondary && secondaryCta.href ? (
                <a href={secondaryCta.href} target="_blank" rel="noreferrer" className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-[#CBD5E1] hover:bg-[#101E33]"><span>{secondaryCta.label}</span></a>
              ) : showSecondary ? (
                <Link to={secondaryCta.to} className="rounded-full border border-white/10 bg-transparent px-6 py-3 text-sm font-semibold text-[#CBD5E1] hover:bg-[#101E33]"><span>{secondaryCta.label}</span></Link>
              ) : null}
            </div>
          </div>

          {aside ? (
            <div className="rounded-3xl border border-white/10 bg-[#101E33] p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)] md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">{aside.eyebrow}</div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">{aside.title}</div>
                  {aside.lead ? <div className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{aside.lead}</div> : null}
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#0B1728]">
                  <Icon as={icons[aside.icon] ?? icons.tools} className="h-6 w-6 text-[#38BDF8]" />
                </span>
              </div>

              {aside.items?.length ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {aside.items.map((it) => (
                    <div key={it.k} className="rounded-2xl border border-white/10 bg-[#0B1728] px-4 py-3">
                      <div className="text-xs text-[#94A3B8]">{it.k}</div>
                      <div className="mt-1 text-sm font-semibold text-[#F8FAFC]">{it.v}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-10 h-px bg-[#101E33]" />
      </div>
    </section>
  )
}
