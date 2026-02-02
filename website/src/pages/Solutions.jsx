import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { contentEN } from '../content/en.js'

const iconFor = (title) => {
  const t = title.toLowerCase()
  if (t.includes('azure')) return icons.cloud
  if (t.includes('office')) return icons.platform
  if (t.includes('kvm') || t.includes('virtual')) return icons.virtualization
  if (t.includes('easy order')) return icons.tools
  if (t.includes('b2b') || t.includes('b2c') || t.includes('web')) return icons.web
  return icons.tools
}

export default function Solutions() {
  const c = contentEN.solutions

  return (
    <div>
      <Section eyebrow="Solutions" title={c.title} lead={c.intro}>
        <div className="grid gap-4 md:grid-cols-2">
          {c.items.map((s, i) => (
            <Card key={s.h} revealDelay={0.04 + i * 0.04}>
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{s.h}</div>
                <Icon as={iconFor(s.h)} />
              </div>
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
