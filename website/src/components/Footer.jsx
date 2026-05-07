import { Link } from 'react-router-dom'
import { useContent } from '../content/index.jsx'
import brandBanner from '../assets/brand-banner-600.jpg'

const legal = {
  en: {
    companyTitle: 'Company',
    servicesTitle: 'Services',
    solutionsTitle: 'Solutions',
    trustTitle: 'Legal & Trust',
    howWeDeliver: 'How we deliver',
    industries: 'Industries',
    insights: 'Insights',
    privacy: 'Privacy',
    terms: 'Terms',
    trustEyebrow: 'Trust posture',
    trustLine: 'Built around Microsoft cloud operations, ISO 27001:2022-aligned governance, GDPR-aware delivery, and proven backup / virtualization ecosystems.',
    registered: 'Registered company',
    address: 'Bulgaria, Sofia 1505, Poduyane, 25 Popova Shapka St., floor 2, apt. 6',
    response: 'Typical response: within 1 business day.'
  },
  bg: {
    companyTitle: 'Компания',
    servicesTitle: 'Услуги',
    solutionsTitle: 'Решения',
    trustTitle: 'Правна информация и доверие',
    howWeDeliver: 'Как работим',
    industries: 'Индустрии',
    insights: 'Материали',
    privacy: 'Поверителност',
    terms: 'Условия',
    trustEyebrow: 'Позиция на доверие',
    trustLine: 'Изградено около Microsoft cloud операции, ISO 27001:2022-aligned управление, GDPR-aware доставка и доказани backup / virtualization екосистеми.',
    registered: 'Регистрирана компания',
    address: 'България, София 1505, р-н Подуяне, ул. Попова шапка 25, ет. 2, ап. 6',
    response: 'Типично време за отговор: до 1 работен ден.'
  }
}

const solutionLinks = [
  ['Microsoft Azure', '/solutions/microsoft-azure'],
  ['Microsoft 365', '/solutions/microsoft-365'],
  ['Zero Trust Security', '/solutions/zero-trust-security'],
  ['Backup & DR', '/solutions/backup-dr-veeam']
]

const trustItems = ['Microsoft cloud', 'ISO 27001:2022 aligned', 'Veeam ecosystem', 'VMware / Proxmox', 'ABM aware', 'GDPR-aware delivery']

function FooterLink({ to, children }) {
  return (
    <Link className="text-[#94A3B8] transition hover:text-[#FFFFFF]" to={to}>
      {children}
    </Link>
  )
}

export default function Footer() {
  const { content, lang } = useContent()
  const ui = content.shared.ui
  const l = legal[lang] || legal.en

  return (
    <footer className="relative z-20 border-t border-white/[0.12] bg-[#0B1726] backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-3xl border border-white/[0.12] bg-[#101E31] p-5 shadow-[0_18px_70px_-48px_rgba(0,0,0,0.55)] md:p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">{l.trustEyebrow}</div>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-[#CBD5E1]">{l.trustLine}</p>
            </div>
            <Link to="/how-we-deliver" className="text-sm font-semibold text-[#FFFFFF] underline decoration-[#2563EB]/40 underline-offset-4 hover:decoration-[#2563EB]">
              {l.howWeDeliver}
            </Link>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-6">
            {trustItems.map((item) => (
              <div key={item} className="rounded-2xl border border-white/[0.12] bg-[#0B1726] px-4 py-3 text-sm font-semibold text-[#FFFFFF]">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-4">
          <div>
            <img
              src={brandBanner}
              alt="IT Outsource Ltd. — Enterprise IT, Cloud, Operations"
              width="600"
              height="160"
              className="w-full max-w-[260px] rounded-2xl border border-white/[0.12] bg-[#07111F] object-contain"
              loading="lazy"
              decoding="async"
            />
            <div className="mt-4 text-sm font-semibold">IT Outsource Ltd.</div>
            <p className="mt-2 text-sm leading-relaxed text-[#94A3B8]">{content.shared.tagline}</p>
            <div className="mt-4 space-y-1 text-xs leading-relaxed text-[#CBD5E1]">
              <div>{l.registered}: Ай Ти Аутсорс ООД</div>
              <div>EIK: 200776949 · VAT: BG200776949</div>
              <div>{l.address}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{l.companyTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/about">{ui.about}</FooterLink>
              <FooterLink to="/how-we-deliver">{l.howWeDeliver}</FooterLink>
              <FooterLink to="/industries">{l.industries}</FooterLink>
              <FooterLink to="/insights">{l.insights}</FooterLink>
              <FooterLink to="/contacts">{ui.contact}</FooterLink>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{l.servicesTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/it-support-services">{ui.support}</FooterLink>
              <FooterLink to="/it-infrastructure-services">{ui.infrastructure}</FooterLink>
              <FooterLink to="/it-consulting-services">{ui.consulting}</FooterLink>
              <FooterLink to="/solutions">{ui.solutions}</FooterLink>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{l.solutionsTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              {solutionLinks.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}
            </div>
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-[#94A3B8]">{l.trustTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/legal/privacy">{l.privacy}</FooterLink>
              <FooterLink to="/legal/terms">{l.terms}</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/[0.12] pt-5 text-xs text-[#94A3B8] md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} IT Outsource Ltd. / Ай Ти Аутсорс ООД</div>
          <div>{l.response}</div>
        </div>
      </div>
    </footer>
  )
}
