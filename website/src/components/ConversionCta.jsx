import SheenButton from './SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const copy = {
  en: {
    quote: 'Get a quote',
    discovery: 'Book a 30-min call',
    defaultTitle: 'Ready to discuss the next step?',
    defaultLead: 'Tell us what downtime, identity, endpoint, backup or compliance risk you need to reduce. We will respond with a practical next step.',
    supportTitle: 'Need a support model with clear SLAs?',
    supportLead: 'Share your current environment and required coverage. We can prepare an SLA-oriented proposal.',
    supportSecondary: 'Request an SLA proposal',
    consultingTitle: 'Planning a complex change?',
    consultingLead: 'We can review the architecture, risks and options before the project becomes expensive to change.',
    consultingSecondary: 'Request a 1-page architecture review',
    solutionsTitle: 'Want to turn this into a scoped project?',
    solutionsLead: 'Choose the area — Microsoft 365, Azure, identity, endpoint, backup or recovery — and we will map the delivery path.',
    infrastructureTitle: 'Need resilient infrastructure without operational chaos?',
    infrastructureLead: 'We can assess the current state and define a secure, supportable target architecture.'
  },
  bg: {
    quote: 'Запитване',
    discovery: 'Запазете 30-минутен разговор',
    defaultTitle: 'Готови ли сте за следваща стъпка?',
    defaultLead: 'Опишете какво искате да модернизирате, защитите или управлявате. Ще върнем практичен next step.',
    supportTitle: 'Нужен ли е модел за поддръжка с ясни SLA?',
    supportLead: 'Споделете средата и необходимото покритие. Можем да подготвим SLA-ориентирано предложение.',
    supportSecondary: 'Запазете 30-минутен разговор',
    consultingTitle: 'Планирате сложна промяна?',
    consultingLead: 'Можем да прегледаме архитектурата, рисковете и опциите преди проектът да стане скъп за промяна.',
    consultingSecondary: 'Запазете 30-минутен разговор',
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
    <section className="bg-[#07111F] py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-[#101E2F] p-6 shadow-[0_22px_90px_-60px_rgba(0,0,0,0.75)] md:p-8">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Next step</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">
                {title || l[titleKey]}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
                {lead || l[leadKey]}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <SheenButton to="/contacts">{l.quote}</SheenButton>
              <a
                href={BOOKING_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-[#101E2F] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:bg-[#0B1B2B]"
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
