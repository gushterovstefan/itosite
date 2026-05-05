import React, { createContext, useContext, useEffect, useMemo } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import i18next from 'i18next'
import { contentEN } from './en.js'
import { contentBG } from './bg.js'

const ContentCtx = createContext(null)

if (!i18next.isInitialized) {
  i18next.init({
    lng: 'en',
    fallbackLng: 'en',
    supportedLngs: ['en', 'bg'],
    resources: {
      en: { translation: contentEN },
      bg: { translation: contentBG }
    },
    interpolation: { escapeValue: false }
  })
}

export function stripLocalePrefix(pathname = '/') {
  if (pathname === '/bg') return '/'
  if (pathname.startsWith('/bg/')) return pathname.slice(3) || '/'
  return pathname || '/'
}

export function localeFromPath(pathname = '/') {
  return pathname === '/bg' || pathname.startsWith('/bg/') ? 'bg' : 'en'
}

export function localizePath(pathname = '/', lang = 'en') {
  const clean = stripLocalePrefix(pathname)
  if (lang === 'bg') return clean === '/' ? '/bg' : `/bg${clean}`
  return clean
}

export function ContentProvider({ children }) {
  const location = useLocation()
  const navigate = useNavigate()
  const lang = localeFromPath(location.pathname)

  useEffect(() => {
    i18next.changeLanguage(lang)
    try {
      localStorage.setItem('lang', lang)
    } catch {
      // ignore
    }
  }, [lang])

  const setLang = (next) => {
    const normalized = next === 'bg' ? 'bg' : 'en'
    try {
      localStorage.setItem('lang', normalized)
    } catch {
      // ignore
    }
    const target = `${localizePath(location.pathname, normalized)}${location.search}${location.hash}`
    navigate(target)
  }

  const value = useMemo(() => {
    const picked = lang === 'bg' ? contentBG : contentEN
    const content = picked || contentEN
    return {
      lang,
      setLang,
      content,
      basePath: stripLocalePrefix(location.pathname),
      localizedPath: (path, nextLang = lang) => localizePath(path, nextLang)
    }
  }, [lang, location.pathname])

  return <ContentCtx.Provider value={value}>{children}</ContentCtx.Provider>
}

export function useContent() {
  const ctx = useContext(ContentCtx)
  if (!ctx) throw new Error('useContent must be used within ContentProvider')
  // Extra safety: never allow undefined content to reach pages.
  return { ...ctx, content: ctx.content || contentEN }
}
