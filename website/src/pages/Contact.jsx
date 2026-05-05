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
        primaryCta={{ to: '/it-support-services', label: ui.support }}
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
        <div className="grid gap-4 md:grid-cols-2">
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
        </div>
      </GemSection>
    </div>
  )
}
