import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../content/index.jsx'
import { localizePath, stripLocalePrefix } from '../content/index.jsx'

const origin = 'https://itoutsource.bg'
const ogImage = `${origin}/og-image.png`

const metaByPath = {
  en: {
    '/': {
      title: 'IT Outsource Ltd. — Managed IT, Cloud & Security Services',
      description: 'IT Outsource designs, builds, secures and operates enterprise IT environments across support, infrastructure, consulting and cloud solutions.'
    },
    '/it-support-services': {
      title: 'IT Support Services — IT Outsource Ltd.',
      description: 'SLA-driven managed IT support, service desk, endpoint management, remote and on-site support for business-critical operations.'
    },
    '/it-infrastructure-services': {
      title: 'IT Infrastructure Services — IT Outsource Ltd.',
      description: 'Hybrid infrastructure, virtualization, networking, backup, DR and secure platform operations for resilient business systems.'
    },
    '/it-consulting-services': {
      title: 'IT Consulting Services — IT Outsource Ltd.',
      description: 'Enterprise architecture, cloud migration, security governance, ERP integration and technical due diligence for IT change.'
    },
    '/solutions': {
      title: 'Microsoft Cloud, Security & Business Continuity Solutions — IT Outsource Ltd.',
      description: 'Microsoft 365, Azure, cybersecurity, endpoint, backup, disaster recovery, managed IT support and migration solutions for reliable business IT operations.'
    },
    '/microsoft-365': {
      title: 'Microsoft 365 Modern Workplace Services — IT Outsource Ltd.',
      description: 'Microsoft 365 setup, Exchange Online, Teams, SharePoint, OneDrive, Entra ID, Intune, Defender, Conditional Access, MFA, DLP and backup.'
    },
    '/azure-cloud': {
      title: 'Azure Cloud Infrastructure & Migration Services — IT Outsource Ltd.',
      description: 'Azure landing zones, VM migration, VPN networking, Azure Backup, Site Recovery, monitoring, governance, cost optimization and hybrid infrastructure.'
    },
    '/cybersecurity': {
      title: 'Cybersecurity & Zero Trust Services — IT Outsource Ltd.',
      description: 'Zero Trust, identity security, endpoint protection, Defender, Intune, Conditional Access, DLP, secure email, monitoring and incident response.'
    },
    '/backup-disaster-recovery': {
      title: 'Backup & Disaster Recovery Services — IT Outsource Ltd.',
      description: 'Backup strategy, Microsoft 365 backup, server backup, Azure Backup, Site Recovery, immutable backup, restore testing and RTO/RPO planning.'
    },
    '/managed-it-support': {
      title: 'Managed IT Support Services — IT Outsource Ltd.',
      description: 'Complete IT support, co-managed support, project support, senior escalation, SLA-based support, monitoring, vendor coordination and executive advisory.'
    },
    '/google-workspace-to-microsoft-365': {
      title: 'Google Workspace to Microsoft 365 Migration — IT Outsource Ltd.',
      description: 'Gmail to Exchange Online, Google Drive to SharePoint and OneDrive, Shared Drives, calendars, contacts, permission mapping and migration batches.'
    },
    '/contact': {
      title: 'Contact IT Outsource Ltd.',
      description: 'Contact IT Outsource for managed IT, infrastructure, consulting, Microsoft cloud, security, backup and business platform projects.'
    },
    '/solutions/microsoft-azure': {
      title: 'Microsoft Azure Solutions — IT Outsource Ltd.',
      description: 'Azure infrastructure design, secure networking, monitoring, governance, cost control and operational runbooks.'
    },
    '/solutions/microsoft-365': {
      title: 'Microsoft 365 Solutions — IT Outsource Ltd.',
      description: 'Microsoft 365 collaboration, Teams, SharePoint, Exchange, Entra, Intune and Defender governance for modern workplace operations.'
    },
    '/solutions/vmware-proxmox-virtualization': {
      title: 'VMware & Proxmox Virtualization — IT Outsource Ltd.',
      description: 'Virtualization assessment, design, migration and operations for VMware and Proxmox private infrastructure.'
    },
    '/solutions/azure-hybrid-cloud': {
      title: 'Azure Hybrid Cloud Integration — IT Outsource Ltd.',
      description: 'Hybrid cloud integration across on-prem VMware or Proxmox and Azure for secure connectivity, monitoring and disaster recovery.'
    },
    '/solutions/zero-trust-security': {
      title: 'Zero Trust Security with Defender & Sentinel — IT Outsource Ltd.',
      description: 'Microsoft Defender XDR and Sentinel security delivery across endpoints, identities and cloud workloads with incident response and governance.'
    },
    '/solutions/entra-id-sso': {
      title: 'Entra ID & SSO Consolidation — IT Outsource Ltd.',
      description: 'Single sign-on, Conditional Access, MFA and audit trail consolidation for SaaS and business applications using Microsoft Entra ID.'
    },
    '/solutions/backup-dr-veeam': {
      title: 'Backup & DR with Veeam — IT Outsource Ltd.',
      description: '3-2-1 backup strategy, immutable repositories and tested recovery for VMware, Hyper-V, Microsoft 365 and physical workloads.'
    },
    '/solutions/cloud-migration': {
      title: 'Cloud Migration Services — IT Outsource Ltd.',
      description: 'Phased Google Workspace to Microsoft 365 migration for mail, files and identity with clear runbooks and minimal downtime.'
    },
    '/solutions/web-b2b-b2c': {
      title: 'Web-Based B2B & B2C Solutions — IT Outsource Ltd.',
      description: 'Custom ERP-integrated web platforms and business portals for B2B and B2C workflows, automation and operational handover.'
    },
    '/solutions/easy-order-platform': {
      title: 'Easy Order Web Platform — IT Outsource Ltd.',
      description: 'Integrated order-process platform connecting customers, manufacturers, warehouses and distributors with automated data flow.'
    },
    '/solutions/gxp-clinical-research-it': {
      title: 'GxP & Clinical Research IT — IT Outsource Ltd.',
      description: 'Validated, audit-ready IT environments for CRO, clinical research and regulated life-sciences teams with CSV and GAMP 5 aligned delivery.'
    },
    '/case-studies': {
      title: 'Anonymized Case Studies — IT Outsource Ltd.',
      description: 'Anonymized Microsoft 365 security, Google Workspace migration, Azure disaster recovery and retail infrastructure support case studies.'
    },
    '/about': {
      title: 'About IT Outsource Ltd.',
      description: 'Learn about IT Outsource Ltd., a Sofia-based IT services company delivering consulting, infrastructure, support and digital solutions.'
    },
    '/how-we-deliver': {
      title: 'How We Deliver — IT Outsource Ltd.',
      description: 'A phased IT delivery methodology: Discover, Design, Migrate or Build, Operate and Optimize with clear gates, owners and handover.'
    },
    '/industries': {
      title: 'Industries — IT Outsource Ltd.',
      description: 'IT solutions for retail, healthcare, pharma, CRO, energy, engineering, solar and growing SMB companies where downtime is not acceptable.'
    },
    '/industries/retail': {
      title: 'Retail & E-commerce IT Services — IT Outsource Ltd.',
      description: 'IT support, infrastructure, identity, backup and web-platform delivery for distributed retail and e-commerce operations.'
    },
    '/industries/pharma-healthcare': {
      title: 'Healthcare, Pharma & CRO IT Services — IT Outsource Ltd.',
      description: 'Secure Microsoft 365, identity, endpoint, backup and support services for healthcare, pharma and CRO teams.'
    },
    '/industries/energy-engineering': {
      title: 'Energy, Solar & Engineering IT Services — IT Outsource Ltd.',
      description: 'Microsoft cloud, cybersecurity, backup, disaster recovery and IT support for energy, solar and engineering companies.'
    },
    '/industries/smb': {
      title: 'SMB & Growing Company IT Services — IT Outsource Ltd.',
      description: 'Managed IT support, Microsoft 365, cybersecurity, backup and migration services for SMB and growing companies.'
    },
    '/insights': {
      title: 'Insights & IT Playbooks — IT Outsource Ltd.',
      description: 'Practical IT playbooks for Microsoft 365 migration, Zero Trust security and tested backup and disaster recovery.'
    },
    '/insights/google-workspace-to-microsoft-365-migration': {
      title: 'Google Workspace to Microsoft 365 Migration Playbook — IT Outsource Ltd.',
      description: 'A 7-phase practical playbook for migrating mail, files and identity from Google Workspace to Microsoft 365 with minimal downtime.'
    },
    '/insights/zero-trust-regulated-mid-market': {
      title: 'Zero Trust for Regulated Mid-Market — IT Outsource Ltd.',
      description: 'A practical Zero Trust model using identity, endpoints, Microsoft Defender XDR, Sentinel and governance without enterprise bloat.'
    },
    '/insights/backup-immutability-tested-dr': {
      title: 'Backup, Immutability and Tested DR — IT Outsource Ltd.',
      description: 'How to make backup useful in real incidents with 3-2-1 strategy, immutable repositories, restore tests and clear RPO/RTO.'
    },
    '/contacts': {
      title: 'Contact IT Outsource Ltd.',
      description: 'Contact IT Outsource for managed IT, infrastructure, consulting, Microsoft cloud, security, backup and business platform projects.'
    },
    '/legal/privacy': {
      title: 'Privacy Policy — IT Outsource Ltd.',
      description: 'Privacy information for IT Outsource Ltd. website visitors and business contacts.'
    },
    '/legal/terms': {
      title: 'Terms — IT Outsource Ltd.',
      description: 'Website terms and legal information for IT Outsource Ltd.'
    }
  },
  bg: {
    '/': {
      title: 'Ай Ти Аутсорс ООД — ИТ поддръжка, облак и сигурност',
      description: 'Ай Ти Аутсорс проектира, изгражда, защитава и управлява ИТ среди за поддръжка, инфраструктура, консултации и облачни решения.'
    },
    '/it-support-services': {
      title: 'ИТ поддръжка — Ай Ти Аутсорс ООД',
      description: 'SLA-базирана ИТ поддръжка, service desk, endpoint управление, remote и on-site support за критични бизнес операции.'
    },
    '/it-infrastructure-services': {
      title: 'ИТ инфраструктура — Ай Ти Аутсорс ООД',
      description: 'Хибридна инфраструктура, виртуализация, мрежи, backup, DR и сигурни платформи за устойчиви бизнес системи.'
    },
    '/it-consulting-services': {
      title: 'ИТ консултации — Ай Ти Аутсорс ООД',
      description: 'Enterprise архитектура, cloud migration, security governance, ERP интеграции и technical due diligence за ИТ промяна.'
    },
    '/solutions': {
      title: 'Microsoft Cloud, Security и Business Continuity решения — Ай Ти Аутсорс ООД',
      description: 'Microsoft 365, Azure, киберсигурност, endpoint, backup, disaster recovery, managed IT support и migration решения за надеждни бизнес ИТ операции.'
    },
    '/microsoft-365': {
      title: 'Microsoft 365 Modern Workplace услуги — Ай Ти Аутсорс ООД',
      description: 'Microsoft 365 setup, Exchange Online, Teams, SharePoint, OneDrive, Entra ID, Intune, Defender, Conditional Access, MFA, DLP и backup.'
    },
    '/azure-cloud': {
      title: 'Azure Cloud инфраструктура и миграция — Ай Ти Аутсорс ООД',
      description: 'Azure landing zones, VM migration, VPN networking, Azure Backup, Site Recovery, monitoring, governance, cost optimization и hybrid infrastructure.'
    },
    '/cybersecurity': {
      title: 'Cybersecurity и Zero Trust услуги — Ай Ти Аутсорс ООД',
      description: 'Zero Trust, identity security, endpoint protection, Defender, Intune, Conditional Access, DLP, secure email, monitoring и incident response.'
    },
    '/backup-disaster-recovery': {
      title: 'Backup и Disaster Recovery услуги — Ай Ти Аутсорс ООД',
      description: 'Backup strategy, Microsoft 365 backup, server backup, Azure Backup, Site Recovery, immutable backup, restore testing и RTO/RPO planning.'
    },
    '/managed-it-support': {
      title: 'Managed IT Support услуги — Ай Ти Аутсорс ООД',
      description: 'Complete IT support, co-managed support, project support, senior escalation, SLA-based support, monitoring, vendor coordination и executive advisory.'
    },
    '/google-workspace-to-microsoft-365': {
      title: 'Google Workspace към Microsoft 365 миграция — Ай Ти Аутсорс ООД',
      description: 'Gmail към Exchange Online, Google Drive към SharePoint и OneDrive, Shared Drives, calendars, contacts, permission mapping и migration batches.'
    },
    '/contact': {
      title: 'Контакти — Ай Ти Аутсорс ООД',
      description: 'Свържете се с Ай Ти Аутсорс за ИТ поддръжка, инфраструктура, консултации, Microsoft cloud, сигурност и backup проекти.'
    },
    '/solutions/microsoft-azure': {
      title: 'Microsoft Azure решения — Ай Ти Аутсорс ООД',
      description: 'Azure infrastructure design, secure networking, monitoring, governance, cost control и operational runbooks.'
    },
    '/solutions/microsoft-365': {
      title: 'Microsoft 365 решения — Ай Ти Аутсорс ООД',
      description: 'Microsoft 365 collaboration, Teams, SharePoint, Exchange, Entra, Intune и Defender governance за modern workplace operations.'
    },
    '/solutions/vmware-proxmox-virtualization': {
      title: 'VMware и Proxmox виртуализация — Ай Ти Аутсорс ООД',
      description: 'Virtualization assessment, design, migration и operations за VMware и Proxmox private infrastructure.'
    },
    '/solutions/azure-hybrid-cloud': {
      title: 'Azure хибридна интеграция — Ай Ти Аутсорс ООД',
      description: 'Hybrid cloud integration между on-prem VMware/Proxmox и Azure за secure connectivity, monitoring и disaster recovery.'
    },
    '/solutions/zero-trust-security': {
      title: 'Zero Trust сигурност с Defender и Sentinel — Ай Ти Аутсорс ООД',
      description: 'Microsoft Defender XDR и Sentinel доставка за защита на устройства, идентичности и cloud workloads с incident response и governance.'
    },
    '/solutions/entra-id-sso': {
      title: 'Entra ID и SSO консолидация — Ай Ти Аутсорс ООД',
      description: 'SSO, Conditional Access, MFA и audit trail консолидация за SaaS и бизнес приложения чрез Microsoft Entra ID.'
    },
    '/solutions/backup-dr-veeam': {
      title: 'Backup и DR с Veeam — Ай Ти Аутсорс ООД',
      description: '3-2-1 backup стратегия, immutable repositories и тествано възстановяване за VMware, Hyper-V, Microsoft 365 и physical workloads.'
    },
    '/solutions/cloud-migration': {
      title: 'Cloud migration услуги — Ай Ти Аутсорс ООД',
      description: 'Поетапна миграция от Google Workspace към Microsoft 365 за поща, файлове и идентичност с ясни runbooks и минимален downtime.'
    },
    '/solutions/web-b2b-b2c': {
      title: 'Уеб B2B и B2C решения — Ай Ти Аутсорс ООД',
      description: 'Custom ERP-integrated web platforms и business portals за B2B/B2C workflows, automation и operational handover.'
    },
    '/solutions/easy-order-platform': {
      title: 'Easy Order платформа — Ай Ти Аутсорс ООД',
      description: 'Интегрирана order-process платформа, свързваща клиенти, производители, складове и дистрибутори с automated data flow.'
    },
    '/solutions/gxp-clinical-research-it': {
      title: 'GxP и Clinical Research IT — Ай Ти Аутсорс ООД',
      description: 'Validated, audit-ready ИТ среди за CRO, clinical research и регулирани life-sciences екипи с CSV и GAMP 5 aligned доставка.'
    },
    '/case-studies': {
      title: 'Анонимизирани казуси — Ай Ти Аутсорс ООД',
      description: 'Анонимизирани казуси за Microsoft 365 security, Google Workspace migration, Azure DR и retail infrastructure support.'
    },
    '/about': {
      title: 'За Ай Ти Аутсорс ООД',
      description: 'Информация за Ай Ти Аутсорс ООД — ИТ компания в София за консултации, инфраструктура, поддръжка и дигитални решения.'
    },
    '/how-we-deliver': {
      title: 'Как работим — Ай Ти Аутсорс ООД',
      description: 'Фазиран ИТ delivery model: Discover, Design, Migrate/Build, Operate и Optimize с ясни gates, owners и handover.'
    },
    '/industries': {
      title: 'Индустрии — Ай Ти Аутсорс ООД',
      description: 'ИТ решения за retail, healthcare, pharma, CRO, energy, engineering, solar и growing SMB companies, където downtime не е приемлив.'
    },
    '/industries/retail': {
      title: 'Retail и E-commerce ИТ услуги — Ай Ти Аутсорс ООД',
      description: 'ИТ поддръжка, инфраструктура, identity, backup и web-platform доставка за разпределени retail и e-commerce операции.'
    },
    '/industries/pharma-healthcare': {
      title: 'Healthcare, Pharma и CRO ИТ услуги — Ай Ти Аутсорс ООД',
      description: 'Secure Microsoft 365, identity, endpoint, backup и support услуги за healthcare, pharma и CRO teams.'
    },
    '/industries/energy-engineering': {
      title: 'Energy, Solar и Engineering ИТ услуги — Ай Ти Аутсорс ООД',
      description: 'Microsoft cloud, cybersecurity, backup, disaster recovery и IT support за energy, solar и engineering companies.'
    },
    '/industries/smb': {
      title: 'SMB и Growing Company ИТ услуги — Ай Ти Аутсорс ООД',
      description: 'Managed IT support, Microsoft 365, cybersecurity, backup и migration services за SMB и growing companies.'
    },
    '/insights': {
      title: 'Материали и ИТ Playbooks — Ай Ти Аутсорс ООД',
      description: 'Практични ИТ playbooks за Microsoft 365 migration, Zero Trust сигурност и тестван backup/disaster recovery.'
    },
    '/insights/google-workspace-to-microsoft-365-migration': {
      title: 'Google Workspace към Microsoft 365 Migration Playbook — Ай Ти Аутсорс ООД',
      description: '7-фазов практичен playbook за миграция на поща, файлове и identity от Google Workspace към Microsoft 365 с минимален downtime.'
    },
    '/insights/zero-trust-regulated-mid-market': {
      title: 'Zero Trust за Regulated Mid-Market — Ай Ти Аутсорс ООД',
      description: 'Практичен Zero Trust модел с identity, endpoints, Microsoft Defender XDR, Sentinel и governance без enterprise bloat.'
    },
    '/insights/backup-immutability-tested-dr': {
      title: 'Backup, Immutability и Tested DR — Ай Ти Аутсорс ООД',
      description: 'Как backup става полезен при реални incidents чрез 3-2-1 стратегия, immutable repositories, restore tests и ясни RPO/RTO.'
    },
    '/contacts': {
      title: 'Контакти — Ай Ти Аутсорс ООД',
      description: 'Свържете се с Ай Ти Аутсорс за ИТ поддръжка, инфраструктура, консултации, Microsoft cloud, сигурност и backup проекти.'
    },
    '/legal/privacy': {
      title: 'Политика за поверителност — Ай Ти Аутсорс ООД',
      description: 'Информация за поверителност за посетители на сайта и бизнес контакти на Ай Ти Аутсорс ООД.'
    },
    '/legal/terms': {
      title: 'Условия — Ай Ти Аутсорс ООД',
      description: 'Условия за ползване и правна информация за сайта на Ай Ти Аутсорс ООД.'
    }
  }
}

