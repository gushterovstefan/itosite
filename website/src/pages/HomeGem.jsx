import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import ProofLayer from '../components/ProofLayer.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import NetworkBackdrop from '../components/NetworkBackdrop.jsx'
import brandBanner from '../assets/brand-banner-600.jpg'

const CinematicInfrastructure = lazy(() => import('../components/CinematicInfrastructure.jsx'))

const coreServices = [
  {
    title: 'Microsoft 365 & Cloud Services',
    badge: 'Cloud',
    icon: icons.cloud,
    body: 'Tenant setup, migration, Exchange, Teams, licensing, security baseline, and operational ownership.'
  },
  {
    title: 'Identity & Access Management',
    badge: 'Entra ID',
    icon: icons.security,
    body: 'Entra ID, MFA, Conditional Access, role governance, access reviews, and secure sign-in policies.'
  },
  {
    title: 'Endpoint Management with Intune',
    badge: 'Endpoints',
    icon: icons.devices,
    body: 'Device enrollment, compliance policies, application deployment, patching, and endpoint configuration.'
  },
  {
    title: 'Cybersecurity with Defender',
    badge: 'Security',
    icon: icons.shield,
    body: 'Microsoft Defender hardening, alert handling, secure configuration, and incident-ready controls.'
  },
  {
    title: 'SharePoint & Data Governance',
    badge: 'Data',
    icon: icons.files,
    body: 'SharePoint structure, permissions, retention, collaboration controls, and practical data governance.'
  },
  {
    title: 'Backup & Disaster Recovery',
    badge: 'Recovery',
    icon: icons.backup,
    body: 'Backup design, recovery objectives, restore testing, immutable copies, and disaster recovery runbooks.'
  },
  {
    title: 'Managed IT Support',
    badge: 'Operations',
    icon: icons.support,
    body: 'SLA-driven support, monitoring, escalation, documentation, vendor coordination, and daily operations.'
  }
]

const outcomes = [
  ['Less operational noise', 'Clear ownership for Microsoft 365, identity, endpoints, backups, and support.'],
  ['Lower security exposure', 'MFA, Conditional Access, Defender, endpoint compliance, and recovery controls are managed as one system.'],
  ['Better recovery readiness', 'Backup and disaster recovery are designed, documented, and tested before incidents happen.'],
  ['Executive clarity', 'Roadmaps, runbooks, responsibilities, and service boundaries are understandable to business leaders.']
]

const industries = [
  ['Retail & distributed teams', 'Standardized devices, mail, files, identity, and support across locations.'],
  ['Life sciences & regulated work', 'Governance-aware Microsoft cloud, access control, documentation, and recovery readiness.'],
  ['Energy, engineering & field operations', 'Endpoint management, secure access, and resilient collaboration for mobile teams.'],
  ['Professional services & SMB', 'Practical Microsoft 365, security, backup, and managed support without enterprise overhead.']
]

const reasons = [
  ['One accountable partner', 'Assessment, migration, security, backup, and support are connected instead of split between vendors.'],
  ['Microsoft-first operating model', 'Entra ID, Intune, Defender, SharePoint, Exchange, Teams, and backup are treated as one environment.'],
  ['Operational documentation', 'Policies, runbooks, recovery steps, access decisions, and support processes are documented.'],
  ['Security without drama', 'Controls are implemented calmly: MFA, device compliance, hardening, monitoring, and recovery testing.']
]

export default function HomeGem() {
  return (
    <div id="top" className="relative bg-[#07111F] text-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.18),transparent_35%),linear-gradient(180deg,#07111F_0%,#0B1728_100%)]">
        <NetworkBackdrop className="z-0 opacity-50" />
        <div className="relative z-10 mx-auto max-w-6xl px-4 pb-12 pt-10 md:pb-16 md:pt-14">
          <div className="grid items-center gap-10 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#CBD5E1]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
                Microsoft cloud · cybersecurity · managed IT
              </div>

              <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
                IT services for secure Microsoft cloud operations.
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#CBD5E1] md:text-lg">
                IT Outsource designs, migrates, secures, and operates Microsoft 365, Entra ID, Intune, Defender, SharePoint, backup, disaster recovery, and managed IT support environments.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <SheenButton to="/contacts">Book an IT Assessment</SheenButton>
                <Link
                  to="/solutions"
                  className="rounded-full border border-white/[0.12] bg-[#101C2E] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8]/45 hover:text-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"
                >
                  Explore Services
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-white/[0.12] bg-[#101C2E] p-5 shadow-[0_22px_80px_-56px_rgba(0,0,0,0.9)] md:p-8">
              <img
                src={brandBanner}
                alt="IT Outsource Ltd. — Enterprise IT, Cloud, Operations"
                width="600"
                height="160"
                className="w-full rounded-2xl border border-white/[0.12] bg-[#07111F] object-contain"
                loading="eager"
                decoding="async"
              />

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                {[
                  ['15+ years', 'IT delivery'],
                  ['24/7', 'operations mindset'],
                  ['MFA + DR', 'security baseline']
                ].map(([value, label]) => (
                  <div key={value} className="rounded-2xl border border-white/[0.12] bg-[#0B1728] px-4 py-3">
                    <div className="text-lg font-semibold text-[#F8FAFC]">{value}</div>
                    <div className="mt-1 text-xs text-[#94A3B8]">{label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <ProofLayer />

      <Suspense fallback={<div className="min-h-[60vh] bg-[#07111F]" aria-label="Loading cinematic infrastructure animation" />}>
        <CinematicInfrastructure />
      </Suspense>

      <GemSection
        eyebrow="Core Services"
        title="One managed Microsoft IT operating model."
        lead="A focused service set for organizations that need Microsoft cloud, identity, endpoint, security, data, backup, and support handled as one environment."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {coreServices.map((service, index) => (
            <Card key={service.title} variant={index === 0 ? 'brand' : 'steel'} badge={service.badge} revealDelay={index * 0.03}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#F8FAFC]">{service.title}</h3>
                <Icon as={service.icon ?? icons.tools} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{service.body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Business Outcomes"
        title="What improves when IT is structured."
        lead="The goal is not another tool rollout. The goal is a controlled environment with clear ownership, security, recovery, and support."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(([title, body]) => (
            <Card key={title} variant="steel">
              <h3 className="text-sm font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Industries / Use Cases"
        title="Designed for practical, uptime-sensitive teams."
        lead="We support environments where identity, devices, collaboration, backup, and support must work reliably across teams and locations."
      >
        <div className="grid gap-4 md:grid-cols-2">
          {industries.map(([title, body]) => (
            <Card key={title} variant="steel">
              <h3 className="text-sm font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Why IT Outsource"
        title="Architecture, security, migration, and operations under one roof."
        lead="We reduce vendor fragmentation by connecting technical design with ongoing support and recovery ownership."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map(([title, body]) => (
            <Card key={title} variant="steel">
              <h3 className="text-sm font-semibold text-[#F8FAFC]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta
        title="Ready to make Microsoft IT easier to operate?"
        lead="Start with a practical assessment of Microsoft 365, identity, endpoints, security, backup, disaster recovery, and managed support ownership."
      />
    </div>
  )
}
