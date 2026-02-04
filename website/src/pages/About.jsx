import Section from '../components/Section.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function About() {
  const { content } = useContent()
  const c = content.about

  return (
    <div>
      <Section eyebrow={content.shared.ui.about} title={content.shared.ui.about} lead={content.shared.tagline}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card revealDelay={0.04} variant="steel" badge="Mission">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.missionTitle}</div>
              <Icon as={icons.mission} />
            </div>
            <div className="mt-3 text-sm text-white/70">{c.missionLead}</div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {c.missionBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>

          <Card revealDelay={0.10} variant="violet" badge="Vision">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.visionTitle}</div>
              <Icon as={icons.vision} />
            </div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {c.visionBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.purposeTitle}</div>
              <Icon as={icons.mission} className="opacity-60" />
            </div>
            <div className="mt-2 space-y-2 text-sm text-white/70">
              {c.purposeBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-4">
          <Card revealDelay={0.16} variant="brand" badge="Values">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{c.testimonialsTitle}</div>
              <Icon as={icons.testimonial} />
            </div>
            <div className="mt-4 space-y-4 text-sm text-white/70">
              {c.testimonials.map((t) => (
                <p key={t}>{t}</p>
              ))}
            </div>
          </Card>
        </div>
      </Section>
    </div>
  )
}