const routeLabels = {
  '/': 'Home',
  '/it-support-services': 'IT Support Services',
  '/it-infrastructure-services': 'IT Infrastructure Services',
  '/it-consulting-services': 'IT Consulting Services',
  '/solutions': 'Solutions',
  '/microsoft-365': 'Microsoft 365',
  '/azure-cloud': 'Azure Cloud',
  '/cybersecurity': 'Cybersecurity',
  '/backup-disaster-recovery': 'Backup & Disaster Recovery',
  '/managed-it-support': 'Managed IT Support',
  '/google-workspace-to-microsoft-365': 'Google Workspace to Microsoft 365',
  '/contact': 'Contact',
  '/case-studies': 'Case Studies',
  '/about': 'About',
  '/how-we-deliver': 'How We Deliver',
  '/industries': 'Industries',
  '/insights': 'Insights',
  '/contacts': 'Contact',
  '/legal/privacy': 'Privacy Policy',
  '/legal/terms': 'Terms'
}

const servicePaths = new Set([
  '/it-support-services',
  '/it-infrastructure-services',
  '/it-consulting-services',
  '/solutions',
  '/microsoft-365',
  '/azure-cloud',
  '/cybersecurity',
  '/backup-disaster-recovery',
  '/managed-it-support',
  '/google-workspace-to-microsoft-365',
  '/solutions/microsoft-azure',
  '/solutions/microsoft-365',
  '/solutions/vmware-proxmox-virtualization',
  '/solutions/azure-hybrid-cloud',
  '/solutions/zero-trust-security',
  '/solutions/entra-id-sso',
  '/solutions/backup-dr-veeam',
  '/solutions/cloud-migration',
  '/solutions/web-b2b-b2c',
  '/solutions/easy-order-platform',
  '/solutions/gxp-clinical-research-it'
])

