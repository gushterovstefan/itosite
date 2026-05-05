import GemSection from './GemSection.jsx'
import { Card } from './Cards.jsx'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    eyebrow: 'Trust signals',
    title: 'A Sofia-based IT partner for business-critical environments',
    items: [
      'Founded in 2009',
      'Based in Sofia, Bulgaria',
      'Microsoft 365 and Azure experience',
      'Senior technical ownership',
      'Business-critical IT support',
      'Cloud, security, backup, DR, and migration expertise'
    ]
  },
  bg: {
    eyebrow: 'Доверие',
    title: 'Sofia-based IT partner за business-critical среди',
    items: [
      'Основана през 2009',
      'Базирана в София, България',
      'Microsoft 365 и Azure experience',
      'Senior technical ownership',
      'Business-critical IT support',
      'Cloud, security, backup, DR и migration expertise'
    ]
  }
}

export default function TrustBlock({ compact = false }) {
  const { lang } = useContent()
  const c = copy[lang] || copy.en

  return (
    <GemSection eyebrow={c.eyebrow} title={compact ? null : c.title}>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {c.items.map((item, index) => (
          <Card key={item} revealDelay={0.03 + index * 0.03} variant={index % 2 ? 'steel' : 'brand'}>
            <div className="flex gap-3">
              <span className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full bg-brand-400" />
              <p className="text-sm font-semibold leading-relaxed text-ink-950">{item}</p>
            </div>
          </Card>
        ))}
      </div>
    </GemSection>
  )
}
