import { Link, Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import SheenButton from '../components/SheenButton.jsx'
import TrustBlock from '../components/TrustBlock.jsx'
import { useContent } from '../content/index.jsx'

const process = ['Assess', 'Design', 'Implement', 'Support / Optimize']

const pages = {
  'microsoft-365': {
    headline: 'Microsoft 365 Modern Workplace Services',
    subheadline: 'Secure email, Teams, SharePoint, OneDrive, identity, devices and collaboration with a controlled Microsoft 365 architecture that users can trust.',
    problems: [
      'Microsoft 365 is active, but MFA, sharing, devices and permissions are inconsistent.',
      'Teams, SharePoint and OneDrive grew organically and are hard to govern.',
      'Executives need secure collaboration without slowing the business down.',
      'There is no tested backup and recovery model for Microsoft 365 data.'
    ],
    deliver: [
      ['Tenant architecture', 'Clean structure for identities, groups, access, collaboration and administration.'],
      ['Secure collaboration', 'Teams, SharePoint, OneDrive and external sharing policies aligned to business risk.'],
      ['Endpoint and identity controls', 'Entra ID, Intune, Defender, MFA and Conditional Access implemented as an operating model.'],
      ['Backup readiness', 'Microsoft 365 backup requirements, retention, restore approach and ownership defined.']
    ],
    scope: ['Microsoft 365 setup', 'Exchange Online', 'Teams', 'SharePoint', 'OneDrive', 'Entra ID', 'Intune', 'Defender', 'Conditional Access', 'MFA', 'DLP', 'Purview', 'Secure collaboration', 'Microsoft 365 backup'],
    outcomes: ['Reduced account and data exposure', 'Cleaner collaboration structure', 'Better control over devices and access', 'Faster onboarding and offboarding', 'Recoverable Microsoft 365 data'],
    faqs: [
      ['Can you secure an existing Microsoft 365 tenant?', 'Yes. We assess the current tenant, identify risks, then implement practical security and governance improvements.'],
      ['Do you migrate email and files too?', 'Yes. Migration can be included or planned separately depending on current platforms and risk.'],
      ['Can you configure Conditional Access and MFA?', 'Yes. We design policies around user roles, device state, locations and business impact.'],
      ['Do we need Microsoft 365 backup?', 'For many companies, yes. Native retention is not the same as a dedicated backup and restore strategy.'],
      ['Can you support users after implementation?', 'Yes. We can provide operational support, escalation and ongoing optimization.']
    ],
    related: ['azure-cloud', 'cybersecurity', 'backup-disaster-recovery']
  },
  'azure-cloud': {
    headline: 'Azure Cloud Infrastructure & Migration Services',
    subheadline: 'Design, migrate and operate Azure workloads using secure landing zones, networking, governance, backup, monitoring and cost control from the start.',
    problems: [
      'Azure resources exist without governance, cost ownership or consistent security controls.',
      'Legacy servers need migration without downtime, data loss or unclear rollback paths.',
      'Hybrid infrastructure, VPN and networking decisions are fragmented.',
      'Backup, monitoring and recovery planning are not proven before production use.'
    ],
    deliver: [
      ['Azure foundation', 'Landing zones, subscriptions, identity, networking, governance and baseline security.'],
      ['Migration execution', 'Assessment, dependency mapping, VM migration, validation and rollback planning.'],
      ['Resilience and recovery', 'Azure Backup, Azure Site Recovery, monitoring and recovery documentation.'],
      ['Cost and operations', 'Cost visibility, tagging, monitoring, handover and support model.']
    ],
    scope: ['Azure infrastructure', 'Azure landing zones', 'VM migration', 'VPN and networking', 'Azure Backup', 'Azure Site Recovery', 'Monitoring', 'Governance', 'Cost optimization', 'Hybrid infrastructure'],
    outcomes: ['Secure Azure foundation', 'Lower migration risk', 'Improved uptime and recovery readiness', 'Clear cloud cost visibility', 'Operational handover for day-two support'],
    faqs: [
      ['Can you migrate on-prem servers to Azure?', 'Yes. We assess dependencies, design the target architecture and migrate in controlled phases.'],
      ['Do you support hybrid infrastructure?', 'Yes. We design connectivity, VPN, identity and operational models across on-premises and Azure.'],
      ['How do you control Azure cost?', 'We use tagging, sizing, monitoring, governance and review processes to reduce waste.'],
      ['Can Azure Backup and Site Recovery be included?', 'Yes. Backup and recovery are part of the architecture, not an afterthought.'],
      ['Do you document the environment?', 'Yes. Documentation and handover are included so the environment can be operated safely.']
    ],
    related: ['microsoft-365', 'backup-disaster-recovery', 'managed-it-support']
  },
  cybersecurity: {
    headline: 'Cybersecurity & Zero Trust Services',
    subheadline: 'Protect users, devices, identities, email and data with practical Zero Trust controls built around Microsoft security, governance and incident readiness.',
    problems: [
      'MFA and Conditional Access are incomplete or too broad to manage risk properly.',
      'Devices access company data without compliance, visibility or endpoint protection.',
      'Email, external sharing and privileged access create avoidable exposure.',
      'Security monitoring and incident response processes are unclear.'
    ],
    deliver: [
      ['Identity protection', 'MFA, Conditional Access, privileged access controls and identity governance.'],
      ['Endpoint security', 'Intune compliance, Defender endpoint protection and device control.'],
      ['Data and email protection', 'DLP, secure sharing, email protection and collaboration hardening.'],
      ['Monitoring and response', 'Security monitoring, escalation process, incident response runbooks and reporting.']
    ],
    scope: ['Zero Trust', 'Identity security', 'Endpoint protection', 'Defender', 'Intune', 'Conditional Access', 'DLP', 'Secure email', 'Secure external sharing', 'Security monitoring', 'Incident response'],
    outcomes: ['Reduced account compromise risk', 'Controlled device access', 'Better data protection', 'Clear incident response process', 'Security controls aligned to business operations'],
    faqs: [
      ['Do you implement Zero Trust from scratch?', 'Yes. We start with identity, devices and access policies, then expand into data and monitoring.'],
      ['Can this be done without disrupting users?', 'Yes. We phase policies, test impact and communicate changes before enforcement.'],
      ['Do you work with Microsoft Defender?', 'Yes. Defender, Intune and Entra ID are core parts of the Microsoft security model we implement.'],
      ['Can you review our current security posture?', 'Yes. A security assessment is usually the best starting point.'],
      ['Do you provide incident response?', 'We define the process, escalation path and readiness model, and can support response coordination.']
    ],
    related: ['microsoft-365', 'backup-disaster-recovery', 'managed-it-support']
  },
  'backup-disaster-recovery': {
    headline: 'Backup & Disaster Recovery Services',
    subheadline: 'Build tested backup and recovery strategies for Microsoft 365, servers, Azure workloads and business-critical systems with clear RTO/RPO ownership.',
    problems: [
      'Backups exist, but restore success and recovery time are not regularly tested.',
      'Microsoft 365 data is assumed to be protected without a dedicated restore strategy.',
      'RTO, RPO, immutable backup and DR runbooks are not clearly defined.',
      'Executives lack usable reporting on recovery readiness and business risk.'
    ],
    deliver: [
      ['Backup strategy', 'Workload mapping, retention, immutability, risk and recovery ownership.'],
      ['Platform implementation', 'Microsoft 365 backup, server backup, Azure Backup and Azure Site Recovery where appropriate.'],
      ['Restore testing', 'Controlled restore tests, evidence, gaps and remediation actions.'],
      ['DR runbooks', 'Recovery steps, roles, RTO/RPO targets and executive reporting.']
    ],
    scope: ['Backup strategy', 'Microsoft 365 backup', 'Server backup', 'Azure Backup', 'Azure Site Recovery', 'Immutable backup', 'Restore testing', 'DR runbooks', 'RTO / RPO planning'],
    outcomes: ['Proven restore capability', 'Lower ransomware and outage impact', 'Clear recovery priorities', 'Executive visibility over DR readiness', 'Documented recovery ownership'],
    faqs: [
      ['Is Microsoft 365 data automatically backed up?', 'Microsoft provides platform resilience, but companies often need dedicated backup for restore control and retention requirements.'],
      ['How often should restores be tested?', 'Restore tests should be scheduled regularly and after major environment changes.'],
      ['Can you define RTO and RPO?', 'Yes. We translate business priorities into realistic recovery targets by workload.'],
      ['Do you support immutable backup?', 'Yes. Immutability is an important control for ransomware resilience.'],
      ['Can DR runbooks be included?', 'Yes. Runbooks and executive reporting are part of a mature recovery program.']
    ],
    related: ['azure-cloud', 'cybersecurity', 'managed-it-support']
  },
  'managed-it-support': {
    headline: 'Managed IT Support Services',
    subheadline: 'Use IT Outsource as your external IT department, co-managed support partner, senior escalation team or project-based technical owner.',
    problems: [
      'Internal teams are overloaded with user support, vendors and recurring incidents.',
      'There is no senior escalation path for Microsoft, cloud, endpoint or infrastructure issues.',
      'Support is reactive and lacks SLA, monitoring, documentation and reporting.',
      'Executives need practical IT advisory without hiring every specialist internally.'
    ],
    deliver: [
      ['Support model design', 'Complete, co-managed or project support aligned to business expectations.'],
      ['User and endpoint support', 'Service desk, endpoint administration, monitoring and issue resolution.'],
      ['Senior escalation', '2nd / 3rd level troubleshooting across Microsoft, cloud, security and infrastructure.'],
      ['Governance and advisory', 'Reporting, vendor coordination, executive advisory and continuous improvement.']
    ],
    scope: ['Complete IT support', 'Co-managed IT support', 'Project support', 'Senior escalation', 'SLA-based support', 'Monitoring', 'User support', 'Vendor coordination', 'Executive advisory'],
    outcomes: ['Faster issue resolution', 'Lower operational burden', 'Clear technical ownership', 'Better visibility for management', 'Reliable escalation for critical issues'],
    faqs: [
      ['Can you act as our external IT department?', 'Yes. We can provide complete managed IT support depending on scope and coverage needs.'],
      ['Can you work with our internal IT person?', 'Yes. Co-managed support is often the best model for growing companies.'],
      ['Do you provide senior escalation only?', 'Yes. We can support 2nd/3rd level escalation for Microsoft, cloud, endpoint and infrastructure issues.'],
      ['Is support SLA-based?', 'Support can be structured with agreed response targets, escalation paths and reporting.'],
      ['Can you coordinate vendors?', 'Yes. Vendor coordination can be included to reduce management overhead.']
    ],
    related: ['microsoft-365', 'cybersecurity', 'backup-disaster-recovery']
  },
  'google-workspace-to-microsoft-365': {
    headline: 'Google Workspace to Microsoft 365 Migration Services',
    subheadline: 'Plan and execute Gmail, Calendar, contacts, Drive and Shared Drives migration to Microsoft 365 with permission mapping, cleanup, batches and user adoption support.',
    problems: [
      'Email, calendars, contacts, files and permissions must move without business disruption.',
      'Google Drive and Shared Drives need cleanup before moving to SharePoint and OneDrive.',
      'Users need guidance so adoption does not stall after migration weekend.',
      'Identity, security and access controls must be ready before cutover.'
    ],
    deliver: [
      ['Pre-migration assessment', 'Inventory, readiness, identities, data volume, permissions and risk review.'],
      ['Migration design', 'Target Microsoft 365 structure, SharePoint sites, OneDrive, batches and rollback planning.'],
      ['Controlled migration', 'Gmail to Exchange Online, calendar, contacts, Drive and Shared Drives migration.'],
      ['Adoption and support', 'User communication, validation, post-migration support and cleanup.']
    ],
    scope: ['Google Workspace to Microsoft 365', 'Gmail to Exchange Online', 'Google Drive to SharePoint / OneDrive', 'Shared Drives migration', 'Calendar and contacts migration', 'Permission mapping', 'Pre-migration assessment', 'Cleanup', 'Migration batches', 'User adoption'],
    outcomes: ['Lower migration risk', 'Clean Microsoft 365 structure', 'Reduced data sprawl', 'Better identity and security posture', 'Users ready for Teams, Outlook, SharePoint and OneDrive'],
    faqs: [
      ['Can Gmail be migrated to Exchange Online?', 'Yes. Mailboxes can be migrated in planned batches with validation and cutover support.'],
      ['What happens to Google Drive files?', 'Drive and Shared Drives are assessed, cleaned and mapped to SharePoint or OneDrive.'],
      ['Can calendars and contacts be migrated?', 'Yes. Calendar and contact migration can be included in the migration scope.'],
      ['How do you handle permissions?', 'We map permissions before migration and design the target Microsoft 365 access model.'],
      ['Do you support users after migration?', 'Yes. User adoption and post-migration support are part of the delivery model.']
    ],
    related: ['microsoft-365', 'cybersecurity', 'managed-it-support']
  }
}

const bgTitles = {
  'microsoft-365': 'Microsoft 365 Modern Workplace услуги',
  'azure-cloud': 'Azure Cloud инфраструктура и миграция',
  cybersecurity: 'Cybersecurity и Zero Trust услуги',
  'backup-disaster-recovery': 'Backup и Disaster Recovery услуги',
  'managed-it-support': 'Managed IT Support услуги',
  'google-workspace-to-microsoft-365': 'Google Workspace към Microsoft 365 миграция'
}

function localCopy(page, lang) {
  if (lang !== 'bg') return page
  return {
    ...page,
    headline: bgTitles[page.slug] || page.headline,
    subheadline: page.subheadline,
    finalTitle: 'Готови ли сте за практична ИТ оценка?',
    finalText: 'Ще прегледаме текущата среда, ще посочим рисковете и ще предложим ясен roadmap за подобрение.'
  }
}

function TileList({ items }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <div key={item} className="rounded-2xl border border-black/10 bg-white/70 px-4 py-3 text-sm font-semibold text-ink-950">
          {item}
        </div>
      ))}
    </div>
  )
}

