import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { contentEN } from '../content/en.js'

export default function Support() {
  const c = contentEN.support

  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={c.lead}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">Support tiers</div>
              <Icon as={icons.sla} />
            </div>
            <div className="mt-4">
              <BulletList items={c.tiers} />
            </div>
          </Card>

          <Card revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">How it works</div>
              <Icon as={icons.support} />
            </div>
            <div className="mt-4">
              <BulletList items={c.process} />
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