function readableLabel(path, data) {
  if (routeLabels[path]) return routeLabels[path]
  if (data?.title) return data.title.replace(/ — .+$/, '')
  const last = path.split('/').filter(Boolean).pop() || 'Home'
  return last.split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
}

function breadcrumbFor(path, data, lang) {
  const parts = path.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: lang === 'bg' ? 'Начало' : 'Home', item: `${origin}${localizePath('/', lang)}` }]
  let current = ''
  parts.forEach((part, index) => {
    current += `/${part}`
    items.push({
      '@type': 'ListItem',
      position: index + 2,
      name: index === parts.length - 1 ? readableLabel(path, data) : readableLabel(current),
      item: `${origin}${localizePath(current, lang)}`
    })
  })
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

function serviceFor(path, data, lang) {
  if (!servicePaths.has(path)) return null
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: readableLabel(path, data),
    description: data.description,
    provider: {
      '@type': 'Organization',
      name: 'IT Outsource Ltd.',
      url: origin
    },
    areaServed: ['Bulgaria', 'European Union'],
    serviceType: readableLabel(path, data),
    url: `${origin}${localizePath(path, lang)}`
  }
}

function setJsonLd(id, payload) {
  const old = document.head.querySelector(`script[data-seo-jsonld="${id}"]`)
  if (old) old.remove()
  if (!payload) return
  const script = document.createElement('script')
  script.type = 'application/ld+json'
  script.dataset.seoJsonld = id
  script.textContent = JSON.stringify(payload)
  document.head.appendChild(script)
}

