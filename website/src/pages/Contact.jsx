import { Card } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import SheenButton from '../components/SheenButton.jsx'
import { useContent } from '../content/index.jsx'
import { BOOKING_URL } from '../config/booking.js'

const serviceInterests = [
  'Microsoft 365 / Cloud Migration',
  'Cybersecurity / Defender',
  'Endpoint Management / Intune',
  'SharePoint / Data Governance',
  'Backup & Disaster Recovery',
  'Managed IT Support',
  'Other'
]

const projectTypes = [
  {
    title: 'Microsoft 365 & Cloud',
    body: 'Tenant migration, Exchange, Teams, licensing, baseline security, and cloud operations.',
    icon: icons.cloud
  },
  {
    title: 'Security & Compliance',
    body: 'Entra ID, MFA, Conditional Access, Defender, endpoint compliance, and governance controls.',
    icon: icons.security
  },
  {
    title: 'Managed IT Support',
    body: 'SLA-driven support, monitoring, escalation, documentation, and vendor coordination.',
    icon: icons.support
  },
  {
    title: 'Backup & Disaster Recovery',
    body: 'Backup design, recovery objectives, restore testing, and disaster recovery runbooks.',
    icon: icons.backup
  }
]

const nextSteps = [
  ['01', 'We review your request', 'We look at the service area, urgency, environment size, and business risk.'],
  ['02', 'We schedule a short discovery call', 'We clarify goals, constraints, timeline, stakeholders, and current Microsoft IT setup.'],
  ['03', 'We define the next step', 'You receive a practical recommendation: assessment, project scope, support model, or recovery review.']
]

