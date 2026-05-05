import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import InfoList from '../components/InfoList.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import ServiceOutcomeStrip from '../components/ServiceOutcomeStrip.jsx'
import { useContent } from '../content/index.jsx'

const serviceCopy = {
  en: [
    ['Business problem', 'Support without ownership', 'Incidents repeat, endpoint state is unclear, vendors point at each other, and internal teams lose time coordinating IT instead of running the business.'],
    ['Service provided', 'Managed IT operations', 'We provide SLA-driven service desk, endpoint management, monitoring, escalation and operational governance across Microsoft-centric environments.'],
    ['Why trust us', 'Production support mindset', 'The model is built around clear tiers, documentation, monthly reporting, escalation paths and continuity for business-critical users.'],
    ['Next step', 'Request IT Assessment', 'Start with an assessment of support coverage, endpoint posture, recurring incidents, tooling and escalation risks.']
  ],
  bg: [
    ['Бизнес проблем', 'Поддръжка без ownership', 'Инцидентите се повтарят, endpoint състоянието е неясно, vendor-и си прехвърлят отговорността и вътрешните екипи губят време.'],
    ['Услуга', 'Managed IT операции', 'Предоставяме SLA service desk, endpoint management, monitoring, escalation и governance за Microsoft-centric среди.'],
    ['Защо да ни се доверите', 'Production support mindset', 'Моделът включва ясни tiers, documentation, reporting, escalation paths и continuity за критични потребители.'],
    ['Следваща стъпка', 'Заявете ИТ оценка', 'Започнете с оценка на support coverage, endpoint posture, recurring incidents, tooling и escalation risks.']
  ]
}

export default function Support() {
  const { content, lang } = useContent()
  const c = content.support
  const ui = content.shared.ui

  return (
    <div>
      <PageHero
        eyebrow={ui.support}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: ui.contactUs ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.exploreSolutions ?? ui.solutions }}
        aside={{
          eyebrow: 'Managed support',
          title: 'SLA-driven operations',
          lead: c.credibility,
          icon: 'sla',
          items: [
            { k: 'Coverage', v: '24/7' },
            { k: 'Escalation', v: 'Clear tiers' },
            { k: 'Reporting', v: 'Monthly' }
          ]
        }}
      />

      <ServiceOutcomeStrip items={(serviceCopy[lang] || serviceCopy.en).map(([label, title, body]) => ({ label, title, body }))} />

      <GemSection eyebrow="Support" title={c.serviceModelsTitle} lead={c.credibility}>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Card 1 */}
          <Card revealDelay={0.04} className="lg:col-span-1" variant="brand" badge="SLA">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{c.serviceModelsTitle}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-800">
                  Commercial backbone
                </div>
              </div>
              <Icon as={icons.sla} />
            </div>
            <InfoList items={c.serviceModels} />
          </Card>

          {/* Card 2 */}
          <Card revealDelay={0.10} className="lg:col-span-1" variant="steel" badge="Operations">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.deliveryModelTitle}</div>
              <Icon as={icons.support} />
            </div>
            <InfoList items={c.deliveryModel} />
          </Card>

          {/* Card 3 */}
          <Card revealDelay={0.16} className="lg:col-span-1" variant="amber" badge="Governance">
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

      <ConversionCta variant="support" />
    </div>
  )
}
