import { lazy, Suspense } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import GemLayout from './components/GemLayout.jsx'
import PageTransition from './components/PageTransition.jsx'
const HomeGem = lazy(() => import('./pages/HomeGem.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Consulting = lazy(() => import('./pages/Consulting.jsx'))
const Support = lazy(() => import('./pages/Support.jsx'))
const Infrastructure = lazy(() => import('./pages/Infrastructure.jsx'))
const Solutions = lazy(() => import('./pages/Solutions.jsx'))
const SolutionDetail = lazy(() => import('./pages/SolutionDetail.jsx'))
const HowWeDeliver = lazy(() => import('./pages/HowWeDeliver.jsx'))
const IndustriesHub = lazy(() => import('./pages/Industries.jsx').then((m) => ({ default: m.IndustriesHub })))
const IndustryRoute = lazy(() => import('./pages/IndustryRoute.jsx'))
const InsightsHub = lazy(() => import('./pages/Insights.jsx').then((m) => ({ default: m.InsightsHub })))
const InsightDetail = lazy(() => import('./pages/Insights.jsx').then((m) => ({ default: m.InsightDetail })))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))
import Seo from './components/Seo.jsx'

export default function App() {
  const location = useLocation()

  return (
    <ErrorBoundary>
      <Seo />
      <Suspense fallback={<div className="min-h-[60vh]" aria-label="Loading page" />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<GemLayout />}>
            <Route path="/" element={<PageTransition><HomeGem /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/it-consulting-services" element={<PageTransition><Consulting /></PageTransition>} />
            <Route path="/it-support-services" element={<PageTransition><Support /></PageTransition>} />
            <Route path="/it-infrastructure-services" element={<PageTransition><Infrastructure /></PageTransition>} />
            <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
            <Route path="/solutions/:slug" element={<PageTransition><SolutionDetail /></PageTransition>} />
            <Route path="/how-we-deliver" element={<PageTransition><HowWeDeliver /></PageTransition>} />
            <Route path="/industries" element={<PageTransition><IndustriesHub /></PageTransition>} />
            <Route path="/industries/:slug" element={<PageTransition><IndustryRoute /></PageTransition>} />
            <Route path="/insights" element={<PageTransition><InsightsHub /></PageTransition>} />
            <Route path="/insights/:slug" element={<PageTransition><InsightDetail /></PageTransition>} />
            <Route path="/contacts" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/legal/privacy" element={<PageTransition><Legal type="privacy" /></PageTransition>} />
            <Route path="/legal/terms" element={<PageTransition><Legal type="terms" /></PageTransition>} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
