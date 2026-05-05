import { Link } from 'react-router-dom'
import { useContent } from '../content/index.jsx'

const footerCopy = {
  en: {
    companyDescription: 'IT Outsource helps companies design, secure, migrate and manage Microsoft 365, Azure, endpoint, backup and disaster recovery environments with clear technical ownership.',
    servicesTitle: 'Main services',
    companyTitle: 'Company',
    contactTitle: 'Contact',
    legalTitle: 'Legal',
    privacy: 'Privacy Policy',
    terms: 'Terms',
    response: 'Typical response: within 1 business day.',
    cta: 'Request IT Assessment',
    services: [
      ['Managed IT Services', '/managed-it-support'],
      ['Microsoft 365', '/microsoft-365'],
      ['Azure & Infrastructure', '/azure-cloud'],
      ['Cybersecurity', '/cybersecurity'],
      ['Backup & Disaster Recovery', '/backup-disaster-recovery']
    ],
    company: [
      ['Case Studies', '/case-studies'],
      ['About', '/about'],
      ['How we deliver', '/how-we-deliver'],
      ['Contact', '/contacts']
    ],
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    addressLabel: 'Registered office',
    address: 'Sofia 1505, Poduyane, 25 Popova Shapka St., floor 2, apt. 6, Bulgaria',
    legalIdentity: 'IT Outsource Ltd. / Ай Ти Аутсорс ООД · EIK 200776949 · VAT BG200776949',
    trustLine: 'Microsoft cloud operations, ISO 27001:2022-aligned governance, GDPR-aware delivery and proven backup / virtualization ecosystems.'
  },
  bg: {
    companyDescription: 'Ай Ти Аутсорс помага на компании да проектират, защитават, мигрират и управляват Microsoft 365, Azure, endpoint, backup и disaster recovery среди с ясна техническа отговорност.',
    servicesTitle: 'Основни услуги',
    companyTitle: 'Компания',
    contactTitle: 'Контакти',
    legalTitle: 'Правна информация',
    privacy: 'Политика за поверителност',
    terms: 'Условия',
    response: 'Типично време за отговор: до 1 работен ден.',
    cta: 'Заявете ИТ оценка',
    services: [
      ['Managed IT услуги', '/managed-it-support'],
      ['Microsoft 365', '/microsoft-365'],
      ['Azure и инфраструктура', '/azure-cloud'],
      ['Киберсигурност', '/cybersecurity'],
      ['Backup и Disaster Recovery', '/backup-disaster-recovery']
    ],
    company: [
      ['Казуси', '/case-studies'],
      ['За нас', '/about'],
      ['Как работим', '/how-we-deliver'],
      ['Контакти', '/contacts']
    ],
    emailLabel: 'Имейл',
    phoneLabel: 'Телефон',
    addressLabel: 'Седалище',
    address: 'София 1505, р-н Подуяне, ул. Попова шапка 25, ет. 2, ап. 6, България',
    legalIdentity: 'Ай Ти Аутсорс ООД / IT Outsource Ltd. · ЕИК 200776949 · ДДС BG200776949',
    trustLine: 'Microsoft cloud операции, ISO 27001:2022-aligned governance, GDPR-aware доставка и доказани backup / virtualization екосистеми.'
  }
}

const email = 'info@itoutsource.bg'
const phoneDisplay = '+359 887 940 248'
const phoneHref = '+359887940248'

function FooterLink({ to, children }) {
  const { localizedPath } = useContent()
  return (
    <Link className="text-ink-900/64 transition hover:text-ink-950" to={localizedPath(to)}>
      {children}
    </Link>
  )
}

export default function Footer() {
  const { lang, localizedPath } = useContent()
  const copy = footerCopy[lang] || footerCopy.en

  return (
    <footer className="relative z-20 border-t border-black/10 bg-white/88 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-4 py-10 md:py-12">
        <div className="rounded-3xl border border-black/10 bg-white/78 p-5 shadow-[0_18px_70px_-48px_rgba(0,0,0,0.55)] md:p-7">
          <div className="grid gap-8 lg:grid-cols-[1.4fr_0.9fr_0.9fr_1.05fr]">
            <div>
              <div className="text-sm font-semibold text-ink-950">IT Outsource Ltd.</div>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-900/68">{copy.companyDescription}</p>
              <p className="mt-4 rounded-2xl border border-brand-300/30 bg-brand-200/24 px-4 py-3 text-xs leading-relaxed text-ink-900/72">
                {copy.trustLine}
              </p>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">{copy.servicesTitle}</div>
              <div className="mt-4 grid gap-3 text-sm">
                {copy.services.map(([label, to]) => <FooterLink key={to} to={to}>{label}</FooterLink>)}
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">{copy.companyTitle}</div>
              <div className="mt-4 grid gap-3 text-sm">
                {copy.company.map(([label, to]) => <FooterLink key={to} to={to}>{label}</FooterLink>)}
              </div>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">{copy.legalTitle}</div>
              <div className="mt-4 grid gap-3 text-sm">
                <FooterLink to="/legal/privacy">{copy.privacy}</FooterLink>
                <FooterLink to="/legal/terms">{copy.terms}</FooterLink>
              </div>
            </div>

            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-ink-900/65">{copy.contactTitle}</div>
              <div className="mt-4 space-y-3 text-sm text-ink-900/68">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/45">{copy.emailLabel}</div>
                  <a className="mt-1 inline-block text-ink-950 underline decoration-brand-500/35 underline-offset-4 hover:decoration-brand-500" href={`mailto:${email}`}>{email}</a>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/45">{copy.phoneLabel}</div>
                  <a className="mt-1 inline-block text-ink-950 underline decoration-brand-500/35 underline-offset-4 hover:decoration-brand-500" href={`tel:${phoneHref}`}>{phoneDisplay}</a>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.16em] text-ink-900/45">{copy.addressLabel}</div>
                  <div className="mt-1 leading-relaxed">{copy.address}</div>
                </div>
              </div>
              <Link to={localizedPath('/contacts')} className="mt-5 inline-flex rounded-full bg-navy-950 px-4 py-2 text-sm font-semibold text-white transition hover:bg-navy-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400/70">
                {copy.cta}
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-black/10 pt-5 text-xs leading-relaxed text-ink-900/62 md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} IT Outsource Ltd. / Ай Ти Аутсорс ООД. {copy.legalIdentity}</div>
          <div>{copy.response}</div>
        </div>
      </div>
    </footer>
  )
}