export default function Contact() {
  const { content } = useContent()
  const c = content.contact

  function handleSubmit(event) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const body = [
      `Name: ${data.get('name') || ''}`,
      `Company: ${data.get('company') || ''}`,
      `Business Email: ${data.get('email') || ''}`,
      `Phone: ${data.get('phone') || ''}`,
      `Service Interest: ${data.get('serviceInterest') || ''}`,
      '',
      'Message:',
      data.get('message') || ''
    ].join('\n')

    const subject = encodeURIComponent(`IT assessment request — ${data.get('company') || data.get('name') || 'Website'}`)
    window.location.href = `mailto:${c.email}?subject=${subject}&body=${encodeURIComponent(body)}`
  }

  return (
    <div className="bg-[#07111F] text-[#F8FAFC]">
      <section className="relative overflow-hidden bg-[radial-gradient(circle_at_78%_12%,rgba(56,189,248,0.18),transparent_34%),linear-gradient(180deg,#07111F_0%,#0B1728_100%)] py-14 md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:72px_72px] opacity-35 [mask-image:radial-gradient(circle_at_65%_20%,black,transparent_68%)]" />
        <div className="relative mx-auto max-w-6xl px-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/[0.12] bg-[#101C2E] px-4 py-2 text-xs font-semibold uppercase tracking-[0.26em] text-[#CBD5E1]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#38BDF8]" aria-hidden="true" />
              Contact IT Outsource Ltd.
            </div>
            <h1 className="mt-5 text-4xl font-semibold tracking-tight md:text-6xl">
              Start with a clear assessment of your IT environment.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-[#CBD5E1] md:text-lg">
              Contact IT Outsource Ltd. for Microsoft 365, cloud, cybersecurity, endpoint management, backup, disaster recovery, and managed IT support projects.
            </p>
            <div className="mt-8">
              <SheenButton href={BOOKING_URL} target="_blank" rel="noreferrer">Book an IT Assessment</SheenButton>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#07111F] py-8 md:py-12">
        <div className="mx-auto grid max-w-6xl gap-5 px-4 lg:grid-cols-[1.22fr_0.78fr]">
          <Card variant="brand" className="rounded-3xl md:p-7">
            <div className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Project request</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">Tell us what you need to assess or improve.</h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CBD5E1]">
                Share the service area and a short description. The form prepares an email so you can review it before sending.
              </p>
            </div>

            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-4 md:grid-cols-2">
                <Field name="name" label="Name" required />
                <Field name="company" label="Company" />
                <Field name="email" label="Business Email" type="email" required />
                <Field name="phone" label="Phone" />
              </div>

              <label className="grid gap-2 text-sm font-semibold text-[#F8FAFC]">
                Service Interest
                <select
                  name="serviceInterest"
                  required
                  defaultValue=""
                  className="rounded-xl border border-white/[0.14] bg-[#0B1728] px-4 py-3 text-sm font-medium text-[#F8FAFC] outline-none transition focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
                >
                  <option value="" disabled>Select a service area</option>
                  {serviceInterests.map((item) => (
                    <option key={item}>{item}</option>
                  ))}
                </select>
              </label>

              <label className="grid gap-2 text-sm font-semibold text-[#F8FAFC]">
                Message
                <textarea
                  name="message"
                  required
                  rows="6"
                  className="resize-y rounded-xl border border-white/[0.14] bg-[#0B1728] px-4 py-3 text-sm font-medium leading-relaxed text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
                  placeholder="Briefly describe the environment, business issue, timeline, or project goal."
                />
              </label>

              <div className="flex flex-col gap-3 border-t border-white/[0.10] pt-5 md:flex-row md:items-center md:justify-between">
                <p className="max-w-xl text-xs leading-relaxed text-[#94A3B8]">
                  No sensitive passwords or confidential documents in the form. We will agree a secure exchange method if needed.
                </p>
                <button type="submit" className="btn-sheen btn-primary rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-[#F8FAFC] ring-1 ring-[#38BDF8]/40">
                  <span className="sheen" aria-hidden="true" />
                  <span>Book an IT Assessment</span>
                </button>
              </div>
            </form>
          </Card>

          <div className="grid gap-5">
            <Card variant="steel" className="rounded-3xl md:p-7">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Contact details</div>
                  <h2 className="mt-3 text-xl font-semibold tracking-tight text-[#F8FAFC]">IT Outsource Ltd.</h2>
                </div>
                <Icon as={icons.message} />
              </div>
              <dl className="mt-5 grid gap-3 text-sm">
                <Detail label="Location" value="Sofia, Bulgaria" />
                <Detail label="Email" value={c.email} href={`mailto:${c.email}`} />
                <Detail label="Website" value="itoutsource.bg" href="https://itoutsource.bg" />
              </dl>
            </Card>

            <Card variant="steel" className="rounded-3xl md:p-7">
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">What happens next</div>
              <div className="mt-5 grid gap-4">
                {nextSteps.map(([step, title, body]) => (
                  <div key={step} className="grid grid-cols-[auto_1fr] gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full border border-[#38BDF8]/35 bg-[#0B1728] text-xs font-semibold text-[#F8FAFC]">{step}</div>
                    <div>
                      <div className="text-sm font-semibold text-[#F8FAFC]">{title}</div>
                      <p className="mt-1 text-sm leading-relaxed text-[#CBD5E1]">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-[#0B1728] py-8 md:py-12">
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-5">
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Project types</div>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">Focused discussions for practical IT work.</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {projectTypes.map((item, index) => (
              <Card key={item.title} variant="steel" revealDelay={index * 0.04}>
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-sm font-semibold text-[#F8FAFC]">{item.title}</h3>
                  <Icon as={item.icon} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{item.body}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({ name, label, type = 'text', required = false }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-[#F8FAFC]">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-xl border border-white/[0.14] bg-[#0B1728] px-4 py-3 text-sm font-medium text-[#F8FAFC] outline-none placeholder:text-[#94A3B8] transition focus:border-[#38BDF8] focus:ring-2 focus:ring-[#38BDF8]/20"
        placeholder={label}
      />
    </label>
  )
}

function Detail({ label, value, href }) {
  const content = href ? (
    <a href={href} className="text-[#F8FAFC] transition hover:text-[#38BDF8]">{value}</a>
  ) : (
    <span className="text-[#F8FAFC]">{value}</span>
  )

  return (
    <div className="rounded-2xl border border-white/[0.10] bg-[#0B1728] px-4 py-3">
      <dt className="text-xs font-semibold uppercase tracking-[0.18em] text-[#94A3B8]">{label}</dt>
      <dd className="mt-1 font-semibold">{content}</dd>
    </div>
  )
}
