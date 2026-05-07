import React, { createContext, useContext, useMemo, useState } from 'react'
import { contentEN } from './en.js'
import { contentBG } from './bg.js'

const ContentCtx = createContext(null)

export function ContentProvider({ children }) {
  const [lang, setLangState] = useState(() => {
    try {
      return localStorage.getItem('lang') || 'en'
    } catch {
      return 'en'
    }
  })

  const setLang = (next) => {
    setLangState(next)
    try {
      localStorage.setItem('lang', next)
    } catch {
      // ignore
    }
  }

  const value = useMemo(() => {
    const picked = lang === 'bg' ? contentBG : contentEN
    const content = picked || contentEN
    return { lang, setLang, content }
  }, [lang])

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>
}

export function useContent() {
  const ctx = useContext(ContentCtx)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  // Extra safety: never allow undefined content to reach pages.
  return { ...ctx, content: ctx.content || contentEN }
}
