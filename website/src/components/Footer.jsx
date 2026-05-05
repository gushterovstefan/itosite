import { Link } from 'react-router-dom'
import { useContent } from '../content/index.jsx'

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
    trustLine: 'Microsoft cloud, ISO 27001:2022-aligned governance, GDPR-aware delivery.',
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
    trustLine: 'Microsoft cloud, ISO 27001:2022-aligned governance и GDPR-aware доставка.',
    registered: 'Регистрирана компания',
    address: 'България, София 1505, р-н Подуяне, ул. Попова шапка 25, ет. 2, ап. 6',
    response: 'Типично време за отговор: до 1 работен ден.'
  }
}

const solutionLinks = [
  ['Microsoft Azure', '/solutions'],
  ['Microsoft 365', '/solutions'],
  ['Zero Trust Security', '/solutions'],
  ['Backup & DR', '/solutions']
]

function FooterLink({ to, children }) {
  return (
    <Link className="text-ink-900/60 transition hover:text-ink-950" to={to}>
      {children}
    </Link>
  )
}

export default function Footer() {
  const { content, lang } = useContent()
  const ui = content.shared.ui
  const l = legal[lang] || legal.en

  return (
    <footer className="relative z-20 border-t border-black/10 bg-white/82 backdrop-blur-xl">
      <div className="mx-auto max-w-6xl px-4 py-10 md:py-12">
        <div className="rounded-3xl border border-black/10 bg-white/70 p-5 shadow-[0_18px_70px_-48px_rgba(0,0,0,0.55)] md:p-6">
          <div className="grid gap-4 md:grid-cols-3">
            {['Microsoft cloud', 'ISO 27001:2022 aligned', 'GDPR-aware delivery'].map((item) => (
              <div key={item} className="rounded-2xl border border-black/10 bg-brand-200/25 px-4 py-3 text-sm font-semibold text-ink-950">
                {item}
              </div>
            ))}
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-900/65">{l.trustLine}</p>
        </div>

        <div className="mt-10 grid gap-8 md:grid-cols-4">
          <div>
            <div className="text-sm font-semibold">IT Outsource Ltd.</div>
            <p className="mt-2 text-sm leading-relaxed text-ink-900/60">{content.shared.tagline}</p>
            <div className="mt-4 space-y-1 text-xs leading-relaxed text-ink-900/55">
              <div>{l.registered}: Ай Ти Аутсорс ООД</div>
              <div>EIK: 200776949 · VAT: BG200776949</div>
              <div>{l.address}</div>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/45">{l.companyTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/about">{ui.about}</FooterLink>
              <FooterLink to="/how-we-deliver">{l.howWeDeliver}</FooterLink>
              <FooterLink to="/industries">{l.industries}</FooterLink>
              <FooterLink to="/contacts">{ui.contact}</FooterLink>
              <span className="text-ink-900/35">{l.insights}</span>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/45">{l.servicesTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/it-support-services">{ui.support}</FooterLink>
              <FooterLink to="/it-infrastructure-services">{ui.infrastructure}</FooterLink>
              <FooterLink to="/it-consulting-services">{ui.consulting}</FooterLink>
              <FooterLink to="/solutions">{ui.solutions}</FooterLink>
            </div>
          </div>

          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/45">{l.solutionsTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              {solutionLinks.map(([label, to]) => <FooterLink key={label} to={to}>{label}</FooterLink>)}
            </div>
            <div className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/45">{l.trustTitle}</div>
            <div className="mt-4 grid gap-3 text-sm">
              <FooterLink to="/legal/privacy">{l.privacy}</FooterLink>
              <FooterLink to="/legal/terms">{l.terms}</FooterLink>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-black/10 pt-5 text-xs text-ink-900/45 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} IT Outsource Ltd. / Ай Ти Аутсорс ООД</div>
          <div>{l.response}</div>
        </div>
      </div>
    </footer>
  )
}
