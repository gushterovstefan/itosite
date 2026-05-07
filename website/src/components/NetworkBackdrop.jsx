export default function NetworkBackdrop({ className = '' }) {
  return (
    <div className={`network-backdrop pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      <svg className="network-backdrop__svg absolute inset-0 h-full w-full" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice">
        <g className="network-backdrop__layer network-backdrop__layer--one">
          <path d="M64 110 L184 194 L318 150 L504 224 L716 128 L928 216 L1138 118" />
          <path d="M184 194 L260 352 L504 224 L742 388 L928 216 L1110 334" />
          <path d="M26 438 L260 352 L448 416 L742 388 L920 506 L1180 440" />
          <path d="M318 150 L448 416 L716 128 L742 388" />
          <path d="M928 216 L920 506 L1110 334" />
        </g>
        <g className="network-backdrop__nodes network-backdrop__layer--two">
          {[64, 184, 318, 504, 716, 928, 1138, 260, 742, 1110, 26, 448, 920, 1180].map((x, i) => {
            const y = [110, 194, 150, 224, 128, 216, 118, 352, 388, 334, 438, 416, 506, 440][i]
            return <circle key={`${x}-${y}`} cx={x} cy={y} r={i % 3 === 0 ? 5 : 4} />
          })}
        </g>
      </svg>
    </div>
  )
}
