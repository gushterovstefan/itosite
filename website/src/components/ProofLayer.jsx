import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    eyebrow: 'Proof of delivery',
    title: 'Enterprise IT delivery for regulated, distributed and uptime-sensitive businesses.',
    logos: ['Bulgarian retail operations', 'EU clinical research organization', 'Renewable energy group', 'Professional services teams'],
    metrics: [
      ['10+ yrs', 'designing, integrating and supporting IT solutions'],
      ['24/7', 'operations mindset for business-critical environments'],
      ['ISO/GDPR', 'governance-aware delivery and documentation']
    ],
    cases: [
      {
        title: 'Workspace modernization',
        body: 'A distributed organization moved toward Microsoft 365 governance with identity, device and operational controls defined upfront.',
        metrics: ['M365', 'Entra/Intune', 'phased rollout']
      },
      {
        title: 'Infrastructure resilience',
        body: 'Hybrid infrastructure and backup planning aligned server, virtualization, recovery and support ownership into one operating model.',
        metrics: ['hybrid', 'backup/DR', 'clear runbooks']
      }
    ]
  },
  bg: {
    eyebrow: 'Доказана доставка',
    title: 'Enterprise ИТ доставка за регулирани, разпределени и uptime-sensitive бизнеси.',
    logos: ['Български retail операции', 'EU clinical research организация', 'Група за възобновяема енергия', 'Professional services екипи'],
    metrics: [
      ['10+ г.', 'дизайн, интеграция и поддръжка на ИТ решения'],
      ['24/7', 'оперативен подход за бизнес-критични среди'],
      ['ISO/GDPR', 'governance-aware доставка и документация']
    ],
    cases: [
      {
        title: 'Модернизация на работна среда',
        body: 'Разпределена организация премина към Microsoft 365 governance с identity, device и operational контроли, дефинирани предварително.',
        metrics: ['M365', 'Entra/Intune', 'phased rollout']
      },
      {
        title: 'Устойчивост на инфраструктурата',
        body: 'Hybrid infrastructure и backup planning обединиха server, virtualization, recovery и support ownership в един operating model.',
        metrics: ['hybrid', 'backup/DR', 'clear runbooks']
      }
    ]
  }
}

export default function ProofLayer() {
  const { lang } = useContent()
  const l = copy[lang] || copy.en

  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="rounded-3xl border border-black/10 bg-white/76 p-5 backdrop-blur md:p-6">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-700/80">{l.eyebrow}</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-ink-950 md:text-3xl">{l.title}</h2>
              <div className="mt-5 grid gap-2 sm:grid-cols-2">
                {l.logos.map((item) => (
                  <div key={item} className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink-900/75">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-4">
              <div className="grid gap-3 md:grid-cols-3">
                {l.metrics.map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-black/10 bg-brand-200/30 p-4">
                    <div className="text-2xl font-semibold tracking-tight text-ink-950">{value}</div>
                    <div className="mt-2 text-xs leading-relaxed text-ink-900/62">{label}</div>
                  </div>
                ))}
              </div>

              <div className="grid gap-3 md:grid-cols-2">
                {l.cases.map((item) => (
                  <article key={item.title} className="rounded-2xl border border-black/10 bg-white/72 p-4">
                    <h3 className="text-sm font-semibold text-ink-950">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/66">{item.body}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {item.metrics.map((metric) => (
                        <span key={metric} className="rounded-full border border-black/10 bg-white/80 px-3 py-1 text-[11px] font-semibold text-ink-900/65">
                          {metric}
                        </span>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
