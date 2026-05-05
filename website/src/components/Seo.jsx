import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useContent } from '../content/index.jsx'

const origin = 'https://itosite.pages.dev'

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
      title: 'IT Solutions — Azure, Microsoft 365, Security, Backup & DR',
      description: 'Production-ready solutions across Microsoft Azure, Microsoft 365, Zero Trust security, Entra ID, Veeam backup, cloud migration and web platforms.'
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
    '/about': {
      title: 'About IT Outsource Ltd.',
      description: 'Learn about IT Outsource Ltd., a Sofia-based IT services company delivering consulting, infrastructure, support and digital solutions.'
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
      title: 'ИТ решения — Azure, Microsoft 365, сигурност, backup и DR',
      description: 'Решения за Microsoft Azure, Microsoft 365, Zero Trust сигурност, Entra ID, Veeam backup, cloud migration и уеб платформи.'
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
    '/about': {
      title: 'За Ай Ти Аутсорс ООД',
      description: 'Информация за Ай Ти Аутсорс ООД — ИТ компания в София за консултации, инфраструктура, поддръжка и дигитални решения.'
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

export default function Seo() {
  const { lang } = useContent()
  const location = useLocation()

  useEffect(() => {
    const path = location.pathname
    const data = metaByPath[lang]?.[path] || metaByPath.en[path] || metaByPath.en['/']
    const url = `${origin}${path}`

    document.documentElement.lang = lang === 'bg' ? 'bg' : 'en'
    document.title = data.title
    setMeta('meta[name="description"]', 'content', data.description)
    setMeta('meta[property="og:title"]', 'content', data.title)
    setMeta('meta[property="og:description"]', 'content', data.description)
    setMeta('meta[property="og:type"]', 'content', 'website')
    setMeta('meta[property="og:url"]', 'content', url)
    setMeta('meta[property="og:site_name"]', 'content', 'IT Outsource Ltd.')
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image')
    setLink('canonical', url)

    const old = document.head.querySelector('script[data-seo-jsonld="organization"]')
    if (old) old.remove()
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'organization'
    script.textContent = JSON.stringify({
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
    document.head.appendChild(script)
  }, [lang, location.pathname])

  return null
}
