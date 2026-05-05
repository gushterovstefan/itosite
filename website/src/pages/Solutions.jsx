import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, ClickCard, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'

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

const pageCopy = {
  en: {
    heroTitle: 'Microsoft cloud, cybersecurity, migration and continuity solutions',
    heroLead:
      'A practical solution portfolio for companies that need Microsoft 365 and Azure to be secure, governed, recoverable and supportable in production.',
    heroSubline:
      'We assess the current state, design the target architecture, execute migration or implementation, and operate the environment with clear technical ownership.',
    problemTitle: 'Common business problems we solve',
    problemLead: 'The goal is not to “install tools”. The goal is to reduce business risk and make IT easier to operate.',
    problems: [
      ['Cloud without governance', 'Microsoft 365 or Azure is already in use, but identity, access, cost, security and operations are fragmented.'],
      ['Migration risk', 'Mail, files, identity or workloads need to move without business disruption, data loss or unclear rollback paths.'],
      ['Security exposure', 'MFA, Conditional Access, Defender, endpoint compliance and monitoring need to become an operating model — not a checklist.'],
      ['Unproven recovery', 'Backups exist, but RPO/RTO, immutability, restore tests and DR ownership are not clearly proven.']
    ],
    modelTitle: 'How each solution is delivered',
    modelLead: 'Every engagement is structured around business risk, technical design, deployment quality and day-two operation.',
    model: [
      ['Assess', 'Current state, risk, dependencies, licensing, readiness and business constraints.'],
      ['Design', 'Target architecture, controls, migration path, recovery model and implementation plan.'],
      ['Implement', 'Configuration, migration, validation, documentation and controlled handover.'],
      ['Operate', 'Monitoring, support, security reviews, backup checks and continuous improvement.']
    ],
    catalogTitle: 'Solution catalogue',
    catalogLead:
      'Choose a service area below. Each solution page explains the business problem, service scope, trust factors and next step.',
    trustTitle: 'Why clients can trust this approach',
    trustLead:
      'Enterprise-grade delivery means architecture discipline, implementation evidence, and operations that someone clearly owns.',
    trust: [
      'Microsoft cloud, Entra ID, Intune, Defender, Azure and hybrid infrastructure experience',
      'Security, backup and disaster recovery designed into the operating model',
      'Documentation, runbooks, acceptance criteria and handover built into delivery',
      'SLA-aware support mindset for production environments'
    ],
    open: 'Open solution',
    details: 'Details'
  },
  bg: {
    heroTitle: 'Microsoft cloud, киберсигурност, миграция и continuity решения',
    heroLead:
      'Практично портфолио от решения за компании, които искат Microsoft 365 и Azure да бъдат сигурни, управлявани, възстановими и поддържани в продукция.',
    heroSubline:
      'Оценяваме текущото състояние, проектираме target architecture, изпълняваме миграция/внедряване и управляваме средата с ясна техническа отговорност.',
    problemTitle: 'Бизнес проблеми, които решаваме',
    problemLead: 'Целта не е “инсталиране на инструменти”. Целта е по-нисък бизнес риск и по-лесна оперативна поддръжка.',
    problems: [
      ['Cloud без governance', 'Microsoft 365 или Azure вече се използват, но identity, access, cost, security и operations са фрагментирани.'],
      ['Риск при миграция', 'Поща, файлове, identity или workloads трябва да се преместят без прекъсване, data loss или неясен rollback.'],
      ['Security exposure', 'MFA, Conditional Access, Defender, endpoint compliance и monitoring трябва да станат operating model — не checklist.'],
      ['Недоказано възстановяване', 'Има backup, но RPO/RTO, immutability, restore tests и DR ownership не са ясно доказани.']
    ],
    modelTitle: 'Как доставяме всяко решение',
    modelLead: 'Всеки engagement е структуриран около business risk, technical design, deployment quality и day-two operation.',
    model: [
      ['Оценка', 'Current state, risk, dependencies, licensing, readiness и business constraints.'],
      ['Дизайн', 'Target architecture, controls, migration path, recovery model и implementation plan.'],
      ['Внедряване', 'Configuration, migration, validation, documentation и controlled handover.'],
      ['Операция', 'Monitoring, support, security reviews, backup checks и continuous improvement.']
    ],
    catalogTitle: 'Каталог решения',
    catalogLead:
      'Изберете service area. Всяка страница обяснява бизнес проблема, scope, trust factors и следваща стъпка.',
    trustTitle: 'Защо подходът е надежден',
    trustLead:
      'Enterprise-grade delivery означава архитектурна дисциплина, evidence от внедряване и операции с ясна отговорност.',
    trust: [
      'Опит с Microsoft cloud, Entra ID, Intune, Defender, Azure и hybrid infrastructure',
      'Security, backup и disaster recovery, заложени в operating model',
      'Documentation, runbooks, acceptance criteria и handover като част от delivery',
      'SLA-aware support mindset за production environments'
    ],
    open: 'Отвори решението',
    details: 'Детайли'
  }
}

