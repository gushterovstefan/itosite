import Reveal from './Reveal.jsx'

export default function GemSection({ eyebrow, title, lead, children, dark = false }) {
  return (
    <section className={(dark ? 'dark-section bg-[#081526] text-[#F8FAFC]' : 'light-section bg-[#EEF4FA] text-[#0F172A]') + ' pb-8 pt-6 md:pb-10 md:pt-6'}>
      <div className="mx-auto max-w-6xl px-4">
        {eyebrow ? (
          <Reveal>
            <div className="text-xs font-semibold uppercase tracking-[0.24em] text-[#2F80ED]">
              {eyebrow}
            </div>
          </Reveal>
        ) : null}
        {title ? (
          <Reveal delay={0.05}>
            <h2 className={(dark ? 'text-[#F8FAFC]' : 'text-[#0F172A]') + ' mt-2 text-3xl font-semibold tracking-tight md:text-5xl'}>{title}</h2>
          </Reveal>
        ) : null}
        {lead ? (
          <Reveal delay={0.1}>
            <p className={(dark ? 'text-[#CBD5E1]' : 'text-[#334155]') + ' mt-2 max-w-3xl text-base leading-relaxed md:text-lg'}>{lead}</p>
          </Reveal>
        ) : null}
        {children ? <div className="mt-5">{children}</div> : null}
      </div>
    </section>
  )
}
