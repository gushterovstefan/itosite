import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { BulletList, Card, ClickCard } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { BOOKING_URL } from '../config/booking.js'

const outcomes = [
  {
    title: 'Legacy infrastructure risk',
    icon: 'infrastructure',
    text: 'Many companies still depend on aging servers, outdated ERP environments, weak backup models, or fragmented IT ownership.'
  },
  {
    title: 'Microsoft 365 underutilization',
    icon: 'cloud',
    text: 'Organizations often pay for Microsoft 365 but use only email and Teams, while security, compliance, DLP, Intune, and automation remain unused.'
  },
  {
    title: 'Weak endpoint control',
    icon: 'security',
    text: 'Unmanaged laptops, local admin rights, poor patching, and inconsistent device policies create avoidable operational and security risk.'
  },
  {
    title: 'Business continuity gaps',
    icon: 'backup',
    text: 'Backups exist, but restore testing, RTO/RPO planning, disaster recovery scenarios, and ownership are often missing.'
  },
  {
    title: 'Cloud migration complexity',
    icon: 'cloud',
    text: 'Moving from Google Workspace, legacy file servers, or on-prem systems to Microsoft 365 and Azure requires planning, cleanup, permissions mapping, testing, and adoption.'
  },
  {
    title: 'Lack of executive visibility',
    icon: 'assessment',
    text: 'Management needs clear reporting, risk visibility, project governance, and predictable IT costs.'
  }
]

const expertiseBadges = ['Microsoft 365', 'Azure', 'Intune', 'Defender', 'Veeam', 'SharePoint', 'Entra ID', 'Sentinel']

const coreSolutions = [
  {
    title: 'Microsoft 365 Modern Workplace',
    icon: 'cloud',
    outcome: 'Improve collaboration, security, and productivity across the organization.',
    bullets: [
      'Microsoft 365 tenant design',
      'Exchange Online, SharePoint, OneDrive, Teams',
      'Entra ID identity governance',
      'Conditional Access',
      'MFA and security defaults',
      'Migration from Google Workspace or legacy mail platforms',
      'User adoption and training'
    ],
    cta: 'Explore Microsoft 365 services',
    to: '/solutions/microsoft-365'
  },
  {
    title: 'Endpoint Management with Intune',
    icon: 'security',
    outcome: 'Standardize and secure company devices.',
    bullets: [
      'Windows and macOS device enrollment',
      'Intune policy design',
      'Compliance policies',
      'Autopilot deployment',
      'Application deployment',
      'Local admin control',
      'Defender integration',
      'Remote wipe and device lifecycle'
    ],
    cta: 'Secure company devices',
    to: '/contacts'
  },
  {
    title: 'Cybersecurity & Compliance',
    icon: 'security',
    outcome: 'Reduce risk and improve security governance.',
    bullets: [
      'Microsoft Defender for Endpoint',
      'Defender for Cloud Apps',
      'Defender for Office 365',
      'Microsoft Sentinel',
      'DLP policies',
      'Audit and compliance configuration',
      'Secure access policies',
      'Incident response preparation'
    ],
    cta: 'Improve security posture',
    to: '/solutions/zero-trust-security'
  },
  {
    title: 'Azure Infrastructure',
    icon: 'cloud',
    outcome: 'Build scalable, secure, and resilient cloud infrastructure.',
    bullets: [
      'Azure VM design',
      'Networking and VPN',
      'Azure backup',
      'Storage design',
      'Monitoring',
      'Cost optimization',
      'Hybrid infrastructure',
      'Secure remote access'
    ],
    cta: 'Plan Azure infrastructure',
    to: '/solutions/microsoft-azure'
  },
  {
    title: 'Backup & Disaster Recovery',
    icon: 'backup',
    outcome: 'Protect business data and reduce downtime.',
    bullets: [
      'Microsoft 365 backup',
      'Veeam Backup for Microsoft 365',
      'Azure Site Recovery',
      'Restore testing',
      'RTO/RPO definition',
      'Disaster recovery runbooks',
      'Executive DR reporting',
      'Business continuity planning'
    ],
    cta: 'Build a recovery plan',
    to: '/solutions/backup-dr-veeam'
  },
  {
    title: 'Managed IT Services',
    icon: 'support',
    outcome: 'Keep IT stable, supported, and aligned with business priorities.',
    bullets: [
      'Helpdesk support',
      'Infrastructure monitoring',
      'Microsoft 365 administration',
      'Vendor coordination',
      'Security maintenance',
      'Backup checks',
      'Monthly reporting',
      'IT roadmap planning'
    ],
    cta: 'Discuss managed IT support',
    to: '/it-support-services'
  }
]

const industries = [
  {
    title: 'Retail & Distribution',
    icon: 'platform',
    text: 'Cloud, ERP infrastructure, store operations, endpoint management, backup, and disaster recovery.'
  },
  {
    title: 'Pharma & Clinical Research',
    icon: 'security',
    text: 'Secure Microsoft 365 environments, compliance-focused collaboration, identity governance, and data protection.'
  },
  {
    title: 'Energy & Solar',
    icon: 'cloud',
    text: 'Microsoft 365 migration, endpoint standardization, document governance, and project collaboration.'
  },
  {
    title: 'Professional Services',
    icon: 'consulting',
    text: 'Cloud productivity, security, backup, and managed IT operations.'
  }
]

