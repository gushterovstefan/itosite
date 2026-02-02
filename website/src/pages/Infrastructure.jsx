import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { contentEN } from '../content/en.js'

export default function Infrastructure() {
  const c = contentEN.infrastructure

  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={c.lead}>
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
              <div className="mt-4 text-sm text-white/70">
                <span className="font-semibold text-white/85">Definition:</span> {card.definition}
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
