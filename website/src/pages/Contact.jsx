import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const formCopy = {
  en: {
    asideTitle: 'Let’s talk',
    asideLead: 'Reach us by phone, email, or send a short project brief.',
    response: 'Within 1 business day',
    timezone: 'EET / Sofia',
    discovery: '30-minute discovery call',
    discoveryLead: 'Book directly through Microsoft Bookings, or send a short project brief if you prefer email first.',
    formEyebrow: 'Project enquiry',
    formTitle: 'Tell us what you need',
    formLead: 'Use the form below for support, infrastructure, consulting, Microsoft cloud, security, backup or web-platform projects.',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    topic: 'Project type',
    message: 'Brief project context',
    fileNote: 'Need to send files? Submit the form, then attach them in your email client before sending.',
    submit: 'Prepare email enquiry',
    bookingTitle: 'Discovery call',
    bookingLead: 'Use our Microsoft Bookings page to choose an available time for a 30-minute discovery call.',
    bookingCta: 'Book a 30-min call',
    responseNote: 'Typical response time: within 1 business day.'
  },
  bg: {
    asideTitle: 'Нека поговорим',
    asideLead: 'Свържете се по телефон, имейл или изпратете кратко описание на проекта.',
    response: 'До 1 работен ден',
    timezone: 'EET / София',
    discovery: '30-минутен разговор',
    discoveryLead: 'Запазете час директно през Microsoft Bookings или изпратете кратко описание, ако предпочитате първо имейл.',
    formEyebrow: 'Запитване за проект',
    formTitle: 'Опишете какво ви трябва',
    formLead: 'Формата е подходяща за поддръжка, инфраструктура, консултации, Microsoft cloud, сигурност, backup или web-platform проекти.',
    name: 'Име',
    company: 'Компания',
    email: 'Имейл',
    phone: 'Телефон',
    topic: 'Тип проект',
    message: 'Кратък контекст',
    fileNote: 'Имате файлове? Изпратете формата и ги прикачете в имейл клиента преди изпращане.',
    submit: 'Подгответе имейл запитване',
    bookingTitle: 'Discovery разговор',
    bookingLead: 'Използвайте нашата Microsoft Bookings страница, за да изберете удобен час за 30-минутен discovery разговор.',
    bookingCta: 'Запазете час в Microsoft Bookings',
    responseNote: 'Типично време за отговор: до 1 работен ден.'
  }
}

export default function Contact() {
  const { content, lang } = useContent()
  const c = content.contact
  const ui = content.shared.ui
  const f = formCopy[lang] || formCopy.en

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      `${f.name}: ${data.get('name') || ''}`,
      `${f.company}: ${data.get('company') || ''}`,
      `${f.email}: ${data.get('email') || ''}`,
      `${f.phone}: ${data.get('phone') || ''}`,
      `${f.topic}: ${data.get('topic') || ''}`,
      '',
      `${f.message}:`,
      data.get('message') || ''
    ].join('\n')

    const subject = encodeURIComponent(`IT Outsource enquiry — ${data.get('company') || data.get('name') || 'Website'}`)
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <div>
      <PageHero
        eyebrow={ui.contact}
        title={c.title}
        lead={c.lead}
        subline={f.responseNote}
        primaryCta={{ to: '/contacts', label: ui.getQuote ?? ui.contact }}
        secondaryCta={{ to: '/solutions', label: ui.solutions }}
        aside={{
          eyebrow: 'Contact',
          title: f.asideTitle,
          lead: f.asideLead,
          icon: 'message',
          items: [
            { k: 'Response', v: f.response },
            { k: 'Support', v: '24/7' },
            { k: 'Time zone', v: f.timezone }
          ]
        }}
      />

      <GemSection eyebrow={ui.contact} title={c.title} lead={c.lead}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.phoneLabel}</div>
              <Icon as={icons.phone} />
            </div>
            <div className="mt-2 text-sm text-[#CBD5E1]">{c.phone}</div>
          </Card>
          <Card revealDelay={0.10}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{ui.emailLabel}</div>
              <Icon as={icons.mail} />
            </div>
            <div className="mt-2 text-sm text-[#CBD5E1]">{c.email}</div>
          </Card>
          <Card revealDelay={0.16} variant="brand" badge="Discovery">
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{f.discovery}</div>
              <Icon as={icons.message} />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{f.discoveryLead}</p>
          </Card>
        </div>
      </GemSection>

      <GemSection eyebrow={f.formEyebrow} title={f.formTitle} lead={f.formLead}>
        <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
          <Card revealDelay={0.04}>
            <form className="grid gap-3" onSubmit={handleSubmit}>
              <div className="grid gap-3 md:grid-cols-2">
                <input name="name" required className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8]" placeholder={f.name} />
                <input name="company" className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8]" placeholder={f.company} />
                <input name="email" required type="email" className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8]" placeholder={f.email} />
                <input name="phone" className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8]" placeholder={f.phone} />
              </div>
              <select name="topic" aria-label={f.topic} className="rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none focus:border-[#38BDF8]" defaultValue="">
                <option value="" disabled>{f.topic}</option>
                <option>Managed IT support</option>
                <option>Infrastructure / virtualization</option>
                <option>Microsoft cloud / M365</option>
                <option>Security / compliance</option>
                <option>Backup / DR</option>
                <option>Web platform</option>
              </select>
              <textarea name="message" required className="min-h-36 rounded-xl border border-white/[0.12] bg-[#101E2F] px-4 py-3 text-sm text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8]" placeholder={f.message} />
              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs leading-relaxed text-[#CBD5E1]">{f.fileNote}</p>
                <button type="submit" className="btn-sheen btn-primary rounded-full bg-[#2F80ED] px-6 py-3 text-sm font-semibold text-[#F8FAFC] ring-1 ring-[#38BDF8]/40 hover:bg-[#2F80ED]">
                  <span className="sheen" aria-hidden="true" />
                  <span>{f.submit}</span>
                </button>
              </div>
            </form>
          </Card>

          <Card revealDelay={0.10} variant="steel" badge="Booking">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-sm font-semibold">{f.bookingTitle}</div>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{f.bookingLead}</p>
              </div>
              <Icon as={icons.calendar ?? icons.message} />
            </div>
            <div className="mt-5">
              <SheenButton href={BOOKING_URL} target="_blank" rel="noreferrer">{f.bookingCta}</SheenButton>
            </div>
          </Card>
        </div>
      </GemSection>
    </div>
  )
}