const projectExperience = [
  {
    title: 'Microsoft 365 Security & Compliance Deployment',
    icon: 'security',
    text: 'Designed secure Microsoft 365 environments with identity, endpoint, backup, and compliance controls.'
  },
  {
    title: 'Google Workspace to Microsoft 365 Migration',
    icon: 'cloud',
    text: 'Planned and executed structured migration programs with assessment, cleanup, migration, validation, and user adoption.'
  },
  {
    title: 'Backup & Disaster Recovery Architecture',
    icon: 'backup',
    text: 'Designed recovery models for Microsoft 365 and infrastructure workloads with documented restore testing and business continuity planning.'
  }
]

export default function Solutions() {
  return (
    <div>
      <PageHero
        eyebrow="IT Solutions"
        title="Enterprise IT, Cloud & Security Solutions"
        lead="We design, migrate, secure, and support Microsoft 365, Azure, endpoint, backup, and disaster recovery environments — with audit-ready governance and practical delivery experience."
        trustLine="Microsoft 365 • Azure • Security • Backup • Disaster Recovery • Endpoint Management"
        primaryCta={{ href: BOOKING_URL, label: 'Book a Consultation' }}
        secondaryCta={{ to: '#core-solutions', label: 'Core Solutions' }}
      />

      <section className="border-y border-white/[0.12] bg-[#0B1726] py-6 text-[#FFFFFF]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Technology expertise</div>
              <p className="mt-2 max-w-2xl text-base font-semibold leading-relaxed text-[#FFFFFF]">
                Trusted for Microsoft 365, Azure, Security, Backup and IT Governance Projects
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {expertiseBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/[0.12] bg-[#101E31] px-3 py-1.5 text-xs font-semibold text-[#CBD5E1]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GemSection
        eyebrow="Problems we solve"
        title="What we help you solve"
        lead="Buyers do not start with technologies — they start with risk, downtime, cost, unclear ownership, and decisions that need evidence."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {outcomes.map((item, i) => (
            <Card key={item.title} revealDelay={0.04 + i * 0.04} variant={i === 0 ? 'brand' : 'steel'} className="h-full">
              <div className="flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.12] bg-[#0B1726]">
                  <Icon as={icons[item.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#FFFFFF]">{item.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{item.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Core solutions"
        title="Core Solutions"
        lead="Six practical solution areas that connect Microsoft, Azure, endpoint, security, backup and managed support work to business outcomes."
      >
        <div id="core-solutions" className="grid gap-4 lg:grid-cols-2">
          {coreSolutions.map((solution, i) => (
            <ClickCard key={solution.title} to={solution.to} revealDelay={0.04 + i * 0.03} variant="steel" className="h-full" badge="Solution">
              <div className="flex h-full flex-col">
                <div className="flex items-start gap-4">
                  <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl border border-white/[0.12] bg-[#0B1726]">
                    <Icon as={icons[solution.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                  </span>
                  <div>
                    <h2 className="text-xl font-semibold tracking-tight text-[#FFFFFF] md:text-2xl">{solution.title}</h2>
                    <p className="mt-2 text-sm font-semibold leading-relaxed text-[#CBD5E1]">Outcome: {solution.outcome}</p>
                  </div>
                </div>

                <div className="mt-6 grow">
                  <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">Includes</div>
                  <div className="mt-3">
                    <BulletList items={solution.bullets} />
                  </div>
                </div>

                <div className="mt-6 text-sm font-semibold text-[#38BDF8]">
                  {solution.cta} →
                </div>
              </div>
            </ClickCard>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Industry credibility"
        title="Industries We Support"
        lead="Practical IT delivery for business environments where uptime, security, collaboration, and governance matter."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {industries.map((industry, i) => (
            <Card key={industry.title} revealDelay={0.04 + i * 0.04} variant={i === 1 ? 'brand' : 'steel'} className="h-full">
              <div className="flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.12] bg-[#0B1726]">
                  <Icon as={icons[industry.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#FFFFFF]">{industry.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{industry.text}</p>
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection
        eyebrow="Proof of delivery"
        title="Selected Project Experience"
        lead="Representative project patterns that show how strategy, migration, security, and continuity work come together in real environments."
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {projectExperience.map((project, i) => (
            <Card key={project.title} revealDelay={0.04 + i * 0.04} variant={i === 0 ? 'brand' : 'steel'} className="h-full">
              <div className="flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/[0.12] bg-[#0B1726]">
                  <Icon as={icons[project.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#FFFFFF]">{project.title}</div>
                <p className="mt-3 grow text-sm leading-relaxed text-[#CBD5E1]">{project.text}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-center md:justify-start">
          <SheenButton to="/contacts" className="px-7 py-3.5 text-base">Discuss a Similar Project</SheenButton>
        </div>
      </GemSection>

      <ConversionCta
        variant="solutions"
        title="Start with an IT Assessment"
        lead="We can review Microsoft 365, Azure, identity, endpoint, backup and recovery readiness, then define the highest-value next step."
        secondaryLabel="Book a 30-min call"
      />
    </div>
  )
}