function ProblemCard({ title, body, index }) {
  return (
    <Card revealDelay={0.04 + index * 0.04} variant={index % 2 ? 'steel' : 'brand'}>
      <div className="flex items-start justify-between gap-4">
        <div className="text-sm font-semibold text-ink-950">{title}</div>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand-100 text-xs font-bold text-brand-800">
          {String(index + 1).padStart(2, '0')}
        </span>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
    </Card>
  )
}

export default function Solutions() {
  const { content, lang } = useContent()
  const c = content.solutions
  const p = pageCopy[lang] || pageCopy.en

  return (
    <div>
      <PageHero
        eyebrow={content.shared.ui.solutions}
        title={p.heroTitle}
        lead={p.heroLead}
        subline={p.heroSubline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote }}
        secondaryCta={{ to: '/how-we-deliver', label: lang === 'bg' ? 'Как работим' : 'How we deliver' }}
        aside={{
          eyebrow: 'Solution portfolio',
          title: 'Cloud · Security · Migration · Backup · Managed IT',
          lead: 'Microsoft-first services with clear design, migration, security and support ownership.',
          icon: 'platform',
          items: [
            { k: 'Cloud', v: 'M365 + Azure' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'Recovery', v: 'Backup + DR' }
          ]
        }}
      />

      <GemSection eyebrow="Business risk" title={p.problemTitle} lead={p.problemLead}>
        <div className="grid gap-4 lg:grid-cols-4">
          {p.problems.map(([title, body], index) => (
            <ProblemCard key={title} title={title} body={body} index={index} />
          ))}
        </div>
      </GemSection>

      <section className="py-8 md:py-10">
        <div className="mx-auto max-w-6xl px-4">
          <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-[0_24px_100px_-70px_rgba(8,26,46,0.55)]">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              <div className="bg-navy-950 p-6 text-white md:p-8">
                <div className="text-xs font-semibold uppercase tracking-[0.28em] text-brand-200">Delivery model</div>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight md:text-4xl">{p.modelTitle}</h2>
                <p className="mt-3 text-sm leading-relaxed text-white/68 md:text-base">{p.modelLead}</p>
              </div>
              <div className="grid gap-px bg-slate-200 sm:grid-cols-2">
                {p.model.map(([title, body], index) => (
                  <div key={title} className="bg-white p-6">
                    <div className="text-xs font-semibold uppercase tracking-[0.22em] text-brand-700">
                      {String(index + 1).padStart(2, '0')}
                    </div>
                    <div className="mt-3 text-lg font-semibold text-ink-950">{title}</div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-900/68">{body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <GemSection eyebrow={content.shared.ui.solutions} title={p.catalogTitle} lead={p.catalogLead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => {
            const to = solutionLinks[card.title]
            const Shell = to ? ClickCard : Card
            const props = to ? { to, badge: p.details } : {}

            return (
              <Shell key={card.title} revealDelay={0.04 + i * 0.04} variant={i % 3 === 0 ? 'brand' : i % 3 === 1 ? 'steel' : 'default'} {...props}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold text-ink-950">{card.title}</div>
                    <div className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
                      Business outcome focused
                    </div>
                  </div>
                  <Icon as={icons[card.icon] ?? icons.platform} />
                </div>
                <div className="mt-4">
                  <BulletList items={card.bullets} />
                </div>
                {to ? (
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-800">
                    {p.open}
                  </div>
                ) : null}
              </Shell>
            )
          })}
        </div>
      </GemSection>

      <GemSection eyebrow="Trust" title={p.trustTitle} lead={p.trustLead}>
        <div className="grid gap-4 md:grid-cols-2">
          {p.trust.map((item, index) => (
            <Card key={item} revealDelay={0.04 + index * 0.04} variant="steel">
              <div className="flex gap-3">
                <span className="mt-1 h-2.5 w-2.5 flex-none rounded-full bg-brand-400" />
                <p className="text-sm leading-relaxed text-ink-900/75">{item}</p>
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta variant="solutions" />
    </div>
  )
}
