/**
 * Static wrapper retained for API compatibility.
 * Avoids JS-driven reveal animations for better performance and reduced layout risk.
 */
export default function Reveal({ children, className = '' }) {
  return <div className={className}>{children}</div>
}
