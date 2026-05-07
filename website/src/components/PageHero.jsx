import { Link } from 'react-router-dom'
import { Icon, icons } from './Icons.jsx'
import NetworkBackdrop from './NetworkBackdrop.jsx'
import SheenButton from './SheenButton.jsx'
import { BOOKING_URL } from '../config/booking.js'

export default function PageHero({
  eyebrow,
  title,
  lead,
  subline,
  trustLine,
  aside,
  primaryCta = { to: '/contacts', label: 'Contact us' },
  secondaryCta = { to: '/solutions', label: 'Explore solutions' }
}) {
  const showBooking = primaryCta?.href !== BOOKING_URL && secondaryCta?.href !== BOOKING_URL
  const bookingLabel = 'Book a Consultation'

  return (
    <section className="relative isolate overflow-hidden pt-12 text-[#FFFFFF] md:pt-16" style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.28), transparent 35%), linear-gradient(180deg, #07111F 0%, #0B1726 100%)' }}>
      <NetworkBackdrop className="z-0 opacity-70" />
      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute inset-x-0 top-0 h-px bg-white/[0.12]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 pb-6 pt-12 md:pb-8 md:pt-16">
        <div className={aside ? 'grid gap-10 md:grid-cols-[minmax(0,1fr)_360px] md:items-start' : ''}>
          <div>
            {eyebrow ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101E31] px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                {eyebrow}
              </div>
            ) : null}

            {title ? <h1 className="mt-5 max-w-[850px] text-4xl font-semibold tracking-tight text-[#FFFFFF] md:text-6xl md:leading-[1.02]">{title}</h1> : null}
            {lead ? <p className="mt-6 max-w-[720px] text-base font-medium leading-relaxed text-[#CBD5E1] md:text-xl">{lead}</p> : null}
            {subline ? <p className="mt-4 max-w-[720px] text-sm leading-relaxed text-[#94A3B8] md:text-base">{subline}</p> : null}
            {trustLine ? <p className="mt-5 max-w-[720px] text-xs font-semibold uppercase tracking-[0.16em] text-[#38BDF8] md:text-sm">{trustLine}</p> : null}

            <div className="mt-9 flex flex-wrap gap-3">
              <SheenButton to={primaryCta.to} href={primaryCta.href} target={primaryCta.href ? '_blank' : undefined} rel={primaryCta.href ? 'noreferrer' : undefined} className="px-7 py-3.5 text-base">
                {primaryCta.label}
              </SheenButton>
              {secondaryCta?.href ? (
                <a href={secondaryCta.href} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#101E31] px-7 py-3.5 text-base font-semibold text-[#FFFFFF] transition hover:bg-[#0B1726] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"><span>{secondaryCta.label}</span></a>
              ) : secondaryCta ? (
                <Link to={secondaryCta.to} className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#101E31] px-7 py-3.5 text-base font-semibold text-[#FFFFFF] transition hover:bg-[#0B1726] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"><span>{secondaryCta.label}</span></Link>
              ) : null}
              {showBooking ? <a href={BOOKING_URL} target="_blank" rel="noreferrer" className="inline-flex items-center justify-center rounded-full border border-white/15 bg-[#101E31] px-7 py-3.5 text-base font-semibold text-[#FFFFFF] transition hover:bg-[#0B1726] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"><span>{bookingLabel}</span></a> : null}
            </div>
          </div>

          {aside ? (
            <div className="rounded-3xl border border-white/[0.12] bg-[#101E31] p-7 shadow-[0_22px_70px_-48px_rgba(0,0,0,0.9)] md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#94A3B8]">{aside.eyebrow}</div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-[#FFFFFF] md:text-3xl">{aside.title}</div>
                  {aside.lead ? <div className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{aside.lead}</div> : null}
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.12] bg-[#0B1726]">
                  <Icon as={icons[aside.icon] ?? icons.tools} className="h-6 w-6 text-[#38BDF8]" />
                </span>
              </div>

              {aside.items?.length ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-3 md:grid-cols-1">
                  {aside.items.map((it) => (
                    <div key={it.k} className="rounded-2xl border border-white/[0.12] bg-[#0B1726] px-4 py-3">
                      <div className="text-xs text-[#94A3B8]">{it.k}</div>
                      <div className="mt-1 text-sm font-semibold text-[#FFFFFF]">{it.v}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