function FAQ({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map(([q, a], index) => (
        <Card key={q} revealDelay={0.04 + index * 0.03} variant="steel">
          <div className="text-base font-semibold text-ink-950">{q}</div>
          <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{a}</p>
        </Card>
      ))}
    </div>
  )
}

export default function ServiceLanding({ slug: propSlug }) {
  const params = useParams()
  const slug = propSlug || params.slug
  const { lang, localizedPath } = useContent()
  const rawPage = pages[slug]

  if (!rawPage) return <Navigate to={localizedPath('/solutions')} replace />
  const page = localCopy({ ...rawPage, slug }, lang)
  const cta = lang === 'bg' ? 'Заявете ИТ оценка' : 'Request IT Assessment'

  return (
    <div>
      <PageHero
        eyebrow={lang === 'bg' ? 'Услуга' : 'Service'}
        title={page.headline}
        lead={page.subheadline}
        primaryCta={{ to: '/contacts', label: cta }}
        secondaryCta={{ href: 'https://outlook.office.com/book/ITOutsourceLTD1@itoutsource.bg/', label: lang === 'bg' ? 'Запазете консултация' : 'Book a Consultation' }}
        aside={{
          eyebrow: lang === 'bg' ? 'Техническа отговорност' : 'Technical ownership',
          title: lang === 'bg' ? 'Assess · Design · Implement · Support' : 'Assess · Design · Implement · Support',
          lead: lang === 'bg' ? 'Практичен delivery model с ясен scope, handover и ongoing ownership.' : 'A practical delivery model with clear scope, handover and ongoing ownership.',
          icon: 'platform',
          items: [
            { k: 'Scope', v: 'Clear' },
            { k: 'Risk', v: 'Reduced' },
            { k: 'Ops', v: 'Owned' }
          ]
        }}
      />

      <GemSection eyebrow={lang === 'bg' ? 'Проблеми' : 'Problems'} title={lang === 'bg' ? 'Какви болки решава услугата' : 'Pain points this service solves'}>
        <div className="grid gap-4 md:grid-cols-2">
          {page.problems.map((problem, index) => (
            <Card key={problem} revealDelay={0.04 + index * 0.04} variant={index % 2 ? 'steel' : 'brand'}>
              <div className="flex gap-3">
                <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-800">{index + 1}</span>
                <p className="text-sm leading-relaxed text-ink-900/74">{problem}</p>
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow={lang === 'bg' ? 'Delivery' : 'What we deliver'} title={lang === 'bg' ? 'Какво доставяме' : 'What we deliver'}>
        <div className="grid gap-4 lg:grid-cols-4">
          {page.deliver.map(([title, body], index) => (
            <Card key={title} revealDelay={0.04 + index * 0.04} variant={index % 2 ? 'steel' : 'brand'}>
              <div className="text-base font-semibold text-ink-950">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow={lang === 'bg' ? 'Технически scope' : 'Technical scope'} title={lang === 'bg' ? 'Технологии и capabilities' : 'Technologies and capabilities'}>
        <TileList items={page.scope} />
      </GemSection>

      <GemSection eyebrow={lang === 'bg' ? 'Резултати' : 'Business outcomes'} title={lang === 'bg' ? 'Какво получава клиентът' : 'Results the client gets'}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {page.outcomes.map((outcome, index) => (
            <Card key={outcome} revealDelay={0.04 + index * 0.04} variant="steel">
              <p className="text-sm font-semibold leading-relaxed text-ink-950">{outcome}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow={lang === 'bg' ? 'Процес' : 'Process'} title="Assess · Design · Implement · Support / Optimize">
        <div className="grid gap-4 md:grid-cols-4">
          {process.map((step, index) => (
            <Card key={step} revealDelay={0.04 + index * 0.04} variant={index === 2 ? 'brand' : 'default'}>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">{String(index + 1).padStart(2, '0')}</div>
              <div className="mt-3 text-lg font-semibold text-ink-950">{step}</div>
              <p className="mt-2 text-sm leading-relaxed text-ink-900/68">
                {index === 0 && 'Review current state, risks, dependencies, users, platforms and business constraints.'}
                {index === 1 && 'Define target architecture, migration or rollout plan, controls and acceptance criteria.'}
                {index === 2 && 'Configure, migrate, validate, document and hand over with minimal disruption.'}
                {index === 3 && 'Monitor, support, optimize, report and improve the service after go-live.'}
              </p>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="FAQ" title={lang === 'bg' ? 'Често задавани въпроси' : 'Frequently asked questions'}>
        <FAQ items={page.faqs} />
      </GemSection>

      <TrustBlock compact />

      <GemSection eyebrow={lang === 'bg' ? 'Свързани услуги' : 'Related services'} title={lang === 'bg' ? 'Продължете към свързани услуги' : 'Continue to related services'}>
        <div className="flex flex-wrap gap-3">
          {page.related.map((related) => (
            <Link key={related} to={localizedPath(`/${related}`)} className="rounded-full border border-black/10 bg-white/80 px-4 py-2 text-sm font-semibold text-ink-950 transition hover:bg-white">
              {pages[related].headline}
            </Link>
          ))}
          <Link to={localizedPath('/contacts')} className="rounded-full border border-black/10 bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900">
            {lang === 'bg' ? 'Контакти' : 'Contact'}
          </Link>
        </div>
      </GemSection>

      <section className="px-4 py-10 md:py-14">
        <div className="mx-auto max-w-6xl overflow-hidden rounded-3xl border border-white/12 bg-navy-950 p-6 text-white shadow-[0_24px_100px_-60px_rgba(8,26,46,0.8)] md:p-10">
          <div className="grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">{page.finalTitle || 'Ready to make this practical?'}</h2>
              <p className="mt-4 max-w-3xl text-sm leading-relaxed text-white/70 md:text-base">
                {page.finalText || 'Start with an IT assessment. We will identify risks, priorities and a practical roadmap for implementation and support.'}
              </p>
            </div>
            <SheenButton to="/contacts" className="w-full md:w-auto">{cta}</SheenButton>
          </div>
        </div>
      </section>
    </div>
  )
}
