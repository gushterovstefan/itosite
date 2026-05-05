import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import { useContent } from '../content/index.jsx'

const pageCopy = {
  en: {
    heroTitle: 'Microsoft Cloud, Security & Business Continuity Solutions',
    heroLead:
      'IT Outsource designs, implements, secures, and manages Microsoft 365, Azure, endpoint, backup, and disaster recovery environments for companies that need reliable IT operations and clear technical ownership.',
    cta: 'Request IT Assessment',
    trustPoints: [
      'Microsoft 365 and Azure expertise',
      'Backup and disaster recovery planning',
      'Security-first implementation',
      'Senior technical ownership',
      'Sofia-based business IT partner'
    ],
    problemsTitle: 'What We Help You Solve',
    problems: [
      ['Unstable IT operations', 'Recurring incidents, unclear ownership, slow escalations and too much time lost coordinating vendors.'],
      ['Microsoft 365 security gaps', 'Weak MFA coverage, risky sharing, unmanaged devices, unclear access policies and limited audit visibility.'],
      ['Cloud migration complexity', 'Email, identity, files, workloads and permissions need to move without downtime or data loss.'],
      ['Weak backup and recovery readiness', 'Backups exist, but restore testing, RTO/RPO, immutability and DR ownership are not proven.'],
      ['Lack of internal IT capacity', 'Business leaders need senior technical help without hiring every specialist internally.'],
      ['Poor visibility over devices, users, and access', 'Endpoints, identities, privileges and external access are hard to monitor and control.']
    ],
    coreTitle: 'Core Solutions',
    solutions: [
      {
        title: 'Microsoft 365 Modern Workplace',
        description: 'Secure email, Teams, SharePoint, OneDrive, identity, devices, and collaboration with a controlled Microsoft 365 architecture.',
        icon: 'cloud',
        to: '/solutions/microsoft-365',
        cta: 'Improve Microsoft 365 Security',
        items: ['Exchange Online', 'Teams', 'SharePoint / OneDrive', 'Entra ID', 'Intune', 'Defender', 'Conditional Access', 'MFA', 'DLP / Purview', 'Secure external sharing', 'Microsoft 365 backup']
      },
      {
        title: 'Azure Infrastructure & Migration',
        description: 'Design and migrate Azure workloads using a secure foundation, governance, backup, monitoring, and cost control.',
        icon: 'infrastructure',
        to: '/solutions/microsoft-azure',
        cta: 'Plan Azure Migration',
        items: ['Azure landing zone design', 'VM migration', 'Networking and VPN', 'Azure Backup', 'Azure Site Recovery', 'Monitoring', 'Governance', 'Cost optimization', 'Hybrid infrastructure']
      },
      {
        title: 'Cybersecurity & Zero Trust',
        description: 'Protect users, devices, identities, and data with MFA, Conditional Access, Intune, Defender, DLP, and security monitoring.',
        icon: 'security',
        to: '/solutions/zero-trust-security',
        cta: 'Assess Security Posture',
        items: ['MFA', 'Conditional Access', 'Device compliance', 'Endpoint protection', 'Privileged access control', 'Email protection', 'Data loss prevention', 'Secure sharing', 'Security monitoring', 'Incident response process']
      },
      {
        title: 'Backup & Disaster Recovery',
        description: 'Build tested backup and recovery strategies for Microsoft 365, servers, Azure workloads, databases, and business-critical systems.',
        icon: 'backup',
        to: '/solutions/backup-dr-veeam',
        cta: 'Build DR Plan',
        items: ['Microsoft 365 backup', 'Server backup', 'Azure Backup', 'Azure Site Recovery', 'Immutable backup', 'Restore testing', 'RTO / RPO planning', 'DR runbooks', 'Executive reporting']
      },
      {
        title: 'Managed IT Support',
        description: 'Use IT Outsource as your external IT department, senior escalation team, or project-based technical partner.',
        icon: 'support',
        to: '/it-support-services',
        cta: 'Discuss Support Model',
        items: ['Complete IT support', 'Co-managed IT support', 'Project IT support', '2nd / 3rd level expert support', 'Executive IT advisory']
      },
      {
        title: 'Migration Services',
        description: 'Plan and execute migrations from Google Workspace, legacy infrastructure, hosted environments, and on-premises systems to Microsoft cloud platforms.',
        icon: 'tools',
        to: '/solutions/cloud-migration',
        cta: 'Plan Migration',
        items: ['Google Workspace to Microsoft 365', 'Email migration', 'Calendar and contacts migration', 'Drive and Shared Drives migration', 'SharePoint structure', 'Permission mapping', 'Migration assessment', 'Data cleanup before migration']
      }
    ],
    industriesTitle: 'Solutions for Companies Where IT Downtime Is Not Acceptable',
    industries: [
      ['Retail & Distribution', 'Keep stores, warehouses, endpoints, Microsoft 365 and business systems available across distributed teams.'],
      ['Healthcare / Pharma / CRO', 'Support regulated collaboration, audit-ready operations, secure access and recoverable data environments.'],
      ['Energy / Solar / Engineering', 'Protect field teams, project files, infrastructure access and operational continuity for technical businesses.'],
      ['SMB / Growing Companies', 'Bring enterprise-grade Microsoft cloud, security and support discipline without building a large internal IT department.']
    ],
    finalTitle: 'Not sure where to start?',
    finalText:
      'We can assess your current IT environment and provide a practical improvement roadmap covering security, cloud, backup, support, and cost optimization.'
  },
  bg: {
    heroTitle: 'Microsoft Cloud, Security и Business Continuity решения',
    heroLead:
      'IT Outsource проектира, внедрява, защитава и управлява Microsoft 365, Azure, endpoint, backup и disaster recovery среди за компании, които имат нужда от надеждни ИТ операции и ясна техническа отговорност.',
    cta: 'Заявете ИТ оценка',
    trustPoints: [
      'Microsoft 365 и Azure expertise',
      'Backup и disaster recovery planning',
      'Security-first implementation',
      'Senior technical ownership',
      'Sofia-based business IT partner'
    ],
    problemsTitle: 'Какво помагаме да решите',
    problems: [
      ['Нестабилни ИТ операции', 'Повтарящи се инциденти, неясна отговорност, бавни escalation-и и твърде много vendor coordination.'],
      ['Microsoft 365 security gaps', 'Слабо MFA покритие, risky sharing, unmanaged devices, неясни access policies и ограничена audit visibility.'],
      ['Cloud migration complexity', 'Email, identity, files, workloads и permissions трябва да се преместят без downtime или data loss.'],
      ['Слаба backup и recovery readiness', 'Има backup, но restore testing, RTO/RPO, immutability и DR ownership не са доказани.'],
      ['Недостатъчен вътрешен ИТ капацитет', 'Business leaders имат нужда от senior technical help без да наемат всеки specialist internally.'],
      ['Лоша видимост върху devices, users и access', 'Endpoints, identities, privileges и external access са трудни за monitor и control.']
    ],
    coreTitle: 'Основни решения',
    solutions: [
      {
        title: 'Microsoft 365 Modern Workplace',
        description: 'Secure email, Teams, SharePoint, OneDrive, identity, devices и collaboration с controlled Microsoft 365 architecture.',
        icon: 'cloud',
        to: '/solutions/microsoft-365',
        cta: 'Подобрете Microsoft 365 security',
        items: ['Exchange Online', 'Teams', 'SharePoint / OneDrive', 'Entra ID', 'Intune', 'Defender', 'Conditional Access', 'MFA', 'DLP / Purview', 'Secure external sharing', 'Microsoft 365 backup']
      },
      {
        title: 'Azure Infrastructure & Migration',
        description: 'Design и migration на Azure workloads със secure foundation, governance, backup, monitoring и cost control.',
        icon: 'infrastructure',
        to: '/solutions/microsoft-azure',
        cta: 'Планирайте Azure migration',
        items: ['Azure landing zone design', 'VM migration', 'Networking and VPN', 'Azure Backup', 'Azure Site Recovery', 'Monitoring', 'Governance', 'Cost optimization', 'Hybrid infrastructure']
      },
      {
        title: 'Cybersecurity & Zero Trust',
        description: 'Защита на users, devices, identities и data с MFA, Conditional Access, Intune, Defender, DLP и security monitoring.',
        icon: 'security',
        to: '/solutions/zero-trust-security',
        cta: 'Оценете security posture',
        items: ['MFA', 'Conditional Access', 'Device compliance', 'Endpoint protection', 'Privileged access control', 'Email protection', 'Data loss prevention', 'Secure sharing', 'Security monitoring', 'Incident response process']
      },
      {
        title: 'Backup & Disaster Recovery',
        description: 'Изграждане на tested backup и recovery strategies за Microsoft 365, servers, Azure workloads, databases и business-critical systems.',
        icon: 'backup',
        to: '/solutions/backup-dr-veeam',
        cta: 'Изградете DR plan',
        items: ['Microsoft 365 backup', 'Server backup', 'Azure Backup', 'Azure Site Recovery', 'Immutable backup', 'Restore testing', 'RTO / RPO planning', 'DR runbooks', 'Executive reporting']
      },
      {
        title: 'Managed IT Support',
        description: 'Използвайте IT Outsource като external IT department, senior escalation team или project-based technical partner.',
        icon: 'support',
        to: '/it-support-services',
        cta: 'Обсъдете support model',
        items: ['Complete IT support', 'Co-managed IT support', 'Project IT support', '2nd / 3rd level expert support', 'Executive IT advisory']
      },
      {
        title: 'Migration Services',
        description: 'Планиране и изпълнение на migrations от Google Workspace, legacy infrastructure, hosted environments и on-premises systems към Microsoft cloud platforms.',
        icon: 'tools',
        to: '/solutions/cloud-migration',
        cta: 'Планирайте migration',
        items: ['Google Workspace to Microsoft 365', 'Email migration', 'Calendar and contacts migration', 'Drive and Shared Drives migration', 'SharePoint structure', 'Permission mapping', 'Migration assessment', 'Data cleanup before migration']
      }
    ],
    industriesTitle: 'Решения за компании, при които IT downtime не е приемлив',
    industries: [
      ['Retail & Distribution', 'Поддържайте stores, warehouses, endpoints, Microsoft 365 и business systems available за distributed teams.'],
      ['Healthcare / Pharma / CRO', 'Поддръжка на regulated collaboration, audit-ready operations, secure access и recoverable data environments.'],
      ['Energy / Solar / Engineering', 'Защита на field teams, project files, infrastructure access и operational continuity за technical businesses.'],
      ['SMB / Growing Companies', 'Enterprise-grade Microsoft cloud, security и support discipline без голям internal IT department.']
    ],
    finalTitle: 'Не сте сигурни откъде да започнете?',
    finalText:
      'Можем да оценим текущата ви ИТ среда и да дадем практична roadmap за подобрение, покриваща security, cloud, backup, support и cost optimization.'
  }
}

