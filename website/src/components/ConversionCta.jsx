import { Link } from 'react-router-dom'
import SheenButton from './SheenButton.jsx'

export default function ConversionCta({
  title = 'Ready to make Microsoft IT easier to operate?',
  lead = 'Start with a practical assessment of Microsoft 365, identity, endpoints, security, backup, disaster recovery, and managed support ownership.'
}) {
  return (
    <section className="bg-[#07111F] py-8 md:py-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="relative overflow-hidden rounded-3xl border border-white/[0.12] bg-[#101C2E] p-6 shadow-[0_22px_90px_-60px_rgba(0,0,0,0.75)] md:p-8">
          <div className="relative z-10 grid gap-6 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">Next step</div>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#F8FAFC] md:text-3xl">
                {title}
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-[#CBD5E1] md:text-base">
                {lead}
              </p>
            </div>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <SheenButton to="/contacts">Book an IT Assessment</SheenButton>
              <Link
                to="/solutions"
                className="inline-flex items-center justify-center rounded-full border border-white/[0.12] bg-[#101C2E] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition hover:border-[#38BDF8]/45 hover:text-[#38BDF8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70"
              >
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
