import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import TrustBlock from '../components/TrustBlock.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const copy = {
  en: {
    headline: 'Let’s Discuss Your IT Environment',
    subheadline: 'Tell us what you need help with — Microsoft 365, Azure, cybersecurity, backup, disaster recovery, migration, or managed IT support.',
    cta: 'Request IT Assessment',
    booking: 'Book a Consultation',
    formTitle: 'Request an IT assessment',
    formLead: 'Share the context. The form prepares a secure email from your email client — no API keys or secrets are exposed in the website frontend.',
    name: 'Name',
    company: 'Company',
    email: 'Email',
    phone: 'Phone',
    companySize: 'Company size',
    mainInterest: 'Main interest',
    message: 'Message',
    consent: 'I agree that IT Outsource Ltd. may process the provided business contact details to respond to this enquiry. I have read the Privacy Policy.',
    submit: 'Prepare secure enquiry',
    spamNote: 'Spam protection: hidden verification field, minimum completion time, browser validation and GDPR consent are required before submission.',
    reassurance: 'We usually respond within one business day.',
    detailsTitle: 'Contact details',
    emailLabel: 'Email',
    phoneLabel: 'Phone',
    locationLabel: 'Company location',
    location: 'Sofia, Bulgaria',
    linkedinUnavailable: 'LinkedIn link: not published yet',
    validation: 'Please complete the required fields and GDPR consent.',
    spamBlocked: 'Submission blocked by spam protection. Please try again.',
    prepared: 'Your email client is opening with the enquiry prepared.',
    sizes: ['1–10 employees', '11–50 employees', '51–200 employees', '201–500 employees', '500+ employees'],
    interests: ['Microsoft 365', 'Azure & Infrastructure', 'Cybersecurity', 'Backup & Disaster Recovery', 'Managed IT Support', 'Google Workspace to Microsoft 365 Migration', 'Other']
  },
  bg: {
    headline: 'Нека обсъдим вашата ИТ среда',
    subheadline: 'Кажете ни с какво имате нужда от помощ — Microsoft 365, Azure, cybersecurity, backup, disaster recovery, migration или managed IT support.',
    cta: 'Заявете ИТ оценка',
    booking: 'Запазете консултация',
    formTitle: 'Заявете ИТ оценка',
    formLead: 'Споделете контекста. Формата подготвя secure email във вашия email client — в frontend кода няма API keys или secrets.',
    name: 'Име',
    company: 'Компания',
    email: 'Имейл',
    phone: 'Телефон',
    companySize: 'Размер на компанията',
    mainInterest: 'Основен интерес',
    message: 'Съобщение',
    consent: 'Съгласен/съгласна съм Ай Ти Аутсорс ООД да обработи предоставените бизнес контактни данни, за да отговори на запитването. Прочетох Политиката за поверителност.',
    submit: 'Подгответе secure enquiry',
    spamNote: 'Spam protection: hidden verification field, minimum completion time, browser validation и GDPR consent са задължителни.',
    reassurance: 'Обикновено отговаряме в рамките на един работен ден.',
    detailsTitle: 'Контактни данни',
    emailLabel: 'Имейл',
    phoneLabel: 'Телефон',
    locationLabel: 'Локация на компанията',
    location: 'София, България',
    linkedinUnavailable: 'LinkedIn link: все още не е публикуван',
    validation: 'Моля, попълнете задължителните полета и GDPR съгласието.',
    spamBlocked: 'Изпращането е блокирано от spam protection. Опитайте отново.',
    prepared: 'Email client-ът се отваря с подготвено запитване.',
    sizes: ['1–10 служители', '11–50 служители', '51–200 служители', '201–500 служители', '500+ служители'],
    interests: ['Microsoft 365', 'Azure & Infrastructure', 'Cybersecurity', 'Backup & Disaster Recovery', 'Managed IT Support', 'Google Workspace to Microsoft 365 Migration', 'Other']
  }
}

const email = 'info@itoutsource.bg'
const phone = '+359 887 940 248'
const phoneHref = '+359887940248'

function Field({ label, children }) {
  return (
    <label className="grid gap-1.5 text-sm font-semibold text-ink-950">
      <span>{label}</span>
      {children}
    </label>
  )
}

const inputClass = 'rounded-xl border border-black/10 bg-white/78 px-4 py-3 text-sm text-ink-950 outline-none placeholder:text-ink-900/45 focus:border-brand-400 focus:ring-2 focus:ring-brand-300/30'

