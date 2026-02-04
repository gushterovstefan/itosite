import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function Solutions() {
  const { content } = useContent()
  const c = content.solutions

  return (
    <div>
      <PageHero
        eyebrow={content.shared.ui.solutions}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.contactUs ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/it-support-services', label: content.shared.ui.support }}
        aside={{
          eyebrow: 'Solutions',
          title: 'Modern IT building blocks',
          lead: 'Implement, integrate and support solutions that match your requirements.',
          icon: 'platform',
          items: [
            { k: 'Delivery', v: 'End-to-end' },
            { k: 'Security', v: 'By design' },
            { k: 'Support', v: 'SLA-ready' }
          ]
        }}
      />

      <GemSection eyebrow={content.shared.ui.solutions} title={c.title} lead={c.lead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <Card key={card.title} revealDelay={0.04 + i * 0.04} variant="violet">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{card.title}</div>
                <Icon as={icons[card.icon] ?? icons.platform} />
              </div>
              <div className="mt-4">
                <BulletList items={card.bullets} />
              </div>
            </Card>
          ))}
        </div>
      </GemSection>
    </div>
  )
}
