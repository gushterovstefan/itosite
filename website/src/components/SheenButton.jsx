import { forwardRef, useRef } from 'react'
import { Link } from 'react-router-dom'

function setVars(el, clientX, clientY) {
  const r = el.getBoundingClientRect()
  const x = clientX - r.left
  const y = clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
}

/**
 * Primary CTA button with cursor-follow sheen.
 * Works with react-router <Link> via `to`.
 */
const SheenButton = forwardRef(function SheenButton(
  { to, href, children, className = '', ...props },
  ref
) {
  const innerRef = useRef(null)

  const Comp = to ? Link : 'a'
  const compProps = to ? { to } : { href }

  return (
    <Comp
      ref={(node) => {
        innerRef.current = node
        if (typeof ref === 'function') ref(node)
        else if (ref) ref.current = node
      }}
      {...compProps}
      {...props}
      className={
        'btn-sheen btn-primary inline-flex items-center justify-center rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-ink-950 shadow-lg shadow-brand-500/20 hover:bg-brand-400 ' +
        className
      }
      onMouseMove={(e) => {
        if (innerRef.current) setVars(innerRef.current, e.clientX, e.clientY)
        props.onMouseMove?.(e)
      }}
      onTouchMove={(e) => {
        const t = e.touches?.[0]
        if (t && innerRef.current) setVars(innerRef.current, t.clientX, t.clientY)
        props.onTouchMove?.(e)
      }}
    >
      <span className="sheen" aria-hidden="true" />
      <span>{children}</span>
    </Comp>
  )
})

export default SheenButton
