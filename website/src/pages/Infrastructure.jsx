import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import ServiceOutcomeStrip from '../components/ServiceOutcomeStrip.jsx'
import { useContent } from '../content/index.jsx'

const serviceCopy = {
  en: [
    ['Business problem', 'Hybrid infrastructure risk', 'Servers, virtualization, storage, backup, cloud and network decisions often evolve separately, creating resilience gaps and unclear recovery ownership.'],
    ['Service provided', 'Secure infrastructure design and operation', 'We assess, design, migrate and operate Azure, Microsoft 365, VMware, Proxmox, network, backup and disaster recovery platforms as one controlled system.'],
    ['Why trust us', 'Resilience-first engineering', 'Infrastructure work is tied to hardening, capacity, monitoring, backup validation, runbooks and handover — not just deployment.'],
    ['Next step', 'Request IT Assessment', 'Start with an infrastructure and recovery assessment covering risk, capacity, backup posture, dependencies and modernization options.']
  ],
  bg: [
    ['Бизнес проблем', 'Риск в хибридна инфраструктура', 'Сървъри, virtualization, storage, backup, cloud и network често се развиват отделно, което създава resilience gaps и неясен recovery ownership.'],
    ['Услуга', 'Secure infrastructure design and operation', 'Оценяваме, проектираме, мигрираме и управляваме Azure, Microsoft 365, VMware, Proxmox, network, backup и DR като една controlled system.'],
    ['Защо да ни се доверите', 'Resilience-first engineering', 'Infrastructure работата включва hardening, capacity, monitoring, backup validation, runbooks и handover — не само deployment.'],
    ['Следваща стъпка', 'Заявете ИТ оценка', 'Започнете с infrastructure и recovery assessment върху risk, capacity, backup posture, dependencies и modernization options.']
  ]
}

export default function Infrastructure() {
  const { content, lang } = useContent()
  const c = content.infrastructure
  const ui = content.shared.ui

  return (
    <div>
      <PageHero
        eyebrow={ui.infrastructure}
        title={c.title}
        lead={c.lead}
        subline={c.subline}
        primaryCta={{ to: '/contacts', label: ui.contactUs ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.exploreSolutions ?? ui.solutions }}
        aside={{
          eyebrow: 'Infrastructure',
          title: 'Secure platforms',
          lead: c.punchline,
          icon: 'infrastructure',
          items: [
            { k: 'Cloud', v: 'Hybrid' },
            { k: 'Network', v: 'Resilient' },
            { k: 'Backups', v: 'Verified' }
          ]
        }}
      />

      <ServiceOutcomeStrip items={(serviceCopy[lang] || serviceCopy.en).map(([label, title, body]) => ({ label, title, body }))} />

      <GemSection eyebrow={ui.infrastructure} title={c.title} lead={c.punchline}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => (
            <Card key={card.title} revealDelay={0.04 + i * 0.04} variant="steel">
              <div className="flex items-start justify-between gap-4">
                <div className="text-sm font-semibold">{card.title}</div>
                <Icon as={icons[card.icon] ?? icons.infrastructure} />
              </div>
              <div className="mt-4">
                <BulletList items={card.bullets} />
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta variant="infrastructure" />
    </div>
  )
}
