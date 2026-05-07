import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, ClickCard } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const solutionLinks = {
  'Microsoft Azure': '/solutions/microsoft-azure',
  'Microsoft 365': '/solutions/microsoft-365',
  'VMware & Proxmox Virtualization': '/solutions/vmware-proxmox-virtualization',
  'VMware и Proxmox виртуализация': '/solutions/vmware-proxmox-virtualization',
  'Azure Hybrid Cloud Integration': '/solutions/azure-hybrid-cloud',
  'Azure хибридна интеграция': '/solutions/azure-hybrid-cloud',
  'Zero Trust Security with Defender & Sentinel': '/solutions/zero-trust-security',
  'Zero Trust сигурност с Defender и Sentinel': '/solutions/zero-trust-security',
  'Entra ID & SSO Consolidation': '/solutions/entra-id-sso',
  'Entra ID и SSO консолидация': '/solutions/entra-id-sso',
  'Backup & DR with Veeam': '/solutions/backup-dr-veeam',
  'Backup и DR с Veeam': '/solutions/backup-dr-veeam',
  'Cloud Migration Services': '/solutions/cloud-migration',
  'Cloud migration услуги': '/solutions/cloud-migration',
  'Web-Based B2B & B2C Solutions': '/solutions/web-b2b-b2c',
  'Уеб B2B и B2C решения': '/solutions/web-b2b-b2c',
  'Easy Order Web Platform': '/solutions/easy-order-platform',
  'Easy Order платформа': '/solutions/easy-order-platform',
  'GxP & Clinical Research IT': '/solutions/gxp-clinical-research-it',
  'GxP и Clinical Research IT': '/solutions/gxp-clinical-research-it'
}

const outcomes = [
  {
    title: 'Reduce IT Risk',
    icon: 'security',
    text: 'Security, identity, endpoint protection, backup, and recovery designed to reduce operational and compliance exposure.'
  },
  {
    title: 'Modernize Infrastructure',
    icon: 'infrastructure',
    text: 'Move from legacy servers and fragmented tools to scalable Microsoft 365 and Azure-based platforms.'
  },
  {
    title: 'Improve Productivity',
    icon: 'tools',
    text: 'Help teams work faster with better collaboration, document management, automation, and AI readiness.'
  },
  {
    title: 'Protect Business Continuity',
    icon: 'backup',
    text: 'Design backup, disaster recovery, monitoring, and incident response processes before downtime becomes a board-level issue.'
  }
]

const expertiseBadges = ['Microsoft 365', 'Azure', 'Intune', 'Defender', 'Veeam', 'SharePoint', 'Entra ID', 'Sentinel']

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

const solutionDescriptions = {
  'Microsoft Azure': 'Build scalable, secure cloud foundations with governance, networking, monitoring, cost control, and operational runbooks from day one.',
  'Microsoft 365': 'Modernize collaboration, email, documents, device access, and identity so teams can work securely from anywhere.',
  'VMware & Proxmox Virtualization': 'Stabilize and optimize virtualization platforms while planning practical migration, resilience, and ownership models.',
  'Azure Hybrid Cloud Integration': 'Connect on-premises infrastructure with Azure services for better resilience, management, and staged modernization.',
  'Zero Trust Security with Defender & Sentinel': 'Reduce exposure with identity-first access, threat protection, monitoring, and incident response workflows.',
  'Entra ID & SSO Consolidation': 'Simplify access, reduce password risk, and improve user experience with consolidated identity and single sign-on.',
  'Backup & DR with Veeam': 'Protect critical systems with tested recovery plans, immutable backups, and disaster recovery processes that match business risk.',
  'Cloud Migration Services': 'Move workloads and users with less disruption through discovery, planning, migration, validation, and post-go-live support.',
  'Web-Based B2B & B2C Solutions': 'Create secure business platforms that improve customer experience, internal workflows, and digital service delivery.',
  'Easy Order Web Platform': 'Digitize ordering flows with practical web tooling that reduces manual work and improves process visibility.',
  'GxP & Clinical Research IT': 'Support regulated environments with governance-aware infrastructure, documentation, continuity, and operational controls.'
}

