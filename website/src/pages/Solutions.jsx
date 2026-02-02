import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function Solutions() {
  const c = contentEN.solutions

  return (
    <div>
      <Section eyebrow="Solutions" title={c.title} lead={c.intro}>
        <div className="grid gap-4 md:grid-cols-2">
          {c.items.map((s) => (
            <Card key={s.h}>
              <div className="text-sm font-semibold">{s.h}</div>
              <div className="mt-4">
                <BulletList items={s.bullets} />
              </div>
            </Card>
          ))}
        </div>
      </Section>
    </div>
  )
}
