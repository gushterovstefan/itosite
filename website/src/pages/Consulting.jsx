import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function Consulting() {
  const c = contentEN.consulting
  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={contentEN.shared.tagline}>
        <Card>
          <BulletList items={c.bullets} />
        </Card>
      </Section>
    </div>
  )
}