function solutionDescriptionFor(card) {
  return solutionDescriptions[card.title] ?? 'Plan, implement, secure, and support this solution with a practical delivery model focused on measurable business outcomes.'
}

export default function Solutions() {
  const { content } = useContent()
  const c = content.solutions

  return (
    <div>
      <PageHero
        eyebrow="IT Solutions"
        title="Enterprise IT, Cloud & Security Solutions for Growing Businesses"
        lead="We design, migrate, secure, and support Microsoft 365, Azure, endpoint, backup, and disaster recovery environments — with enterprise-grade governance and practical delivery experience."
        trustLine="Microsoft 365 • Azure • Security • Backup • Disaster Recovery • Endpoint Management"
        primaryCta={{ href: BOOKING_URL, label: 'Book a Consultation' }}
        secondaryCta={{ to: '/solutions', label: 'View Solutions' }}
      />

      <section className="border-y border-white/[0.08] bg-[#0B1728] py-6 text-[#F8FAFC]">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">Technology expertise</div>
              <p className="mt-2 max-w-2xl text-base font-semibold leading-relaxed text-[#F8FAFC]">
                Trusted for Microsoft 365, Azure, Security, Backup and IT Governance Projects
              </p>
            </div>
            <div className="flex flex-wrap gap-2 lg:max-w-xl lg:justify-end">
              {expertiseBadges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-[#101E33] px-3 py-1.5 text-xs font-semibold text-[#CBD5E1]">
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <GemSection
        eyebrow="Business outcomes"
        title="What We Help You Solve"
        lead="Technology decisions only matter when they reduce risk, improve continuity, and help the business move faster."
      >
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item, i) => (
            <Card key={item.title} revealDelay={0.04 + i * 0.04} variant={i === 0 ? 'brand' : 'steel'} className="h-full">
              <div className="flex h-full flex-col">
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#0B1728]">
                  <Icon as={icons[item.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#F8FAFC]">{item.title}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{item.text}</p>
              </div>
            </Card>
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
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#0B1728]">
                  <Icon as={icons[industry.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#F8FAFC]">{industry.title}</div>
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
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-white/10 bg-[#0B1728]">
                  <Icon as={icons[project.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                </span>
                <div className="mt-5 text-lg font-semibold tracking-tight text-[#F8FAFC]">{project.title}</div>
                <p className="mt-3 grow text-sm leading-relaxed text-[#CBD5E1]">{project.text}</p>
              </div>
            </Card>
          ))}
        </div>
        <div className="mt-6 flex justify-center md:justify-start">
          <SheenButton to="/contacts" className="px-7 py-3.5 text-base">Discuss a Similar Project</SheenButton>
        </div>
      </GemSection>

      <GemSection eyebrow={content.shared.ui.solutions} title={c.title} lead={c.lead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => {
            const to = solutionLinks[card.title]
            const Shell = to ? ClickCard : Card
            const props = to
              ? { to, badge: 'Solution' }
              : {}

            return (
              <Shell key={card.title} revealDelay={0.04 + i * 0.04} variant="steel" className="h-full" {...props}>
                <div className="flex h-full flex-col">
                  <div className="flex items-start gap-4">
                    <span className="grid h-11 w-11 flex-none place-items-center rounded-2xl border border-white/10 bg-[#0B1728]">
                      <Icon as={icons[card.icon] ?? icons.platform} className="h-6 w-6 text-[#38BDF8]" />
                    </span>
                    <div>
                      <div className="text-lg font-semibold tracking-tight text-[#F8FAFC]">{card.title}</div>
                      <p className="mt-2 text-sm leading-relaxed text-[#CBD5E1]">{solutionDescriptionFor(card)}</p>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">Key capabilities</div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {card.bullets.slice(0, 4).map((capability) => (
                        <span key={capability} className="rounded-full border border-white/10 bg-[#0B1728] px-3 py-1 text-xs font-medium text-[#CBD5E1]">
                          {capability}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 text-sm font-semibold text-[#38BDF8]">
                    {to ? 'Learn more →' : 'Learn more'}
                  </div>
                </div>
              </Shell>
            )
          })}
        </div>
      </GemSection>

      <ConversionCta variant="solutions" />
    </div>
  )
}
