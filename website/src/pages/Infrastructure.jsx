import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { contentEN } from '../content/en.js'

const iconFor = (title) => {
  const t = title.toLowerCase()
  if (t.includes('assessment') || t.includes('database')) return icons.assessment
  if (t.includes('security')) return icons.security
  if (t.includes('communication') || t.includes('vpn')) return icons.infrastructure
  if (t.includes('virtual')) return icons.virtualization
  if (t.includes('back up') || t.includes('backup') || t.includes('disaster')) return icons.backup
  return icons.infrastructure
}

export default function Infrastructure() {
  const c = contentEN.infrastructure
  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={contentEN.shared.tagline}>
        <div className="grid gap-4 md:grid-cols-2">
          {c.sections.map((s, i) => (
            <Card key={s.h} className="md:col-span-1" revealDelay={0.04 + i * 0.04}>
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
