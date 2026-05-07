export default function KpiStrip({ items }) {
  return (
    <div className="grid gap-4 md:grid-cols-4">
      {items.map((kpi) => (
        <div key={kpi.label} className="rounded-3xl border border-white/[0.12] bg-[#101E2F] p-6">
          <div className="text-3xl font-semibold tracking-tight md:text-4xl">{kpi.value}</div>
          <div className="mt-2 text-sm font-semibold text-[#F8FAFC]">{kpi.label}</div>
          {kpi.note ? <div className="mt-1 text-xs text-[#CBD5E1]">{kpi.note}</div> : null}
        </div>
      ))}
    </div>
  )
}
