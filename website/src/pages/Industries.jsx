import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { ClickCard, Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { industries, industrySlugs } from '../content/industries.js'

const labels = {
  en: {
    open: 'Open industry',
    outcomes: 'Relevant outcomes',
    solutions: 'Relevant solutions',
    caseStudy: 'Anonymized case pattern',
    all: 'All industries'
  },
  bg: {
    open: 'Отвори индустрия',
    outcomes: 'Релевантни outcomes',
    solutions: 'Релевантни решения',
    caseStudy: 'Анонимизиран case pattern',
    all: 'Всички индустрии'
  }
}

export function IndustriesHub() {
  const { lang, content } = useContent()
  const data = industries[lang] || industries.en
  const l = labels[lang] || labels.en

  return (
    <div>
      <PageHero
        eyebrow={data.hub.eyebrow}
        title={data.hub.title}
        lead={data.hub.lead}
        subline={data.hub.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/how-we-deliver', label: lang === 'bg' ? 'Как работим' : 'How we deliver' }}
        aside={{
          eyebrow: 'Verticals',
          title: '4 focus areas',
          lead: data.hub.subline,
          icon: 'platform',
          items: [
            { k: 'Retail', v: 'Operations' },
            { k: 'Life sciences', v: 'Audit-ready' },
            { k: 'Energy', v: 'Governance' }
          ]
        }}
      />

      <GemSection eyebrow={data.hub.eyebrow} title={data.hub.title} lead={data.hub.lead}>
        <div className="grid gap-4 lg:grid-cols-2">
          {industrySlugs.map((slug, i) => {
            const page = data.pages[slug]
            return (
              <ClickCard key={slug} to={`/industries/${slug}`} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'} badge={page.eyebrow}>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold tracking-tight text-[#F8FAFC]">{page.title}</h2>
                    <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{page.lead}</p>
                  </div>
                  <Icon as={icons[page.icon] ?? icons.platform} />
                </div>
                <div className="mt-5"><BulletList items={page.outcomes.slice(0, 2)} /></div>
                <div className="mt-5 text-xs font-semibold uppercase tracking-[0.22em] text-[#38BDF8]">{l.open}</div>
              </ClickCard>
            )
          })}
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}

export function IndustryDetail({ slug }) {
  const { lang, content } = useContent()
  const data = industries[lang] || industries.en
  const page = data.pages[slug] || industries.en.pages[slug]
  const l = labels[lang] || labels.en

  if (!page) return <IndustriesHub />

  return (
    <div>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        subline={data.hub.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ to: '/industries', label: l.all }}
        aside={{
          eyebrow: 'Industry',
          title: page.caseTitle,
          lead: page.caseBody,
          icon: page.icon,
          items: page.metrics.map((metric) => ({ k: 'Focus', v: metric }))
        }}
      />

      <GemSection eyebrow={page.eyebrow} title={l.outcomes} lead={page.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {page.outcomes.map((item, i) => (
            <Card key={item} revealDelay={0.04 + i * 0.04} variant="brand">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold leading-relaxed text-[#F8FAFC]">{item}</p>
                <Icon as={icons.target} />
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Solutions" title={l.solutions} lead={page.caseBody}>
        <div className="grid gap-4 md:grid-cols-2">
          <Card variant="steel" revealDelay={0.04}>
            <div className="text-sm font-semibold">{l.solutions}</div>
            <div className="mt-4"><BulletList items={page.solutions} /></div>
            <Link className="mt-5 inline-flex rounded-full border border-white/[0.12] bg-[#101E2F] px-4 py-2 text-sm font-semibold text-[#F8FAFC] hover:bg-[#0B1B2B]" to="/solutions">
              {content.shared.ui.solutions}
            </Link>
          </Card>
          <Card variant="steel" revealDelay={0.10} badge={l.caseStudy}>
            <h2 className="text-lg font-semibold tracking-tight text-[#F8FAFC]">{page.caseTitle}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[#CBD5E1]">{page.caseBody}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              {page.metrics.map((metric) => (
                <span key={metric} className="rounded-full border border-white/[0.12] bg-[#101E2F] px-3 py-1 text-xs font-semibold text-[#94A3B8]">{metric}</span>
              ))}
            </div>
          </Card>
        </div>
      </GemSection>

      <ConversionCta />
    </div>
  )
}
