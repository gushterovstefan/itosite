import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = new URL('../dist/', import.meta.url).pathname
const origin = 'https://itoutsource.bg'
const ogImage = `${origin}/og-image.png`
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')

const routeMeta = {
  '/': ['IT Outsource Ltd. — Managed IT, Cloud & Security Services', 'IT Outsource designs, builds, secures and operates enterprise IT environments across support, infrastructure, consulting and cloud solutions.'],
  '/it-support-services': ['IT Support Services — IT Outsource Ltd.', 'SLA-driven managed IT support, service desk, endpoint management, remote and on-site support for business-critical operations.'],
  '/it-infrastructure-services': ['IT Infrastructure Services — IT Outsource Ltd.', 'Hybrid infrastructure, virtualization, networking, backup, DR and secure platform operations for resilient business systems.'],
  '/it-consulting-services': ['IT Consulting Services — IT Outsource Ltd.', 'Enterprise architecture, cloud migration, security governance, ERP integration and technical due diligence for IT change.'],
  '/solutions': ['IT Solutions — Azure, Microsoft 365, Security, Backup & DR', 'Production-ready solutions across Microsoft Azure, Microsoft 365, Zero Trust security, Entra ID, Veeam backup, cloud migration and web platforms.'],
  '/solutions/microsoft-azure': ['Microsoft Azure Solutions — IT Outsource Ltd.', 'Azure infrastructure design, secure networking, monitoring, governance, cost control and operational runbooks.'],
  '/solutions/microsoft-365': ['Microsoft 365 Solutions — IT Outsource Ltd.', 'Microsoft 365 collaboration, Teams, SharePoint, Exchange, Entra, Intune and Defender governance for modern workplace operations.'],
  '/solutions/vmware-proxmox-virtualization': ['VMware & Proxmox Virtualization — IT Outsource Ltd.', 'Virtualization assessment, design, migration and operations for VMware and Proxmox private infrastructure.'],
  '/solutions/azure-hybrid-cloud': ['Azure Hybrid Cloud Integration — IT Outsource Ltd.', 'Hybrid cloud integration across on-prem VMware or Proxmox and Azure for secure connectivity, monitoring and disaster recovery.'],
  '/solutions/zero-trust-security': ['Zero Trust Security with Defender & Sentinel — IT Outsource Ltd.', 'Microsoft Defender XDR and Sentinel security delivery across endpoints, identities and cloud workloads with incident response and governance.'],
  '/solutions/entra-id-sso': ['Entra ID & SSO Consolidation — IT Outsource Ltd.', 'Single sign-on, Conditional Access, MFA and audit trail consolidation for SaaS and business applications using Microsoft Entra ID.'],
  '/solutions/backup-dr-veeam': ['Backup & DR with Veeam — IT Outsource Ltd.', '3-2-1 backup strategy, immutable repositories and tested recovery for VMware, Hyper-V, Microsoft 365 and physical workloads.'],
  '/solutions/cloud-migration': ['Cloud Migration Services — IT Outsource Ltd.', 'Phased Google Workspace to Microsoft 365 migration for mail, files and identity with clear runbooks and minimal downtime.'],
  '/solutions/web-b2b-b2c': ['Web-Based B2B & B2C Solutions — IT Outsource Ltd.', 'Custom ERP-integrated web platforms and business portals for B2B and B2C workflows, automation and operational handover.'],
  '/solutions/easy-order-platform': ['Easy Order Web Platform — IT Outsource Ltd.', 'Integrated order-process platform connecting customers, manufacturers, warehouses and distributors with automated data flow.'],
  '/solutions/gxp-clinical-research-it': ['GxP & Clinical Research IT — IT Outsource Ltd.', 'Validated, audit-ready IT environments for CRO, clinical research and regulated life-sciences teams with CSV and GAMP 5 aligned delivery.'],
  '/how-we-deliver': ['How We Deliver — IT Outsource Ltd.', 'A phased IT delivery methodology: Discover, Design, Migrate or Build, Operate and Optimize with clear gates, owners and handover.'],
  '/industries': ['Industries — IT Outsource Ltd.', 'IT delivery for retail, life sciences, energy and professional services with relevant solutions, governance and operational ownership.'],
  '/industries/retail': ['Retail & E-commerce IT Services — IT Outsource Ltd.', 'IT support, infrastructure, identity, backup and web-platform delivery for distributed retail and e-commerce operations.'],
  '/industries/life-sciences': ['Life Sciences & Clinical Research IT — IT Outsource Ltd.', 'Validated, audit-ready IT environments for clinical research and regulated teams with security, governance and recovery planning.'],
  '/industries/energy': ['Energy & Utilities IT Services — IT Outsource Ltd.', 'Microsoft cloud, identity, security and governance delivery for distributed energy and utilities teams.'],
  '/industries/professional-services': ['Professional Services & Mid-Market IT — IT Outsource Ltd.', 'Pragmatic enterprise-grade IT support, SaaS identity, collaboration and modernization for professional services and mid-market companies.'],
  '/insights': ['Insights & IT Playbooks — IT Outsource Ltd.', 'Practical IT playbooks for Microsoft 365 migration, Zero Trust security and tested backup and disaster recovery.'],
  '/insights/google-workspace-to-microsoft-365-migration': ['Google Workspace to Microsoft 365 Migration Playbook — IT Outsource Ltd.', 'A 7-phase practical playbook for migrating mail, files and identity from Google Workspace to Microsoft 365 with minimal downtime.'],
  '/insights/zero-trust-regulated-mid-market': ['Zero Trust for Regulated Mid-Market — IT Outsource Ltd.', 'A practical Zero Trust model using identity, endpoints, Microsoft Defender XDR, Sentinel and governance without enterprise bloat.'],
  '/insights/backup-immutability-tested-dr': ['Backup, Immutability and Tested DR — IT Outsource Ltd.', 'How to make backup useful in real incidents with 3-2-1 strategy, immutable repositories, restore tests and clear RPO/RTO.'],
  '/about': ['About IT Outsource Ltd.', 'Learn about IT Outsource Ltd., a Sofia-based IT services company delivering consulting, infrastructure, support and digital solutions.'],
  '/contacts': ['Contact IT Outsource Ltd.', 'Contact IT Outsource for managed IT, infrastructure, consulting, Microsoft cloud, security, backup and business platform projects.'],
  '/legal/privacy': ['Privacy Policy — IT Outsource Ltd.', 'Privacy information for IT Outsource Ltd. website visitors and business contacts.'],
  '/legal/terms': ['Terms — IT Outsource Ltd.', 'Website terms and legal information for IT Outsource Ltd.']
}

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function headTags(route, title, description) {
  const url = `${origin}${route}`
  return `
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}">
    <link rel="canonical" href="${url}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="IT Outsource Ltd.">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:secure_url" content="${ogImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">`
}

function stripDynamicSeo(html) {
  return html
    .replace(/<title>.*?<\/title>/i, '')
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<link rel="canonical"[^>]*>/i, '')
    .replace(/\s*<meta (?:property|name)="(?:og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
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

for (const [route, [title, description]] of Object.entries(routeMeta)) {
  const html = stripDynamicSeo(baseHtml).replace('</head>', `${headTags(route, title, description)}\n  </head>`)
  writeRoute(route, html)
  console.log(`[prerender] ${route}`)
}