export default function Contact() {
  const { lang, localizedPath } = useContent()
  const c = copy[lang] || copy.en
  const startedAt = useRef(0)
  const [status, setStatus] = useState('')
  const formId = useMemo(() => `contact-${lang}`, [lang])

  useEffect(() => {
    startedAt.current = Date.now()
  }, [])

  function handleSubmit(event) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const elapsed = Date.now() - startedAt.current
    const honey = data.get('website')

    if (honey || elapsed < 2500) {
      setStatus(c.spamBlocked)
      return
    }

    if (!form.checkValidity() || data.get('gdpr') !== 'on') {
      form.reportValidity()
      setStatus(c.validation)
      return
    }

    const body = [
      `${c.name}: ${data.get('name') || ''}`,
      `${c.company}: ${data.get('company') || ''}`,
      `${c.email}: ${data.get('email') || ''}`,
      `${c.phone}: ${data.get('phone') || ''}`,
      `${c.companySize}: ${data.get('companySize') || ''}`,
      `${c.mainInterest}: ${data.get('interest') || ''}`,
      '',
      `${c.message}:`,
      data.get('message') || '',
      '',
      `GDPR consent: ${data.get('gdpr') === 'on' ? 'yes' : 'no'}`
    ].join('\n')

    const subject = encodeURIComponent(`IT assessment request — ${data.get('company') || data.get('name') || 'Website'}`)
    setStatus(c.prepared)
    window.location.href = `mailto:${email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <div>
      <PageHero
        eyebrow="Contact"
        title={c.headline}
        lead={c.subheadline}
        subline={c.reassurance}
        primaryCta={{ to: '/contacts', label: c.cta }}
        secondaryCta={{ href: BOOKING_URL, label: c.booking }}
        aside={{
          eyebrow: 'Response',
          title: c.reassurance,
          lead: lang === 'bg' ? 'Без frontend secrets. Запитването се подготвя през вашия email client.' : 'No frontend secrets. The enquiry is prepared through your email client.',
          icon: 'message',
          items: [
            { k: 'Email', v: email },
            { k: 'Phone', v: phone },
            { k: 'Location', v: c.location }
          ]
        }}
      />

      <GemSection eyebrow="Contact flow" title={c.formTitle} lead={c.formLead}>
        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <Card revealDelay={0.04}>
            <form id={formId} className="grid gap-4" onSubmit={handleSubmit} noValidate={false}>
              <input type="text" name="website" tabIndex="-1" autoComplete="off" className="hidden" aria-hidden="true" />

              <div className="grid gap-4 md:grid-cols-2">
                <Field label={c.name}>
                  <input name="name" required autoComplete="name" className={inputClass} placeholder={c.name} />
                </Field>
                <Field label={c.company}>
                  <input name="company" required autoComplete="organization" className={inputClass} placeholder={c.company} />
                </Field>
                <Field label={c.email}>
                  <input name="email" required type="email" autoComplete="email" className={inputClass} placeholder="name@company.com" />
                </Field>
                <Field label={c.phone}>
                  <input name="phone" type="tel" autoComplete="tel" className={inputClass} placeholder={phone} />
                </Field>
                <Field label={c.companySize}>
                  <select name="companySize" required className={inputClass} defaultValue="">
                    <option value="" disabled>{c.companySize}</option>
                    {c.sizes.map((size) => <option key={size}>{size}</option>)}
                  </select>
                </Field>
                <Field label={c.mainInterest}>
                  <select name="interest" required className={inputClass} defaultValue="">
                    <option value="" disabled>{c.mainInterest}</option>
                    {c.interests.map((interest) => <option key={interest}>{interest}</option>)}
                  </select>
                </Field>
              </div>

              <Field label={c.message}>
                <textarea name="message" required minLength="20" className={`${inputClass} min-h-40`} placeholder={c.subheadline} />
              </Field>

              <label className="flex gap-3 rounded-2xl border border-black/10 bg-white/62 p-4 text-sm leading-relaxed text-ink-900/75">
                <input name="gdpr" required type="checkbox" className="mt-1 h-4 w-4 shrink-0 rounded border-black/20 text-brand-500 focus:ring-brand-400" />
                <span>{c.consent} <Link to={localizedPath('/legal/privacy')} className="font-semibold text-ink-950 underline decoration-brand-500/40 underline-offset-4">Privacy Policy</Link></span>
              </label>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs leading-relaxed text-ink-900/62">{c.spamNote}</p>
                <button type="submit" className="btn-sheen btn-primary rounded-full bg-brand-400 px-6 py-3 text-sm font-semibold text-navy-950 ring-1 ring-brand-200/60 shadow-lg shadow-brand-500/25 transition hover:bg-brand-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300/80">
                  <span className="sheen" aria-hidden="true" />
                  <span>{c.submit}</span>
                </button>
              </div>
              {status ? <p className="text-sm font-semibold text-ink-900/72" role="status">{status}</p> : null}
            </form>
          </Card>

          <div className="grid gap-4">
            <Card revealDelay={0.08} variant="steel" badge={c.detailsTitle}>
              <div className="grid gap-4 text-sm text-ink-900/72">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{c.emailLabel}</div>
                  <a href={`mailto:${email}`} className="mt-1 inline-block font-semibold text-ink-950 underline decoration-brand-500/40 underline-offset-4">{email}</a>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{c.phoneLabel}</div>
                  <a href={`tel:${phoneHref}`} className="mt-1 inline-block font-semibold text-ink-950 underline decoration-brand-500/40 underline-offset-4">{phone}</a>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">{c.locationLabel}</div>
                  <p className="mt-1">{c.location}</p>
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">LinkedIn</div>
                  <p className="mt-1">{c.linkedinUnavailable}</p>
                </div>
              </div>
            </Card>

            <Card revealDelay={0.12} variant="brand" badge="Booking">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-semibold text-ink-950">{c.booking}</div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-900/70">{c.reassurance}</p>
                </div>
                <Icon as={icons.message} />
              </div>
              <div className="mt-5">
                <SheenButton href={BOOKING_URL} target="_blank" rel="noreferrer">{c.booking}</SheenButton>
              </div>
            </Card>
          </div>
        </div>
      </GemSection>

      <TrustBlock compact />
    </div>
  )
}
