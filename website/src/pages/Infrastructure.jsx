import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function Infrastructure() {
  const c = contentEN.infrastructure
  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={contentEN.shared.tagline}>
        <div className="grid gap-4 md:grid-cols-2">
          {c.sections.map((s) => (
            <Card key={s.h} className="md:col-span-1">
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
