import GemSection from '../components/GemSection.jsx'
import KpiStrip from '../components/KpiStrip.jsx'
import Stepper from '../components/Stepper.jsx'
import { ClickCard } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import ProofLayer from '../components/ProofLayer.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import NetworkBackdrop from '../components/NetworkBackdrop.jsx'
import brandBanner from '../assets/brand-banner-600.jpg'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

export default function HomeGem() {
  const { content, lang } = useContent()
  const c = content.home
  const ui = content.shared.ui

  return (
    <div id="top" className="relative bg-[#07111F] text-[#FFFFFF]">
      {/* HERO */}
      <section className="relative overflow-hidden" style={{ background: 'radial-gradient(circle at top right, rgba(37,99,235,0.28), transparent 35%), linear-gradient(180deg, #07111F 0%, #0B1726 100%)' }}>
        <NetworkBackdrop className="z-0 opacity-70" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pt-10 md:pt-12">
          <div className="grid items-center gap-10 md:grid-cols-2">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101E31] px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                {ui.itServicesBadge}
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">{c.heroTitle}</h1>
              <p className="mt-5 text-base font-medium text-[#FFFFFF] md:text-lg">{c.heroSubline}</p>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#94A3B8] md:text-base">
                IT Outsource helps organizations reduce downtime, secure Microsoft 365, modernize legacy infrastructure, and improve backup and recovery readiness.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SheenButton to="/contacts">{ui.getQuote ?? ui.contactUs}</SheenButton>
                <a
                  href={BOOKING_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full border border-white/[0.12] bg-[#101E31] px-6 py-3 text-sm font-semibold text-[#FFFFFF] hover:bg-[#0B1726]"
                >
                  <span>{lang === 'bg' ? 'Запазете 30-минутен разговор' : 'Book a 30-min call'}</span>
                </a>
              </div>
            </div>

            {/* hero side: logo + metric-like cards (inspired, not a clone) */}
            <div className="relative text-[#FFFFFF]">
              <div className="rounded-3xl border border-white/[0.12] bg-[#101E31] p-5 shadow-[0_18px_70px_-48px_rgba(0,0,0,0.65)] md:p-8">
                <img
                  src={brandBanner}
                  alt="IT Outsource Ltd. — Enterprise IT, Cloud, Operations"
                  width="600"
                  height="160"
                  className="w-full rounded-2xl border border-white/[0.12] bg-[#07111F] object-contain"
                  loading="eager"
                  decoding="async"
                />

                <div className="mt-6">
                  <div className="text-xs font-semibold uppercase tracking-[0.28em] text-[#CBD5E1]">Enterprise delivery</div>
                  <div className="mt-3 text-4xl font-semibold tracking-tight text-[#FFFFFF]">15+ years</div>
                  <div className="mt-2 text-sm text-[#94A3B8]">Design · Build · Secure · Run</div>
                </div>

                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/[0.12] bg-[#0B1726] px-4 py-3">
                    <div className="text-xs text-[#CBD5E1]">Availability</div>
                    <div className="mt-1 text-sm font-semibold">24/7 Ops</div>
                  </div>
                  <div className="rounded-2xl border border-white/[0.12] bg-[#0B1726] px-4 py-3">
                    <div className="text-xs text-[#CBD5E1]">Security</div>
                    <div className="mt-1 text-sm font-semibold">MFA + Hardening</div>
                  </div>
                  <div className="rounded-2xl border border-white/[0.12] bg-[#0B1726] px-4 py-3">
                    <div className="text-xs text-[#CBD5E1]">Delivery</div>
                    <div className="mt-1 text-sm font-semibold">SLA-driven</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* SERVICE ENTRY CARDS */}
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {c.highlights.map((x, i) => (
              <ClickCard
                key={x.title}
                to={i === 0 ? '/it-support-services' : i === 1 ? '/solutions' : '/it-infrastructure-services'}
                variant={i === 0 ? 'brand' : i === 1 ? 'steel' : 'steel'}
                badge={i === 0 ? 'Support' : i === 1 ? 'Solutions' : 'Infrastructure'}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold">{x.title}</div>
                  <Icon as={icons[x.icon] ?? icons.tools} />
                </div>
                <div className="mt-3 text-sm text-[#CBD5E1]">{x.description}</div>
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
            { value: '15+ yrs', label: 'Experience', note: 'Design · Integrate · Support' },
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
            <div className="mt-3 text-sm text-[#CBD5E1]">{c.services.support.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-infrastructure-services" variant="steel" badge="Platforms">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.infrastructure.title}</div>
              <Icon as={icons.infrastructure} />
            </div>
            <div className="mt-3 text-sm text-[#CBD5E1]">{c.services.infrastructure.items[0]}</div>
          </ClickCard>

          <ClickCard to="/it-consulting-services" variant="steel" badge="Strategy">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.services.consulting.title}</div>
              <Icon as={icons.consulting} />
            </div>
            <div className="mt-3 text-sm text-[#CBD5E1]">{c.services.consulting.items[0]}</div>
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
