import SheenButton from './SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const copy = {
  en: {
    quote: 'Request IT Assessment',
    discovery: 'Book a Consultation',
    defaultTitle: 'Ready to assess your Microsoft cloud and security posture?',
    defaultLead: 'Share the environment, risk or migration challenge. We will respond with a practical assessment path and next-step ownership.',
    supportTitle: 'Need a support model with clear SLAs?',
    supportLead: 'Share your current environment and required coverage. We can prepare an SLA-oriented proposal.',
    supportSecondary: 'Request an SLA proposal',
    consultingTitle: 'Planning a complex change?',
    consultingLead: 'We can review the architecture, risks and options before the project becomes expensive to change.',
    consultingSecondary: 'Request a 1-page architecture review',
    solutionsTitle: 'Turn the right solution area into a scoped project',
    solutionsLead: 'Choose the cloud, security, migration or backup area and we will map the path: assess, design, implement and operate.',
    infrastructureTitle: 'Need resilient infrastructure without operational chaos?',
    infrastructureLead: 'We can assess the current state and define a secure, supportable target architecture.'
  },
  bg: {
    quote: 'Заявете ИТ оценка',
    discovery: 'Запазете консултация',
    defaultTitle: 'Готови ли сте за следваща стъпка?',
    defaultLead: 'Опишете какво искате да модернизирате, защитите или управлявате. Ще върнем практичен next step.',
    supportTitle: 'Нужен ли е модел за поддръжка с ясни SLA?',
    supportLead: 'Споделете средата и необходимото покритие. Можем да подготвим SLA-ориентирано предложение.',
    supportSecondary: 'Запазете консултация',
    consultingTitle: 'Планирате сложна промяна?',
    consultingLead: 'Можем да прегледаме архитектурата, рисковете и опциите преди проектът да стане скъп за промяна.',
    consultingSecondary: 'Запазете консултация',
    solutionsTitle: 'Искате да превърнем това в конкретен проект?',
    solutionsLead: 'Изберете solution area и ще начертаем пътя: assess, design, implement и operate.',
    infrastructureTitle: 'Нужна ли е устойчива инфраструктура без operational chaos?',
    infrastructureLead: 'Можем да оценим текущото състояние и да дефинираме сигурна, поддържаема target architecture.'
  }
}

const variantDefaults = {
  default: ['defaultTitle', 'defaultLead', 'discovery'],
  support: ['supportTitle', 'supportLead', 'discovery'],
  consulting: ['consultingTitle', 'consultingLead', 'discovery'],
  solutions: ['solutionsTitle', 'solutionsLead', 'discovery'],
  infrastructure: ['infrastructureTitle', 'infrastructureLead', 'discovery']
}

export default function ConversionCta({ variant = 'default', title, lead, secondaryLabel }) {
  const { lang } = useContent()
  const l = copy[lang] || copy.en
  const [titleKey, leadKey, secondaryKey] = variantDefaults[variant] || variantDefaults.default

  return (
    <section className="py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-black/10 bg-white/78 p-6 shadow-[0_22px_90px_-60px_rgba(0,0,0,0.75)] backdrop-blur md:p-8">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-navy-950 via-navy-900 to-brand-900" />
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_82%_20%,rgba(34,195,246,0.25),transparent_34%),radial-gradient(circle_at_10%_80%,rgba(120,212,255,0.16),transparent_32%)]" />
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-brand-200">Next step</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white md:text-3xl">
                {title || l[titleKey]}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/72 md:text-base">
                {lead || l[leadKey]}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <SheenButton to="/contacts">{l.quote}</SheenButton>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/80"
              >
                {secondaryLabel || l[secondaryKey]}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
