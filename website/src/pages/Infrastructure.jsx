import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function Infrastructure() {
  const { content } = useContent()
  const c = content.infrastructure
  const ui = content.shared.ui

  return (
    <div>
      <PageHero
        eyebrow={ui.infrastructure}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: ui.contactUs ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.exploreSolutions ?? ui.solutions }}
        aside={{
          eyebrow: 'Infrastructure',
          title: 'Secure platforms',
          lead: c.punchline,
          icon: 'infrastructure',
          items: [
            { k: 'Cloud', v: 'Hybrid' },
            { k: 'Network', v: 'Resilient' },
            { k: 'Backups', v: 'Verified' }
          ]
        }}
      />

      <GemSection eyebrow={ui.infrastructure} title={c.title} lead={c.punchline}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <Card key={card.title} revealDelay={0.04 + i * 0.04} variant="steel">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{card.title}</div>
                <Icon as={icons[card.icon] ?? icons.infrastructure} />
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
