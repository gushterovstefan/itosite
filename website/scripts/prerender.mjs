import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = new URL('../dist/', import.meta.url).pathname
const origin = 'https://itoutsource.bg'
const siteName = 'IT Outsource Ltd.'
const ogImage = `${origin}/og-image.png`
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')
const today = new Date().toISOString().slice(0, 10)

const routeMeta = {
  '/': {
    title: 'IT Outsource Ltd. — Managed IT, Cloud & Security Services',
    description: 'IT Outsource helps organizations reduce downtime, secure Microsoft 365, control identity and endpoint risk, and improve backup recovery readiness.',
    priority: '1.0', changefreq: 'weekly', type: 'website'
  },
  '/it-support-services': {
    title: 'IT Support Services — Managed Service Desk & Endpoint Support',
    description: 'SLA-driven managed IT support, service desk, endpoint management, remote and on-site support for business-critical operations.',
    priority: '0.8', changefreq: 'monthly', type: 'service'
  },
  '/it-infrastructure-services': {
    title: 'IT Infrastructure Services — Azure, VMware, Proxmox & Backup',
    description: 'Hybrid infrastructure, virtualization, networking, backup, disaster recovery and secure platform operations for resilient business systems.',
    priority: '0.9', changefreq: 'monthly', type: 'service'
  },
  '/it-consulting-services': {
    title: 'IT Consulting Services — Architecture, Cloud & Security Governance',
    description: 'Enterprise architecture, cloud migration, security governance, ERP integration and technical due diligence for controlled IT change.',
    priority: '0.8', changefreq: 'monthly', type: 'service'
  },
  '/solutions': {
    title: 'IT Solutions for Microsoft 365, Azure, Security & Disaster Recovery',
    description: 'Microsoft 365, Azure, cybersecurity, backup, disaster recovery, endpoint management and managed IT consulting services for growing businesses.',
    priority: '0.9', changefreq: 'monthly', type: 'service'
  },
  '/solutions/microsoft-azure': { title: 'Microsoft Azure Solutions — Secure Cloud Infrastructure', description: 'Azure infrastructure design, secure networking, monitoring, governance, cost control and operational runbooks.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/microsoft-365': { title: 'Microsoft 365 Solutions — Secure Modern Workplace', description: 'Secure Microsoft 365 collaboration across Teams, SharePoint and Exchange with Entra, Intune and Defender governance.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/vmware-proxmox-virtualization': { title: 'VMware & Proxmox Virtualization — Private Infrastructure', description: 'Virtualization assessment, design, migration and operations for VMware and Proxmox private infrastructure.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/azure-hybrid-cloud': { title: 'Azure Hybrid Cloud Integration — On-Premises to Cloud', description: 'Hybrid cloud integration across on-prem VMware or Proxmox and Azure for secure connectivity, monitoring and disaster recovery.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/zero-trust-security': { title: 'Zero Trust Security with Defender & Sentinel', description: 'Microsoft Defender XDR and Sentinel security delivery across endpoints, identities and cloud workloads with incident response and governance.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/entra-id-sso': { title: 'Entra ID & SSO Consolidation — Identity Governance', description: 'Single sign-on, Conditional Access, MFA and audit trail consolidation for SaaS and business applications using Microsoft Entra ID.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/backup-dr-veeam': { title: 'Backup & Disaster Recovery with Veeam', description: '3-2-1 backup strategy, immutable repositories and tested recovery for VMware, Hyper-V, Microsoft 365 and physical workloads.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/cloud-migration': { title: 'Cloud Migration Services — Microsoft 365 & Identity Migration', description: 'Phased Google Workspace to Microsoft 365 migration for mail, files and identity with clear runbooks and minimal downtime.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/solutions/web-b2b-b2c': { title: 'Web-Based B2B & B2C Solutions — Business Platforms', description: 'Custom ERP-integrated web platforms and business portals for B2B and B2C workflows, automation and operational handover.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/solutions/easy-order-platform': { title: 'Easy Order Web Platform — Integrated Order Workflows', description: 'Integrated order-process platform connecting customers, manufacturers, warehouses and distributors with automated data flow.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/solutions/gxp-clinical-research-it': { title: 'GxP & Clinical Research IT — Validated Regulated Environments', description: 'Validated, audit-ready IT environments for CRO, clinical research and regulated life-sciences teams with CSV and GAMP 5 aligned delivery.', priority: '0.8', changefreq: 'monthly', type: 'service' },
  '/how-we-deliver': { title: 'How We Deliver — Structured IT Assessment, Design & Operations', description: 'A phased IT delivery methodology: assess, design, implement, validate and operate with clear gates, owners and handover.', priority: '0.8', changefreq: 'monthly', type: 'article' },
  '/industries': { title: 'Industries — Retail, Life Sciences, Energy & Professional Services IT', description: 'IT delivery for retail, life sciences, energy and professional services with relevant solutions, governance and operational ownership.', priority: '0.8', changefreq: 'monthly', type: 'website' },
  '/industries/retail': { title: 'Retail & E-commerce IT Services — Stores, Warehouses & Order Flow', description: 'IT support, infrastructure, identity, backup and web-platform delivery for distributed retail and e-commerce operations.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/industries/life-sciences': { title: 'Life Sciences & Clinical Research IT — Audit-Ready Environments', description: 'Validated, audit-ready IT environments for clinical research and regulated teams with security, governance and recovery planning.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/industries/energy': { title: 'Energy & Utilities IT Services — Secure Distributed Operations', description: 'Microsoft cloud, identity, security and governance delivery for distributed energy and utilities teams.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/industries/professional-services': { title: 'Professional Services & Mid-Market IT — Secure Collaboration', description: 'Practical IT support, SaaS identity control, secure collaboration and infrastructure roadmaps for professional services and mid-market companies.', priority: '0.7', changefreq: 'monthly', type: 'service' },
  '/insights': { title: 'Insights & IT Playbooks — Microsoft 365, Zero Trust and Backup', description: 'Practical IT playbooks for Microsoft 365 migration, Zero Trust security and tested backup and disaster recovery.', priority: '0.7', changefreq: 'weekly', type: 'article' },
  '/insights/google-workspace-to-microsoft-365-migration': { title: 'Google Workspace to Microsoft 365 Migration Playbook', description: 'A 7-phase practical playbook for migrating mail, files and identity from Google Workspace to Microsoft 365 with minimal downtime.', priority: '0.7', changefreq: 'monthly', type: 'article' },
  '/insights/zero-trust-regulated-mid-market': { title: 'Zero Trust for Regulated Mid-Market Organizations', description: 'A practical Zero Trust model using identity, endpoints, Microsoft Defender XDR, Sentinel and governance without enterprise bloat.', priority: '0.7', changefreq: 'monthly', type: 'article' },
  '/insights/backup-immutability-tested-dr': { title: 'Backup, Immutability and Tested Disaster Recovery', description: 'How to make backup useful in real incidents with 3-2-1 strategy, immutable repositories, restore tests and clear RPO/RTO.', priority: '0.7', changefreq: 'monthly', type: 'article' },
  '/about': { title: 'About IT Outsource Ltd. — Sofia-Based IT Services Company', description: 'Learn about IT Outsource Ltd., a Sofia-based IT services company focused on uptime, Microsoft security, infrastructure risk and recovery readiness.', priority: '0.6', changefreq: 'monthly', type: 'website' },
  '/contacts': { title: 'Contact IT Outsource Ltd. — Managed IT, Cloud & Security Projects', description: 'Contact IT Outsource for managed IT, infrastructure, consulting, Microsoft cloud, security, backup and business platform projects.', priority: '0.8', changefreq: 'monthly', type: 'website' },
  '/legal/privacy': { title: 'Privacy Policy — IT Outsource Ltd.', description: 'Privacy information for IT Outsource Ltd. website visitors and business contacts.', priority: '0.3', changefreq: 'yearly', type: 'website' },
  '/legal/terms': { title: 'Terms — IT Outsource Ltd.', description: 'Website terms and legal information for IT Outsource Ltd.', priority: '0.3', changefreq: 'yearly', type: 'website' }
}

const routeLabels = {
  '/': 'Home', '/it-support-services': 'IT Support Services', '/it-infrastructure-services': 'IT Infrastructure Services', '/it-consulting-services': 'IT Consulting Services', '/solutions': 'Solutions', '/how-we-deliver': 'How We Deliver', '/industries': 'Industries', '/insights': 'Insights', '/about': 'About', '/contacts': 'Contact', '/legal/privacy': 'Privacy Policy', '/legal/terms': 'Terms'
}

function escapeAttr(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function escapeText(value) {
  return String(value).replaceAll('&', '&amp;').replaceAll('<', '&lt;')
}

function readableLabel(route) {
  if (routeLabels[route]) return routeLabels[route]
  return routeMeta[route]?.title.replace(/ — .+$/, '').replace(/ \| .+$/, '') || route.split('/').filter(Boolean).pop().split('-').map((p) => p.charAt(0).toUpperCase() + p.slice(1)).join(' ')
}

function breadcrumbFor(route) {
  const parts = route.split('/').filter(Boolean)
  const items = [{ '@type': 'ListItem', position: 1, name: 'Home', item: origin }]
  let current = ''
  parts.forEach((part, index) => {
    current += `/${part}`
    items.push({ '@type': 'ListItem', position: index + 2, name: index === parts.length - 1 ? readableLabel(route) : readableLabel(current), item: `${origin}${current}` })
  })
  return { '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items }
}

function organizationSchema() {
  return {
    '@context': 'https://schema.org', '@type': ['Organization', 'LocalBusiness'], '@id': `${origin}/#organization`,
    name: 'IT Outsource Ltd.', alternateName: 'Ай Ти Аутсорс ООД', url: origin, logo: `${origin}/favicon.png`, image: ogImage,
    email: 'info@itoutsource.bg', telephone: '+359887940248', vatID: 'BG200776949', priceRange: '$$',
    address: { '@type': 'PostalAddress', streetAddress: '25 Popova Shapka St., floor 2, apt. 6', addressLocality: 'Sofia', postalCode: '1505', addressCountry: 'BG' },
    areaServed: [{ '@type': 'Country', name: 'Bulgaria' }, { '@type': 'Place', name: 'European Union' }]
  }
}

function websiteSchema(route, data) {
  return { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${origin}/#website`, name: siteName, url: origin, publisher: { '@id': `${origin}/#organization` }, inLanguage: 'en', potentialAction: { '@type': 'ContactAction', target: `${origin}/contacts`, name: 'Book a consultation' } }
}

function pageSchema(route, data) {
  const schemaType = data.type === 'article' ? 'Article' : 'WebPage'
  return { '@context': 'https://schema.org', '@type': schemaType, '@id': `${origin}${route}#webpage`, url: `${origin}${route}`, name: data.title, headline: data.title, description: data.description, image: ogImage, isPartOf: { '@id': `${origin}/#website` }, publisher: { '@id': `${origin}/#organization` }, inLanguage: 'en', dateModified: today }
}

function serviceSchema(route, data) {
  if (data.type !== 'service') return null
  return { '@context': 'https://schema.org', '@type': 'Service', '@id': `${origin}${route}#service`, name: readableLabel(route), description: data.description, provider: { '@id': `${origin}/#organization` }, areaServed: ['Bulgaria', 'European Union'], serviceType: readableLabel(route), url: `${origin}${route}` }
}

function jsonLdTags(route, data) {
  return [organizationSchema(), websiteSchema(route, data), pageSchema(route, data), breadcrumbFor(route), serviceSchema(route, data)]
    .filter(Boolean)
    .map((payload) => `<script type="application/ld+json">${JSON.stringify(payload).replaceAll('<', '\\u003c')}</script>`)
    .join('\n    ')
}

function headTags(route, data) {
  const url = `${origin}${route}`
  const title = data.title.includes('IT Outsource') ? data.title : `${data.title} | ${siteName}`
  return `
    <title>${escapeText(title)}</title>
    <meta name="description" content="${escapeAttr(data.description)}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <meta name="theme-color" content="#07111F">
    <link rel="canonical" href="${url}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(data.description)}">
    <meta property="og:type" content="${data.type === 'article' ? 'article' : 'website'}">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="${siteName}">
    <meta property="og:locale" content="en_US">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:secure_url" content="${ogImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="${escapeAttr(title)}">
    <meta name="twitter:description" content="${escapeAttr(data.description)}">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">
    ${jsonLdTags(route, data)}`
}

function stripDynamicSeo(html) {
  return html
    .replace(/<title>.*?<\/title>/i, '')
    .replace(/\s*<meta name="(?:description|robots|theme-color)"[^>]*>/gi, '')
    .replace(/\s*<link rel="canonical"[^>]*>/gi, '')
    .replace(/\s*<meta (?:property|name)="(?:og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
    .replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, '')
}

function writeRoute(route, html) {
  if (route === '/') {
    writeFileSync(join(distDir, 'index.html'), html)
    return
  }
  const outDir = join(distDir, route.replace(/^\//, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

function writeSitemap() {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${Object.entries(routeMeta).map(([route, data]) => `  <url><loc>${origin}${route}</loc><lastmod>${today}</lastmod><changefreq>${data.changefreq}</changefreq><priority>${data.priority}</priority></url>`).join('\n')}\n</urlset>\n`
  writeFileSync(join(distDir, 'sitemap.xml'), xml)
}

function writeRobots() {
  writeFileSync(join(distDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`)
}

for (const [route, data] of Object.entries(routeMeta)) {
  const html = stripDynamicSeo(baseHtml).replace('</head>', `${headTags(route, data)}\n  </head>`)
  writeRoute(route, html)
  console.log(`[prerender] ${route}`)
}

writeSitemap()
writeRobots()
console.log('[seo] sitemap.xml')
console.log('[seo] robots.txt')
