import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    eyebrow: 'Case studies',
    title: 'Business outcomes from Microsoft cloud, security and infrastructure work',
    lead: 'A focused reference area for transformation stories, delivery patterns and measurable operational improvements.',
    subline: 'Detailed client stories can be added as approved references become available. For now, this page keeps the navigation complete without overstating confidential work.',
    cards: [
      ['Migration readiness', 'Discovery, tenant assessment, identity cleanup and migration planning before Microsoft 365 or Azure change.'],
      ['Security uplift', 'Conditional Access, endpoint protection, Defender posture, backup validation and incident-response readiness.'],
      ['Operational ownership', 'Managed support, documentation, escalation paths and reporting that reduce repeated IT friction.']
    ]
  },
  bg: {
    eyebrow: 'Казуси',
    title: 'Бизнес резултати от Microsoft cloud, security и infrastructure работа',
    lead: 'Фокусирана зона за transformation stories, delivery patterns и измерими operational improvements.',
    subline: 'Подробни клиентски казуси могат да бъдат добавени при одобрени references. Засега страницата държи навигацията завършена без да преувеличава confidential work.',
    cards: [
      ['Migration readiness', 'Discovery, tenant assessment, identity cleanup и migration planning преди Microsoft 365 или Azure промяна.'],
      ['Security uplift', 'Conditional Access, endpoint protection, Defender posture, backup validation и incident-response readiness.'],
      ['Operational ownership', 'Managed support, documentation, escalation paths и reporting, които намаляват повтарящото се ИТ напрежение.']
    ]
  }
}

export default function CaseStudies() {
  const { lang } = useContent()
  const c = copy[lang] || copy.en

  return (
    <div>
      <PageHero
        eyebrow={c.eyebrow}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: lang === 'bg' ? 'Заявете ИТ оценка' : 'Request IT Assessment' }}
        secondaryCta={{ to: '/solutions', label: lang === 'bg' ? 'Вижте решенията' : 'Explore solutions' }}
        aside={{
          eyebrow: c.eyebrow,
          title: lang === 'bg' ? 'Одобрени references' : 'Approved references',
          lead: lang === 'bg' ? 'Публикуват се само след клиентско одобрение.' : 'Published only with client approval.',
          icon: 'governance',
          items: [
            { k: 'Cloud', v: 'Microsoft' },
            { k: 'Security', v: 'Zero Trust' },
            { k: 'Ops', v: 'Managed' }
          ]
        }}
      />

      <GemSection eyebrow={c.eyebrow} title={lang === 'bg' ? 'Какви казуси ще бъдат публикувани' : 'What this section will cover'}>
        <div className="grid gap-4 md:grid-cols-3">
          {c.cards.map(([title, body], index) => (
            <Card key={title} revealDelay={index * 0.05} variant={index === 1 ? 'steel' : 'brand'}>
              <div className="text-sm font-semibold text-ink-950">{title}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{body}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}
