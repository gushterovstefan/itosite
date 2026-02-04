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
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-1" revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.phoneLabel}</div>
              <Icon as={icons.phone} />
            </div>
            <div className="mt-2 text-sm text-white/70">{c.phone}</div>
          </Card>
          <Card className="md:col-span-1" revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.emailLabel}</div>
              <Icon as={icons.mail} />
            </div>
            <div className="mt-2 text-sm text-white/70">{c.email}</div>
          </Card>
          <Card className="md:col-span-1" revealDelay={0.16}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.writeUs}</div>
              <Icon as={icons.message} />
            </div>
            <p className="mt-2 text-sm text-white/70">
              (Demo) For the development phase we can keep this as a simple form (no database) and later wire it to email/CRM.
            </p>
            <form className="mt-5 space-y-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder={ui.yourName}
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder={ui.yourEmail}
                type="email"
              />
              <textarea
                className="h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder={ui.message}
              />
              <button
                type="button"
                className="btn-sheen btn-primary rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400"
              >
                <span className="sheen" aria-hidden="true" />
                <span>{ui.sendDemo}</span>
              </button>
            </form>
          </Card>
        </div>
      </GemSection>
    </div>
  )
}
