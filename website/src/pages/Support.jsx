import Section from '../components/Section.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import InfoList from '../components/InfoList.jsx'
import { contentEN } from '../content/en.js'

export default function Support() {
  const c = contentEN.support

  return (
    <div>
      <Section eyebrow="Services" title={c.title} lead={c.lead}>
        <p className="-mt-2 max-w-3xl text-sm text-white/70 md:text-base">{c.subline}</p>
        <p className="mt-4 max-w-3xl text-sm text-white/60">{c.credibility}</p>

        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {/* Card 1 */}
          <Card revealDelay={0.04} className="lg:col-span-1">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{c.serviceModelsTitle}</div>
                <div className="mt-1 text-xs uppercase tracking-[0.18em] text-brand-200/80">
                  Commercial backbone
                </div>
              </div>
              <Icon as={icons.sla} />
            </div>
            <InfoList items={c.serviceModels} />
          </Card>

          {/* Card 2 */}
          <Card revealDelay={0.10} className="lg:col-span-1">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.deliveryModelTitle}</div>
              <Icon as={icons.support} />
            </div>
            <InfoList items={c.deliveryModel} />
          </Card>

          {/* Card 3 */}
          <Card revealDelay={0.16} className="lg:col-span-1">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.governanceTitle}</div>
              <Icon as={icons.governance} />
            </div>
            <div className="mt-4">
              <BulletList items={c.governance} />
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
