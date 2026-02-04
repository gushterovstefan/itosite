export default function KpiStrip({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((kpi, i) => (
        <div
          key={kpi.label}
          className={[
            'rounded-3xl border border-white/10 bg-white/5 p-6',
            i === 0 ? 'bg-gradient-to-b from-brand-500/14 to-white/5' : '',
            i === 3 ? 'bg-gradient-to-b from-fuchsia-500/10 to-white/5' : ''
          ].join(' ')}
        >
          <div className="text-3xl font-semibold tracking-tight md:text-4xl">{kpi.value}</div>
          <div className="mt-2 text-sm font-semibold text-white/85">{kpi.label}</div>
          {kpi.note ? <div className="mt-1 text-xs text-white/55">{kpi.note}</div> : null}
        </div>
      ))}
    </div>
  )
}
