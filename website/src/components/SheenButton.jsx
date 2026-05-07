import { forwardRef, useRef } from 'react'
import { Link } from 'react-router-dom'

function setVars(el, clientX, clientY) {
  const r = el.getBoundingClientRect()
  const x = clientX - r.left
  const y = clientY - r.top
  el.style.setProperty('--mx', `${x}px`)
  el.style.setProperty('--my', `${y}px`)
}

const SheenButton = forwardRef(function SheenButton({ to, href, children, className = '', ...props }, ref) {
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
      className={'btn-sheen btn-primary inline-flex items-center justify-center rounded-full bg-[#2563EB] px-6 py-3 text-sm font-semibold text-white shadow-[0_14px_38px_-22px_rgba(37,99,235,0.9)] ring-1 ring-[#38BDF8]/25 transition hover:bg-[#1D4ED8] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#38BDF8]/70 ' + className}
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