function setMeta(selector, attr, value) {
  let el = document.head.querySelector(selector)
  if (!el) {
    el = document.createElement('meta')
    const match = selector.match(/meta\[(name|property)="([^"]+)"\]/)
    if (match) el.setAttribute(match[1], match[2])
    document.head.appendChild(el)
  }
  el.setAttribute(attr, value)
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`)
  if (!el) {
    el = document.createElement('link')
    el.setAttribute('rel', rel)
    document.head.appendChild(el)
  }
  el.setAttribute('href', href)
}

function setAlternateLinks(path) {
  document.head.querySelectorAll('link[rel="alternate"][hreflang]').forEach((el) => el.remove())
  const alternates = [
    ['en', `${origin}${localizePath(path, 'en')}`],
    ['bg', `${origin}${localizePath(path, 'bg')}`],
    ['x-default', `${origin}${localizePath(path, 'en')}`]
  ]
  alternates.forEach(([hreflang, href]) => {
    const el = document.createElement('link')
    el.setAttribute('rel', 'alternate')
    el.setAttribute('hreflang', hreflang)
    el.setAttribute('href', href)
    document.head.appendChild(el)
  })
}

export default function Seo() {
  const { lang } = useContent()
  const location = useLocation()

  useEffect(() => {
    const path = stripLocalePrefix(location.pathname)
    const data = metaByPath[lang]?.[path] || metaByPath.en[path] || metaByPath.en['/']
    const url = `${origin}${localizePath(path, lang)}`

    document.documentElement.lang = lang === 'bg' ? 'bg' : 'en'
    document.title = data.title
    setMeta('meta[name="description"]', 'content', data.description)
    setMeta('meta[property="og:title"]', 'content', data.title)
    setMeta('meta[property="og:description"]', 'content', data.description)
    setMeta('meta[property="og:type"]', 'content', 'website')
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:site_name"]', 'content', 'IT Outsource Ltd.')
    setMeta('meta[property="og:image"]', 'content', ogImage)
    setMeta('meta[property="og:image:secure_url"]', 'content', ogImage)
    setMeta('meta[property="og:image:type"]', 'content', 'image/png')
    setMeta('meta[property="og:image:width"]', 'content', '1200')
    setMeta('meta[property="og:image:height"]', 'content', '630')
    setMeta('meta[property="og:image:alt"]', 'content', 'IT Outsource Ltd. — enterprise IT services, cloud, security and operations')
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setMeta('meta[name="twitter:image"]', 'content', ogImage)
    setMeta('meta[name="twitter:image:alt"]', 'content', 'IT Outsource Ltd. — enterprise IT services, cloud, security and operations')
    setLink('canonical', url)
    setAlternateLinks(path)

    setJsonLd('organization', {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'IT Outsource Ltd.',
      alternateName: 'Ай Ти Аутсорс ООД',
      url: origin,
      email: 'info@itoutsource.bg',
      telephone: '+359887940248',
      vatID: 'BG200776949',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '25 Popova Shapka St., floor 2, apt. 6',
        addressLocality: 'Sofia',
        postalCode: '1505',
        addressCountry: 'BG'
      }
    })
    setJsonLd('breadcrumb', breadcrumbFor(path, data, lang))
    setJsonLd('service', serviceFor(path, data, lang))
  }, [lang, location.pathname])

  return null
}
