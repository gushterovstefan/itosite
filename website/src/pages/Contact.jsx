import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import { useContent } from '../content/index.jsx'

export default function Contact() {
  const { content } = useContent()
  const c = content.contact
  const ui = content.shared.ui

  return (
    <div>
      <PageHero
        eyebrow={ui.contact}
        title={c.title}
        lead={c.lead}
        subline={null}
        primaryCta={{ to: '/contacts', label: ui.getQuote ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.solutions }}
        aside={{
          eyebrow: 'Contact',
          title: 'Let’s talk',
          lead: 'Reach us by phone, email, or leave a message (demo form).',
          icon: 'message',
          items: [
            { k: 'Response', v: 'Fast' },
            { k: 'Support', v: '24/7' },
            { k: 'Time zone', v: 'EET' }
          ]
        }}
      />

      <GemSection eyebrow={ui.contact} title={c.title} lead={c.lead}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.phoneLabel}</div>
              <Icon as={icons.phone} />
            </div>
            <div className="mt-2 text-sm text-ink-900/70">{c.phone}</div>
          </Card>
          <Card revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.emailLabel}</div>
              <Icon as={icons.mail} />
            </div>
            <div className="mt-2 text-sm text-ink-900/70">{c.email}</div>
          </Card>
          <Card revealDelay={0.16} variant="brand" badge="Discovery">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">
                {content.shared.ui.getQuote === 'Запитване' ? '30-минутен разговор' : '30-minute discovery call'}
              </div>
              <Icon as={icons.message} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-ink-900/70">
              {content.shared.ui.getQuote === 'Запитване'
                ? 'Пишете ни с кратко описание на проекта. Ще върнем next step до 1 работен ден.'
                : 'Send a short project brief. We will respond with a practical next step within 1 business day.'}
            </p>
          </Card>
        </div>
      </GemSection>
    </div>
  )
}
