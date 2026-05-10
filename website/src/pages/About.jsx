import { Link } from 'react-router-dom'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'

const pillars = [
  {
    title: 'Operational ownership',
    body: 'Clear responsibility for support, escalation, documentation, vendor coordination, and day-to-day IT operations.',
    icon: icons.governance
  },
  {
    title: 'Security by design',
    body: 'Identity, endpoint, Microsoft 365, backup, and recovery decisions are made with risk control from the start.',
    icon: icons.security
  },
  {
    title: 'Microsoft cloud expertise',
    body: 'Practical delivery across Microsoft 365, Entra ID, Intune, Defender, SharePoint, Exchange, and Teams.',
    icon: icons.cloud
  },
  {
    title: 'Business continuity mindset',
    body: 'Backup, disaster recovery, recovery objectives, and restore testing are treated as operational requirements.',
    icon: icons.backup
  }
]

const credibility = [
  '15+ years IT experience',
  'Microsoft cloud & security',
  'Infrastructure operations',
  'Managed support',
  'Backup & disaster recovery',
  'Business continuity focus'
]

const model = [
  ['Assess', 'Review the current Microsoft cloud, identity, endpoint, backup, security, and support state.'],
  ['Design', 'Define a practical target operating model, risks, responsibilities, and implementation sequence.'],
  ['Implement', 'Deliver the agreed changes with documentation, validation, and business continuity in mind.'],
  ['Operate', 'Support the environment with monitoring, escalation, runbooks, vendor coordination, and ongoing improvements.']
]

const capabilities = [
  'Microsoft 365 & cloud migration',
  'Identity and access management',
  'Endpoint management with Intune',
  'Cybersecurity with Microsoft Defender',
  'SharePoint and data governance',
  'Backup and disaster recovery',
  'Managed IT support',
  'Infrastructure and vendor coordination'
]

const clients = [
  'Retail and distributed offices',
  'Professional services',
  'Energy and engineering companies',
  'Clinical research and regulated environments',
  'Growing SMB and mid-market organizations'
]

export default function About() {
  return (
    <div className="bg-[#07111F] text-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_12%,rgba(56,189,248,0.16),transparent_34%),linear-gradient(180deg,#07111F_0%,#0B1728_100%)] py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-30 [mask-image:radial-gradient(circle_at_70%_18%,black,transparent_68%)]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#CBD5E1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              About IT Outsource Ltd.
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Experienced IT ownership for cloud, security, and business operations.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#CBD5E1] md:text-lg">
              IT Outsource Ltd. is a Sofia-based IT services company focused on Microsoft cloud, cybersecurity, endpoint management, infrastructure, backup, disaster recovery, and managed IT support.
            </p>
          </div>
        </div>
      </section>

      <GemSection eyebrow="What we stand for" title="Operational maturity, not vague IT promises." lead="We focus on clear responsibility, secure architecture, recoverable systems, and practical support ownership.">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((pillar, index) => (
            <Card key={pillar.title} variant="steel" revealDelay={index * 0.04}>
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-sm font-semibold text-[#F8FAFC]">{pillar.title}</h3>
                <Icon as={pillar.icon} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{pillar.body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <section className="bg-[#0B1728] py-6">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-2 rounded-3xl border border-white/[0.12] bg-[#101C2E] p-4 shadow-[0_18px_70px_-54px_rgba(0,0,0,0.85)] sm:grid-cols-2 lg:grid-cols-6">
            {credibility.map((item) => (
              <div key={item} className="rounded-2xl border border-white/[0.10] bg-[#0B1728] px-3 py-3 text-center text-xs font-semibold leading-relaxed text-[#CBD5E1]">
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      <GemSection eyebrow="How we work" title="A simple operating model for controlled IT change." lead="The process is designed to move from current-state risk to a supportable target environment.">
        <div className="grid gap-4 md:grid-cols-4">
          {model.map(([step, body], index) => (
            <Card key={step} variant={index === 0 ? 'brand' : 'steel'}>
              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-[#38BDF8]/35 bg-[#0B1728] text-xs font-semibold text-[#F8FAFC]">
                {index + 1}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#F8FAFC]">{step}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Where we help" title="Focused capabilities across Microsoft IT operations." lead="This is a compact view of the work we take responsibility for — not a duplicated services catalogue.">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div key={item} className="rounded-2xl border border-white/[0.12] bg-[#101C2E] px-4 py-4 text-sm font-semibold text-[#F8FAFC] shadow-[0_18px_55px_-44px_rgba(0,0,0,0.85)]">
              <span className="mr-2 text-[#38BDF8]">•</span>{item}
            </div>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Who we work with" title="Organizations where IT reliability matters." lead="We are a fit for teams that need Microsoft cloud, endpoint, security, backup, and support responsibilities handled clearly.">
        <div className="grid gap-3 md:grid-cols-5">
          {clients.map((item) => (
            <div key={item} className="rounded-2xl border border-white/[0.12] bg-[#101C2E] p-4 text-sm font-semibold leading-relaxed text-[#CBD5E1] shadow-[0_18px_55px_-44px_rgba(0,0,0,0.85)]">
              {item}
            </div>
          ))}
        </div>
      </GemSection>

      <section className="bg-[#07111F] py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="rounded-3xl border border-white/[0.12] bg-[#101C2E] p-6 shadow-[0_22px_90px_-60px_rgba(0,0,0,0.75)] md:p-8">
            <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
              <div>
                <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Next step</div>
                <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">
                  Need a reliable IT partner for cloud, security, and support?
                </h2>
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
                  Let’s review your environment and define the next practical step.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 md:justify-end">
                <SheenButton to="/contacts">Book an IT Assessment</SheenButton>
                <Link
                  to="/contacts"
                  className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-[#101C2E] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8]/45 hover:text-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"
                >
                  Contact Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
