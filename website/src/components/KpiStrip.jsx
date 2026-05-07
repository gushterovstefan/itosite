export default function KpiStrip({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((kpi, i) => (
        <div
          key={kpi.label}
          className={[
            'rounded-3xl border border-white/10 bg-[#101E33] p-6',
            i === 0 ? 'bg-gradient-to-b from-[#2563EB]/14 to-[#0B1728]' : '',
            i === 3 ? 'bg-gradient-to-b from-[#38BDF8]/10 to-[#0B1728]' : ''
          ].join(' ')}
        >
          <div className="text-3xl font-semibold tracking-tight md:text-4xl">{kpi.value}</div>
          <div className="mt-2 text-sm font-semibold text-[#F8FAFC]">{kpi.label}</div>
          {kpi.note ? <div className="mt-1 text-xs text-[#CBD5E1]">{kpi.note}</div> : null}
        </div>
      ))}
    </div>
  )
}
