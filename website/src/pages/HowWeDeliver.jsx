import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    eyebrow: 'How we deliver',
    title: 'A controlled delivery model with clear gates, owners and handover.',
    lead: 'We make complex IT change easier to approve, execute and operate by turning it into phased work with visible deliverables.',
    subline: 'Discover → Design → Migrate / Build → Operate → Improve',
    phases: [
      {
        name: 'Discover',
        duration: '1–2 weeks typical',
        inputs: ['Business goals', 'Current environment', 'Risks and constraints'],
        deliverables: ['Current-state map', 'Risk register', 'Initial scope and assumptions'],
        gate: 'Go / no-go on scope and priority'
      },
      {
        name: 'Design',
        duration: '1–3 weeks typical',
        inputs: ['Approved scope', 'Security requirements', 'Operational needs'],
        deliverables: ['Target architecture', 'Implementation plan', 'Rollback and support model'],
        gate: 'Architecture and delivery sign-off'
      },
      {
        name: 'Migrate / Build',
        duration: 'Project-dependent',
        inputs: ['Signed design', 'Access and dependencies', 'Change windows'],
        deliverables: ['Configured services', 'Migration/build evidence', 'Issue and decision log'],
        gate: 'Acceptance against agreed criteria'
      },
      {
        name: 'Operate',
        duration: 'Ongoing or transition',
        inputs: ['Accepted environment', 'Support priorities', 'SLA expectations'],
        deliverables: ['Runbooks', 'Monitoring and reporting', 'Escalation model'],
        gate: 'Operational handover and ownership'
      },
      {
        name: 'Improve',
        duration: 'Recurring',
        inputs: ['Operational data', 'Incidents and trends', 'Business changes'],
        deliverables: ['Improvement backlog', 'Cost, security and recovery tuning', 'Roadmap recommendations'],
        gate: 'Quarterly risk and improvement decisions'
      }
    ],
    principles: [
      'No undocumented production change',
      'Security and supportability designed from the start',
      'Clear owner for every decision and handover item',
      'Evidence-based reporting, not status theatre',
      'Practical governance that helps delivery rather than slowing it down'
    ]
  },
  bg: {
    eyebrow: 'Как работим',
    title: 'Контролиран delivery model с ясни gates, owners и handover.',
    lead: 'Правим сложната ИТ промяна по-лесна за одобрение, изпълнение и поддръжка чрез фази с видими deliverables.',
    subline: 'Discover → Design → Migrate / Build → Operate → Improve',
    phases: [
      {
        name: 'Discover',
        duration: 'типично 1–2 седмици',
        inputs: ['Бизнес цели', 'Текуща среда', 'Рискове и ограничения'],
        deliverables: ['Current-state map', 'Risk register', 'Начален scope и assumptions'],
        gate: 'Go / no-go за scope и приоритет'
      },
      {
        name: 'Design',
        duration: 'типично 1–3 седмици',
        inputs: ['Одобрен scope', 'Security изисквания', 'Operational нужди'],
        deliverables: ['Target architecture', 'Implementation plan', 'Rollback и support model'],
        gate: 'Architecture и delivery sign-off'
      },
      {
        name: 'Migrate / Build',
        duration: 'според проекта',
        inputs: ['Подписан design', 'Достъпи и dependencies', 'Change windows'],
        deliverables: ['Конфигурирани услуги', 'Migration/build evidence', 'Issue и decision log'],
        gate: 'Acceptance по договорени критерии'
      },
      {
        name: 'Operate',
        duration: 'ongoing или transition',
        inputs: ['Приета среда', 'Support приоритети', 'SLA очаквания'],
        deliverables: ['Runbooks', 'Monitoring и reporting', 'Escalation model'],
        gate: 'Operational handover и ownership'
      },
      {
        name: 'Improve',
        duration: 'регулярно',
        inputs: ['Operational data', 'Incidents и trends', 'Бизнес промени'],
        deliverables: ['Improvement backlog', 'Cost, security and recovery tuning', 'Roadmap препоръки'],
        gate: 'Quarterly risk and improvement decisions'
      }
    ],
    principles: [
      'Без недокументирана production промяна',
      'Security и supportability още от дизайна',
      'Ясен owner за всяко решение и handover item',
      'Evidence-based reporting, не status theatre',
      'Практичен governance, който помага на delivery'
    ]
  }
}

export default function HowWeDeliver() {
  const { lang, content } = useContent()
  const l = copy[lang] || copy.en

  return (
    <div>
      <PageHero
        eyebrow={l.eyebrow}
        title={l.title}
        lead={l.lead}
        subline={l.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/solutions', label: content.shared.ui.solutions }}
        aside={{
          eyebrow: 'Delivery model',
          title: '5 phases',
          lead: l.subline,
          icon: 'governance',
          items: [
            { k: 'Gates', v: 'Sign-off' },
            { k: 'Output', v: 'Runbooks' },
            { k: 'Model', v: 'Operate-ready' }
          ]
        }}
      />

      <GemSection eyebrow={l.eyebrow} title={l.subline} lead={l.lead}>
        <div className="grid gap-4">
          {l.phases.map((phase, i) => (
            <Card key={phase.name} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'}>
              <div className="grid gap-5 lg:grid-cols-[0.35fr_0.65fr] lg:items-start">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Phase 0{i + 1}</div>
                  <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#FFFFFF]">{phase.name}</h2>
                  <p className="mt-2 text-sm text-[#94A3B8]">{phase.duration}</p>
                  <div className="mt-4 rounded-2xl border border-white/[0.12] bg-[#101E31] p-3 text-sm font-semibold text-[#FFFFFF]">
                    Gate: {phase.gate}
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <div className="text-sm font-semibold text-[#FFFFFF]">Inputs</div>
                    <div className="mt-3"><BulletList items={phase.inputs} /></div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-[#FFFFFF]">Deliverables</div>
                    <div className="mt-3"><BulletList items={phase.deliverables} /></div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Operating principles" title="Delivery discipline that reduces risk." lead={l.lead}>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {l.principles.map((item, i) => (
            <Card key={item} revealDelay={0.04 + i * 0.04} variant="steel">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold leading-relaxed text-[#FFFFFF]">{item}</p>
                <Icon as={icons.governance ?? icons.platform} />
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}
