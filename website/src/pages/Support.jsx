import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function Support() {
  const c = contentEN.support

  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={c.lead}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">Support tiers</div>
            <div className="mt-4">
              <BulletList items={c.tiers} />
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold">How it works</div>
            <div className="mt-4">
              <BulletList items={c.process} />
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
