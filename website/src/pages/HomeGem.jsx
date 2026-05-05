import { motion } from 'framer-motion'
import GemSection from '../components/GemSection.jsx'
import KpiStrip from '../components/KpiStrip.jsx'
import Stepper from '../components/Stepper.jsx'
import { ClickCard } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import ProofLayer from '../components/ProofLayer.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

export default function HomeGem() {
  const { content, lang } = useContent()
  const c = content.home
  const ui = content.shared.ui

  return (
    <div id="top" className="relative">
      {/* HERO */}
      <section className="relative overflow-hidden bg-navy-950 text-white">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(34,195,246,0.22),transparent_34%),radial-gradient(circle_at_80%_10%,rgba(0,127,189,0.28),transparent_32%),linear-gradient(135deg,#06111f_0%,#081a2e_54%,#0b223b_100%)]" />
        <div className="pointer-events-none absolute inset-0 hero-grid opacity-40" />
        <div className="mx-auto max-w-6xl px-4 pt-10 md:pt-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div className="relative z-10">
              <div className="inline-flex items-center gap-3 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-brand-100">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-300" aria-hidden="true" />
                {ui.itServicesBadge}
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{c.heroTitle}</h1>
              <p className="mt-5 text-base font-medium text-white/86 md:text-lg">{c.heroSubline}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/66 md:text-base">
                Microsoft 365, Azure, Entra ID, Intune, Defender, backup and disaster recovery services — assessed,
                implemented and operated by engineers who own the technical outcome.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SheenButton to="/contacts">{ui.getQuote ?? ui.contactUs}</SheenButton>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/80 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
                >
                  <span>{lang === 'bg' ? 'Запазете консултация' : 'Book a Consultation'}</span>
                </a>
              </div>
            </div>

            {/* hero side: logo + metric-like cards (inspired, not a clone) */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                className="rounded-3xl border border-white/15 bg-white/8 p-8 shadow-[0_30px_120px_-60px_rgba(34,195,246,0.8)] backdrop-blur"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-100/80">Enterprise delivery</div>
                  <div className="mt-3 text-4xl font-semibold tracking-tight text-white">10+ years</div>
                  <div className="mt-2 text-sm text-white/65">Assess · Design · Migrate · Secure · Operate</div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                    <div className="text-xs text-white/58">Microsoft cloud</div>
                    <div className="mt-1 text-sm font-semibold text-white">M365 + Azure</div>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                    <div className="text-xs text-white/58">Security</div>
                    <div className="mt-1 text-sm font-semibold text-white">Zero Trust</div>
                  </div>
                  <div className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3">
                    <div className="text-xs text-white/58">Continuity</div>
                    <div className="mt-1 text-sm font-semibold text-white">Backup + DR</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* SERVICE ENTRY CARDS */}
          <div className="relative z-10 mt-10 grid gap-4 pb-10 md:grid-cols-3">
            {c.highlights.map((x, i) => (
              <ClickCard
                key={x.title}
                to={i === 0 ? '/it-support-services' : i === 1 ? '/solutions' : '/it-infrastructure-services'}
                variant={i === 0 ? 'brand' : i === 1 ? 'violet' : 'steel'}
                badge={i === 0 ? 'Support' : i === 1 ? 'Solutions' : 'Infrastructure'}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold">{x.title}</div>
                  <Icon as={icons[x.icon] ?? icons.tools} />
                </div>
                <div className="mt-3 text-sm text-ink-900/70">{x.description}</div>
              </ClickCard>
            ))}
          </div>
        </div>
      </section>

      <ProofLayer />

      {/* KPI strip */}
      <GemSection eyebrow="At a glance" title="Delivery KPIs" lead="Operational discipline with enterprise-ready controls.">
        <KpiStrip
          items={[
            { value: '10+ yrs', label: 'Experience', note: 'Design · Integrate · Support' },
            { value: '24/7', label: 'Operations', note: 'SLA-driven support' },
            { value: 'MFA', label: 'Security baseline', note: 'Hardening + policies' },
            { value: 'Fast', label: 'Response times', note: 'Clear escalation paths' }
          ]}
        />
      </GemSection>

      {/* Sections reusing only our text */}
      <GemSection eyebrow={ui.servicesEyebrow} title={ui.servicesTitle} lead={ui.servicesLead}>
        <div className="grid gap-4 md:grid-cols-3">
          <ClickCard to="/it-support-services" variant="brand" badge="Managed support">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.support.title}</div>
              <Icon as={icons.support} />
            </div>
            <div className="mt-3 text-sm text-ink-900/70">{c.services.support.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-infrastructure-services" variant="steel" badge="Platforms">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
              <Icon as={icons.infrastructure} />
            </div>
            <div className="mt-3 text-sm text-ink-900/70">{c.services.infrastructure.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-consulting-services" variant="violet" badge="Strategy">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.consulting.title}</div>
              <Icon as={icons.consulting} />
            </div>
            <div className="mt-3 text-sm text-ink-900/70">{c.services.consulting.items[0]}</div>
          </ClickCard>
        </div>
      </GemSection>

      {/* Stepper */}
      <GemSection eyebrow="Process" title="How we deliver" lead="A clear, repeatable engagement model — from assessment to ongoing support.">
        <Stepper
          steps={[
            { title: 'Assess', icon: 'consulting', body: 'Understand requirements, risks, and current state.' },
            { title: 'Design', icon: 'platform', body: 'Define architecture, security, and a delivery plan.' },
            { title: 'Implement', icon: 'tools', body: 'Build, integrate, automate, and document.' },
            { title: 'Run', icon: 'support', body: 'Operate with monitoring, SLAs, and continuous improvement.' }
          ]}
        />
      </GemSection>

      <ConversionCta />
    </div>
  )
}