function TrustStrip({ items }) {
  return (
    <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-white/12 bg-white/8 px-4 py-3 text-sm font-semibold leading-snug text-white/86 backdrop-blur">
          {item}
        </div>
      ))}
    </div>
  )
}

function ProblemCard({ title, body, index }) {
  return (
    <Card revealDelay={0.04 + index * 0.04} variant={index % 2 ? 'steel' : 'brand'}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-base font-semibold text-ink-950">{title}</div>
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-800">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
    </Card>
  )
}

function SolutionCard({ solution, index }) {
  const { localizedPath } = useContent()

  return (
    <Card revealDelay={0.04 + index * 0.04} variant={index % 3 === 1 ? 'steel' : index % 3 === 2 ? 'default' : 'brand'} className="h-full">
      <div className="flex h-full flex-col">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-ink-950">{solution.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{solution.description}</p>
          </div>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/20 bg-navy-950">
            <Icon as={icons[solution.icon] ?? icons.platform} className="h-6 w-6 text-brand-200" />
          </span>
        </div>

        <div className="mt-5 rounded-2xl border border-black/10 bg-white/55 p-4">
          <BulletList items={solution.items} />
        </div>

        <div className="mt-auto pt-5">
          <Link
            to={localizedPath(solution.to)}
            className="inline-flex rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70"
          >
            {solution.cta}
          </Link>
        </div>
      </div>
    </Card>
  )
}

