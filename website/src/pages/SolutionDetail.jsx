import { Navigate, useParams } from 'react-router-dom'
import PageHero from '../components/PageHero.jsx'
import GemSection from '../components/GemSection.jsx'
import { Card, BulletList } from '../components/Cards.jsx'
import { Icon, icons } from '../components/Icons.jsx'
import ConversionCta from '../components/ConversionCta.jsx'
import { useContent } from '../content/index.jsx'
import { solutionPages } from '../content/solutionPages.js'
import { BOOKING_URL } from '../config/booking.js'

const labels = {
  en: {
    who: 'Who this is for',
    deliver: 'What we deliver',
    how: 'How we deliver it',
    architecture: 'Reference architecture',
    tooling: 'Tooling & standards',
    caseStudy: 'Case study',
    faq: 'FAQ',
    phases: ['Assess', 'Design', 'Migrate / Build', 'Operate', 'Optimize'],
    phaseText: ['Baseline current state and risks', 'Define target architecture and controls', 'Implement with runbooks and sign-off gates', 'Monitor, support and report', 'Improve cost, security and resilience'],
    questions: [
      ['How long does it take?', 'Most engagements start with a short assessment, then move into a scoped delivery plan with clear milestones.'],
      ['Can you work with our internal IT team?', 'Yes. We can lead delivery or work as a specialist extension of the internal team.'],
      ['What happens after implementation?', 'We provide handover, runbooks, support model definition and optional managed operation.'],
      ['How is pricing handled?', 'We scope fixed project work or recurring support based on environment size, complexity and SLA needs.']
    ]
  },
  bg: {
    who: 'За кого е подходящо',
    deliver: 'Какво доставяме',
    how: 'Как го доставяме',
    architecture: 'Reference architecture',
    tooling: 'Инструменти и стандарти',
    caseStudy: 'Case study',
    faq: 'FAQ',
    phases: ['Assess', 'Design', 'Migrate / Build', 'Operate', 'Optimize'],
    phaseText: ['Оценка на текущо състояние и рискове', 'Дефиниране на target architecture и контроли', 'Имплементация с runbooks и sign-off gates', 'Мониторинг, поддръжка и отчетност', 'Оптимизация на разходи, сигурност и устойчивост'],
    questions: [
      ['Колко време отнема?', 'Повечето ангажименти започват с кратък assessment, след което преминават в scoped delivery план с ясни milestones.'],
      ['Можете ли да работите с нашия вътрешен IT екип?', 'Да. Можем да водим доставката или да работим като specialist extension на вътрешния екип.'],
      ['Какво става след имплементацията?', 'Предоставяме handover, runbooks, дефиниция на support model и опционална managed operation.'],
      ['Как се определя цената?', 'Scope-ваме fixed project work или recurring support според размера, сложността и SLA нуждите.']
    ]
  }
}

export default function SolutionDetail() {
  const { slug } = useParams()
  const { lang, content } = useContent()
  const page = solutionPages[lang]?.[slug] || solutionPages.en[slug]
  const l = labels[lang] || labels.en

  if (!page) return <Navigate to="/solutions" replace />

  return (
    <div>
      <PageHero
        eyebrow={page.eyebrow}
        title={page.title}
        lead={page.lead}
        subline={page.subline}
        primaryCta={{ to: '/contacts', label: content.shared.ui.getQuote ?? content.shared.ui.contact }}
        secondaryCta={{ href: BOOKING_URL, label: lang === 'bg' ? 'Запазете 30-минутен разговор' : 'Book a 30-minute discovery call' }}
        aside={{
          eyebrow: 'Solution',
          title: page.eyebrow,
          lead: page.subline,
          icon: page.icon,
          items: [
            { k: 'Delivery', v: 'Assess → Operate' },
            { k: 'Security', v: 'By design' },
            { k: 'Handover', v: 'Runbooks' }
          ]
        }}
      />

      <GemSection eyebrow={page.eyebrow} title={l.who} lead={page.lead}>
        <div className="grid gap-4 lg:grid-cols-3">
          {page.buyer.map((item, i) => (
            <Card key={item} revealDelay={0.04 + i * 0.04} variant="brand">
              <div className="flex items-start justify-between gap-4">
                <p className="text-sm font-semibold leading-relaxed text-ink-950">{item}</p>
                <Icon as={icons.target} />
              </div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="Delivery" title={l.deliver} lead={page.subline}>
        <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
          <Card variant="violet" revealDelay={0.04}>
            <div className="flex items-start justify-between gap-4">
              <div className="text-sm font-semibold">{l.deliver}</div>
              <Icon as={icons[page.icon] ?? icons.platform} />
            </div>
            <div className="mt-4"><BulletList items={page.deliver} /></div>
          </Card>

          <Card variant="steel" revealDelay={0.10}>
            <div className="text-sm font-semibold">{l.how}</div>
            <div className="mt-5 grid gap-3 md:grid-cols-5">
              {l.phases.map((phase, i) => (
                <div key={phase} className="rounded-2xl border border-black/10 bg-white/65 p-3">
                  <div className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-800">0{i + 1}</div>
                  <div className="mt-2 text-sm font-semibold text-ink-950">{phase}</div>
                  <p className="mt-2 text-xs leading-relaxed text-ink-900/62">{l.phaseText[i]}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </GemSection>

      <GemSection eyebrow="Architecture" title={l.architecture} lead={page.subline}>
        <div className="grid gap-4 lg:grid-cols-[1.1fr_0.9fr]">
          <Card variant="brand" revealDelay={0.04}>
            <div className="grid gap-3 md:grid-cols-5">
              {l.phases.map((phase, i) => (
                <div key={phase} className="relative rounded-2xl border border-black/10 bg-white/70 p-4 text-center">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-brand-200/70 text-xs font-bold text-ink-950">{i + 1}</div>
                  <div className="mt-3 text-xs font-semibold text-ink-950">{phase}</div>
                </div>
              ))}
            </div>
          </Card>

          <Card variant="amber" revealDelay={0.10}>
            <div className="text-sm font-semibold">{l.tooling}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {page.standards.map((item) => (
                <span key={item} className="rounded-full border border-black/10 bg-white/75 px-3 py-1 text-xs font-semibold text-ink-900/65">{item}</span>
              ))}
            </div>
          </Card>
        </div>
      </GemSection>

      <GemSection eyebrow={l.caseStudy} title={page.caseTitle} lead={page.caseBody}>
        <div className="grid gap-4 md:grid-cols-3">
          {page.caseMetrics.map((metric, i) => (
            <Card key={metric} revealDelay={0.04 + i * 0.04}>
              <div className="text-2xl font-semibold tracking-tight text-ink-950">{metric}</div>
            </Card>
          ))}
        </div>
      </GemSection>

      <GemSection eyebrow="FAQ" title={l.faq} lead={page.lead}>
        <div className="grid gap-4 md:grid-cols-2">
          {l.questions.map(([q, a], i) => (
            <Card key={q} revealDelay={0.04 + i * 0.04} variant={i % 2 ? 'steel' : 'brand'}>
              <div className="text-sm font-semibold text-ink-950">{q}</div>
              <p className="mt-3 text-sm leading-relaxed text-ink-900/68">{a}</p>
            </Card>
          ))}
        </div>
      </GemSection>

      <ConversionCta variant="solutions" />
    </div>
  )
}
