/**
 * Static spotlight layer.
 * Avoids pointer-tracking JavaScript and respects reduced-motion by using no animation.
 */
export default function Spotlight({ className = '' }) {
  return (
    <div
      aria-hidden="true"
      className={'pointer-events-none absolute inset-0 opacity-45 mix-blend-screen ' + className}
      style={{
        background:
          'radial-gradient(340px circle at 24% 18%, rgba(47,128,237,0.12), rgba(56,189,248,0.06), transparent 64%)'
      }}
    />
  )
}
