import Reveal from './Reveal.jsx'

export default function GemSection({ eyebrow, title, lead, children, light = false }) {
  const sectionClass = light
    ? 'light-section bg-[#EEF4FA] text-[#0F172A]'
    : 'dark-section bg-[#081526] text-[#F8FAFC]'

  return (
    <section className={`${sectionClass} relative overflow-hidden pb-8 pt-6 md:pb-10 md:pt-6`}>
      {!light ? (
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_0%,rgba(47,128,237,0.12),transparent_34%),linear-gradient(180deg,#0B1626_0%,#081526_48%,#0B1626_100%)]" aria-hidden="true" />
      ) : null}
      <div className="relative mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#38BDF8]">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05}>
            <h2 className={(light ? 'text-[#0F172A]' : 'text-[#F8FAFC]') + ' mt-2 text-3xl font-semibold tracking-tight md:text-5xl'}>{title}</h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.1}>
            <p className={(light ? 'text-[#334155]' : 'text-[#CBD5E1]') + ' mt-2 max-w-3xl text-base leading-relaxed md:text-lg'}>{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  )
}
