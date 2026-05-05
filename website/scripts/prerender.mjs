import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const distDir = new URL('../dist/', import.meta.url).pathname
const seoPath = new URL('../src/components/Seo.jsx', import.meta.url).pathname
const origin = 'https://itoutsource.bg'
const ogImage = `${origin}/og-image.png`
const baseHtml = readFileSync(join(distDir, 'index.html'), 'utf8')
const seoSource = readFileSync(seoPath, 'utf8')

const metaSource = seoSource.match(/const metaByPath = (\{[\s\S]*?\n\})\n\nconst routeLabels/)?.[1]
if (!metaSource) throw new Error('Could not extract metaByPath from Seo.jsx')
const metaByPath = Function(`"use strict"; return (${metaSource});`)()

function stripLocalePrefix(pathname = '/') {
  if (pathname === '/bg') return '/'
  if (pathname.startsWith('/bg/')) return pathname.slice(3) || '/'
  return pathname || '/'
}

function localizePath(pathname = '/', lang = 'en') {
  const clean = stripLocalePrefix(pathname)
  if (lang === 'bg') return clean === '/' ? '/bg' : `/bg${clean}`
  return clean
}

function escapeAttr(value) {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;')
}

function headTags(baseRoute, lang, title, description) {
  const route = localizePath(baseRoute, lang)
  const url = `${origin}${route}`
  const enUrl = `${origin}${localizePath(baseRoute, 'en')}`
  const bgUrl = `${origin}${localizePath(baseRoute, 'bg')}`
  return `
    <title>${escapeAttr(title)}</title>
    <meta name="description" content="${escapeAttr(description)}">
    <link rel="canonical" href="${url}">
    <link rel="alternate" hreflang="en" href="${enUrl}">
    <link rel="alternate" hreflang="bg" href="${bgUrl}">
    <link rel="alternate" hreflang="x-default" href="${enUrl}">
    <meta property="og:title" content="${escapeAttr(title)}">
    <meta property="og:description" content="${escapeAttr(description)}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${url}">
    <meta property="og:site_name" content="IT Outsource Ltd.">
    <meta property="og:image" content="${ogImage}">
    <meta property="og:image:secure_url" content="${ogImage}">
    <meta property="og:image:type" content="image/png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:image" content="${ogImage}">
    <meta name="twitter:image:alt" content="IT Outsource Ltd. — enterprise IT services, cloud, security and operations">`
}

function stripDynamicSeo(html) {
  return html
    .replace(/<title>.*?<\/title>/i, '')
    .replace(/\s*<meta name="description"[^>]*>/i, '')
    .replace(/\s*<link rel="canonical"[^>]*>/i, '')
    .replace(/\s*<link rel="alternate"[^>]*>/gi, '')
    .replace(/\s*<meta (?:property|name)="(?:og:[^"]+|twitter:[^"]+)"[^>]*>/gi, '')
}

function setHtmlLang(html, lang) {
  return html.replace(/<html([^>]*) lang="[^"]*"([^>]*)>/i, `<html$1 lang="${lang}"$2>`)
}

function writeRoute(route, html) {
  if (route === '/') {
    writeFileSync(join(distDir, 'index.html'), html)
    return
  }
  const outDir = join(distDir, route.replace(/^\//, ''))
  mkdirSync(outDir, { recursive: true })
  writeFileSync(join(outDir, 'index.html'), html)
}

for (const lang of ['en', 'bg']) {
  for (const [baseRoute, data] of Object.entries(metaByPath[lang])) {
    const route = localizePath(baseRoute, lang)
    const html = setHtmlLang(stripDynamicSeo(baseHtml), lang).replace(
      '</head>',
      `${headTags(baseRoute, lang, data.title, data.description)}\n  </head>`
    )
    writeRoute(route, html)
    console.log(`[prerender] ${route}`)
  }
}