export default function Solutions() {
  const { lang } = useContent()
  const c = pageCopy[lang] || pageCopy.en

  return (
    <div>
      <PageHero
        eyebrow="Solutions"
        title={c.heroTitle}
        lead={c.heroLead}
        primaryCta={{ to: '/contacts', label: c.cta }}
        secondaryCta={{ href: 'https://outlook.office.com/book/ITOutsourceLTD1@itoutsource.bg/', label: 'Book a Consultation' }}
        aside={{
          eyebrow: 'Microsoft-first delivery',
          title: 'Cloud · Security · Backup · Managed IT',
          lead: 'One partner for assessment, architecture, implementation, migration, support and continuous improvement.',
          icon: 'platform',
          items: [
            { k: 'Cloud', v: 'M365 + Azure' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'Continuity', v: 'Backup + DR' }
          ]
        }}
      />

      <section className="bg-navy-950 pb-10 text-white">
        <div className="mx-auto max-w-6xl px-4">
          <TrustStrip items={c.trustPoints} />
        </div>
      </section>

      <GemSection eyebrow="Business problems" title={c.problemsTitle}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {c.problems.map(([title, body], index) => (
            <ProblemCard key={title} title={title} body={body} index={index} />
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Services" title={c.coreTitle}>
        <div className="grid gap-5 lg:grid-cols-2">
          {c.solutions.map((solution, index) => (
            <SolutionCard key={solution.title} solution={solution} index={index} />
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Industries" title={c.industriesTitle}>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {c.industries.map(([title, body], index) => (
            <Card key={title} revealDelay={0.04 + index * 0.04} variant="steel">
              <div className="text-base font-semibold text-ink-950">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/12 bg-navy-950 p-6 text-white shadow-[0_24px_100px_-60px_rgba(8,26,46,0.8)] md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{c.finalTitle}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">{c.finalText}</p>
            </div>
            <SheenButton to="/contacts" className="w-full md:w-auto">
              {c.cta}
            </SheenButton>
          </div>
        </div>
      </section>
    </div>
  )
}
