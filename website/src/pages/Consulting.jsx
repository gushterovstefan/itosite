import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import ServiceOutcomeStrip from '../components/ServiceOutcomeStrip.jsx'
import { useContent } from '../content/index.jsx'

const serviceCopy = {
  en: [
    ['Business problem', 'Decisions without technical evidence', 'Cloud, security, migration and vendor decisions become expensive when architecture, risk, cost and operations are not reviewed before execution.'],
    ['Service provided', 'Architecture and security advisory', 'We provide assessments, technical due diligence, migration roadmaps, security governance and RFP support with decision-ready recommendations.'],
    ['Why trust us', 'Practical implementation context', 'Recommendations are grounded in environments that must actually be migrated, secured, documented, supported and audited.'],
    ['Next step', 'Request IT Assessment', 'Start with a focused assessment of architecture, migration readiness, identity/security controls, backup posture or vendor risk.']
  ],
  bg: [
    ['Бизнес проблем', 'Решения без technical evidence', 'Cloud, security, migration и vendor решения стават скъпи, когато architecture, risk, cost и operations не са оценени преди execution.'],
    ['Услуга', 'Architecture and security advisory', 'Предоставяме assessments, technical due diligence, migration roadmaps, security governance и RFP support с decision-ready препоръки.'],
    ['Защо да ни се доверите', 'Практичен implementation context', 'Препоръките са grounded в среди, които реално трябва да бъдат migrated, secured, documented, supported и audited.'],
    ['Следваща стъпка', 'Заявете ИТ оценка', 'Започнете с focused assessment на architecture, migration readiness, identity/security controls, backup posture или vendor risk.']
  ]
}

export default function Consulting() {
  const { content, lang } = useContent()
  const c = content.consulting
  const ui = content.shared.ui

  return (
    <div>
      <PageHero
        eyebrow={ui.consulting}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: ui.contactUs ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.exploreSolutions ?? ui.solutions }}
        aside={{
          eyebrow: 'Consulting',
          title: 'Plan with confidence',
          lead: 'Architecture, security and governance — aligned to business needs.',
          icon: 'consulting',
          items: [
            { k: 'Roadmaps', v: 'Practical' },
            { k: 'Security', v: 'Built-in' },
            { k: 'Docs', v: 'Included' }
          ]
        }}
      />

      <ServiceOutcomeStrip items={(serviceCopy[lang] || serviceCopy.en).map(([label, title, body]) => ({ label, title, body }))} />

      <GemSection eyebrow={ui.consulting} title={c.title} lead={c.subline}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <Card key={card.title} revealDelay={0.04 + i * 0.04}>
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{card.title}</div>
                <Icon as={icons[card.icon] ?? icons.consulting} />
              </div>
              <div className="mt-4">
                <BulletList items={card.bullets} />
              </div>
            </Card>
          ))}

          <Card revealDelay={0.26} className="lg:col-span-2" variant="amber" badge="Governance">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.governanceTitle}</div>
              <Icon as={icons.governance} />
            </div>
            <div className="mt-4">
              <BulletList items={c.governance} />
            </div>
          </Card>
        </div>
      </GemSection>

      <ConversionCta variant="consulting" />
    </div>
  )
}
