import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import InfoList from '../components/InfoList.jsx'
import { useContent } from '../content/index.jsx'

export default function Support() {
  const { content } = useContent()
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

      <GemSection eyebrow="Support" title={c.serviceModelsTitle} lead={c.credibility}>
        <div className="grid gap-4 lg:grid-cols-3">
          {/* Card 1 */}
          <Card revealDelay={0.04} className="lg:col-span-1" variant="brand" badge="SLA">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{c.serviceModelsTitle}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-200/80">
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
    </div>
  )
}
