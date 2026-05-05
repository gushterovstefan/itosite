import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useContent } from '../content/index.jsx'

const copy = {
  en: {
    title: 'Cookie consent',
    body: 'We use essential cookies for site operation and may use basic analytics only after consent. You can accept or reject optional cookies.',
    accept: 'Accept optional cookies',
    reject: 'Reject optional cookies',
    privacy: 'Privacy Policy'
  },
  bg: {
    title: 'Съгласие за бисквитки',
    body: 'Използваме необходими бисквитки за работата на сайта и можем да използваме базова аналитика само след съгласие. Можете да приемете или откажете незадължителните бисквитки.',
    accept: 'Приемам незадължителните бисквитки',
    reject: 'Отказвам незадължителните бисквитки',
    privacy: 'Политика за поверителност'
  }
}

const storageKey = 'ito-cookie-consent'

export default function CookieConsent() {
  const { lang, localizedPath } = useContent()
  const [visible, setVisible] = useState(false)
  const l = copy[lang] || copy.en

  useEffect(() => {
    try {
      setVisible(!localStorage.getItem(storageKey))
    } catch {
      setVisible(true)
    }
  }, [])

  const choose = (choice) => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ choice, at: new Date().toISOString() }))
    } catch {
      // ignore
    }
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div className="fixed inset-x-0 bottom-0 z-[80] px-4 pb-4 sm:px-6" role="region" aria-label={l.title}>
      <div className="mx-auto max-w-4xl rounded-3xl border border-black/10 bg-white/95 p-4 shadow-[0_20px_90px_-45px_rgba(0,0,0,0.7)] backdrop-blur md:flex md:items-center md:justify-between md:gap-5">
        <div>
          <div className="text-sm font-semibold text-ink-950">{l.title}</div>
          <p className="mt-1 text-xs leading-relaxed text-ink-900/70 md:text-sm">
            {l.body}{' '}
            <Link className="font-semibold text-ink-950 underline decoration-brand-500/40 underline-offset-4" to={localizedPath('/legal/privacy')}>
              {l.privacy}
            </Link>
          </p>
        </div>
        <div className="mt-4 flex flex-col gap-2 sm:flex-row md:mt-0 md:shrink-0">
          <button
            type="button"
            onClick={() => choose('rejected')}
            className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold text-ink-950/80 hover:bg-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {l.reject}
          </button>
          <button
            type="button"
            onClick={() => choose('accepted')}
            className="rounded-full bg-brand-200/60 px-4 py-2 text-xs font-semibold text-ink-950 ring-1 ring-brand-300/50 hover:bg-brand-200/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-700/70 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
          >
            {l.accept}
          </button>
        </div>
      </div>
    </div>
  )
}
