import Section from '../components/Section.jsx'
import { Card } from '../components/Cards.jsx'
import { contentEN } from '../content/en.js'

export default function Contact() {
  const c = contentEN.contact

  return (
    <div>
      <Section eyebrow="Contact" title={c.title} lead={c.lead}>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="md:col-span-1">
            <div className="text-sm font-semibold">Phone</div>
            <div className="mt-2 text-sm text-white/70">{c.phone}</div>
          </Card>
          <Card className="md:col-span-1">
            <div className="text-sm font-semibold">Email</div>
            <div className="mt-2 text-sm text-white/70">{c.email}</div>
          </Card>
          <Card className="md:col-span-1">
            <div className="text-sm font-semibold">Write us</div>
            <p className="mt-2 text-sm text-white/70">
              For the development phase we can keep this as a simple form (no database) and later wire it to email/CRM.
            </p>
            <form className="mt-5 space-y-3">
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder="Your name"
              />
              <input
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder="Email"
                type="email"
              />
              <textarea
                className="h-28 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:border-brand-400"
                placeholder="Message"
              />
              <button
                type="button"
                className="rounded-full bg-brand-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-brand-400"
              >
                Send (demo)
              </button>
            </form>
          </Card>
        </div>
      </Section>
    </div>
  )
}
