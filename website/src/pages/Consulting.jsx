import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { contentEN } from '../content/en.js'

export default function Consulting() {
  const c = contentEN.consulting
  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={contentEN.shared.tagline}>
        <Card>
          <div className="flex items-start justify-between gap-4">
            <div className="text-sm font-semibold">Key consulting areas</div>
            <Icon as={icons.consulting} />
          </div>
          <div className="mt-4">
            <BulletList items={c.bullets} />
          </div>
        </Card>
      </Section>
    </div>
  )
}
