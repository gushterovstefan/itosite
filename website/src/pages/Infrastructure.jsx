import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function Infrastructure() {
  const { content } = useContent()
  const c = content.infrastructure
  const ui = content.shared.ui

  return (
    <div>
      <Section eyebrow={ui.infrastructure} title={c.title} lead={c.lead}>
        <p className="-mt-2 max-w-3xl text-sm text-white/70 md:text-base">{c.subline}</p>
        <p className="mt-4 max-w-3xl text-sm text-white/60">{c.punchline}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <Card key={card.title} revealDelay={0.04 + i * 0.04}>
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
      </Section>
    </div>
  )
}
