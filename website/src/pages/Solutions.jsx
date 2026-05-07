import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, ClickCard, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const solutionLinks = {
  'Microsoft Azure': '/solutions/microsoft-azure',
  'Microsoft 365': '/solutions/microsoft-365',
  'VMware & Proxmox Virtualization': '/solutions/vmware-proxmox-virtualization',
  'VMware и Proxmox виртуализация': '/solutions/vmware-proxmox-virtualization',
  'Azure Hybrid Cloud Integration': '/solutions/azure-hybrid-cloud',
  'Azure хибридна интеграция': '/solutions/azure-hybrid-cloud',
  'Zero Trust Security with Defender & Sentinel': '/solutions/zero-trust-security',
  'Zero Trust сигурност с Defender и Sentinel': '/solutions/zero-trust-security',
  'Entra ID & SSO Consolidation': '/solutions/entra-id-sso',
  'Entra ID и SSO консолидация': '/solutions/entra-id-sso',
  'Backup & DR with Veeam': '/solutions/backup-dr-veeam',
  'Backup и DR с Veeam': '/solutions/backup-dr-veeam',
  'Cloud Migration Services': '/solutions/cloud-migration',
  'Cloud migration услуги': '/solutions/cloud-migration',
  'Web-Based B2B & B2C Solutions': '/solutions/web-b2b-b2c',
  'Уеб B2B и B2C решения': '/solutions/web-b2b-b2c',
  'Easy Order Web Platform': '/solutions/easy-order-platform',
  'Easy Order платформа': '/solutions/easy-order-platform',
  'GxP & Clinical Research IT': '/solutions/gxp-clinical-research-it',
  'GxP и Clinical Research IT': '/solutions/gxp-clinical-research-it'
}

export default function Solutions() {
  const { content } = useContent()
  const c = content.solutions

  return (
    <div>
      <PageHero
        eyebrow="IT Solutions"
        title="Enterprise IT, Cloud & Security Solutions for Growing Businesses"
        lead="We design, migrate, secure, and support Microsoft 365, Azure, endpoint, backup, and disaster recovery environments — with enterprise-grade governance and practical delivery experience."
        trustLine="Microsoft 365 • Azure • Security • Backup • Disaster Recovery • Endpoint Management"
        primaryCta={{ href: BOOKING_URL, label: 'Book a Consultation' }}
        secondaryCta={{ to: '/solutions', label: 'View Solutions' }}
      />

      <GemSection eyebrow={content.shared.ui.solutions} title={c.title} lead={c.lead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {c.cards.map((card, i) => {
            const to = solutionLinks[card.title]
            const Shell = to ? ClickCard : Card
            const props = to
              ? { to, badge: content.shared.ui.getQuote === 'Запитване' ? 'Детайли' : 'Details' }
              : {}

            return (
              <Shell key={card.title} revealDelay={0.04 + i * 0.04} variant="steel" {...props}>
                <div className="flex items-start justify-between gap-4">
                  <div className="text-sm font-semibold">{card.title}</div>
                  <Icon as={icons[card.icon] ?? icons.platform} />
                </div>
                <div className="mt-4">
                  <BulletList items={card.bullets} />
                </div>
                {to ? (
                  <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-brand-800">
                    {content.shared.ui.getQuote === 'Запитване' ? 'Отвори решението' : 'Open solution'}
                  </div>
                ) : null}
              </Shell>
            )
          })}
        </div>
      </GemSection>

      <ConversionCta variant="solutions" />
    </div>
  )
}
