import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function Consulting() {
  const { content } = useContent()
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
    </div>
  )
}
