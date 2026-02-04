import { Link } from 'react-router-dom'
import { Icon, icons } from './Icons.jsx'
import SheenButton from './SheenButton.jsx'

export default function PageHero({
  eyebrow,
  title,
  lead,
  subline,
  aside,
  primaryCta = { to: '/contacts', label: 'Contact us' },
  secondaryCta = { to: '/solutions', label: 'Explore solutions' }
}) {
  return (
    <section className="relative overflow-hidden pt-10 md:pt-14">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-brand-500/16 blur-3xl" />
        <div className="absolute -bottom-56 right-0 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/12 blur-3xl" />
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute inset-0 hero-noise" />
      </div>

      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          <div>
            {eyebrow ? (
              <div className="inline-flex items-center gap-3 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-ink-950/75">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" aria-hidden="true" />
                {eyebrow}
              </div>
            ) : null}

            {title ? (
              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{title}</h1>
            ) : null}

            {lead ? (
              <p className="mt-5 text-base font-medium text-ink-950/85 md:text-lg">{lead}</p>
            ) : null}

            {subline ? (
              <p className="mt-4 max-w-2xl text-sm leading-relaxed text-ink-900/65 md:text-base">
                {subline}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-3">
              <SheenButton to={primaryCta.to}>{primaryCta.label}</SheenButton>
              <Link
                to={secondaryCta.to}
                className="rounded-full border border-black/10 bg-white/70 px-6 py-3 text-sm font-semibold text-ink-950/90 hover:bg-white/10"
              >
                <span>{secondaryCta.label}</span>
              </Link>
            </div>
          </div>

          {aside ? (
            <div className="rounded-3xl border border-black/10 bg-white/70 p-7 md:p-8">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-ink-900/55">
                    {aside.eyebrow}
                  </div>
                  <div className="mt-3 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">
                    {aside.title}
                  </div>
                  {aside.lead ? (
                    <div className="mt-2 text-sm text-ink-900/65">{aside.lead}</div>
                  ) : null}
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-black/10 bg-white/40">
                  <Icon as={icons[aside.icon] ?? icons.tools} className="h-6 w-6 text-brand-200" />
                </span>
              </div>

              {aside.items?.length ? (
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {aside.items.map((it) => (
                    <div key={it.k} className="rounded-2xl border border-black/10 bg-white/700 px-4 py-3">
                      <div className="text-xs text-ink-900/55">{it.k}</div>
                      <div className="mt-1 text-sm font-semibold">{it.v}</div>
                    </div>
                  ))}
                </div>
              ) : null}
            </div>
          ) : null}
        </div>

        <div className="mt-10 section-divider" />
      </div>
    </section>
  )
}
