import Section from '../components/Section.jsx'
import { Card } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function About() {
  const c = contentEN.about

  return (
    <div>
      <Section eyebrow="About" title="About" lead={contentEN.shared.tagline}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card>
            <div className="text-sm font-semibold">{c.missionTitle}</div>
            <div className="mt-2 text-sm text-white/70">{c.missionLead}</div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {c.missionBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>

          <Card>
            <div className="text-sm font-semibold">{c.visionTitle}</div>
            <div className="mt-4 space-y-2 text-sm text-white/70">
              {c.visionBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="mt-6 text-sm font-semibold">{c.purposeTitle}</div>
            <div className="mt-2 space-y-2 text-sm text-white/70">
              {c.purposeBody.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </Card>
        </div>

        <div className="mt-4">
          <Card>
            <div className="text-sm font-semibold">{c.testimonialsTitle}</div>
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
