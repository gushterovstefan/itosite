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
const CaseStudies = lazy(() => import('./pages/CaseStudies.jsx'))
const ServiceLanding = lazy(() => import('./pages/ServiceLanding.jsx'))
const HowWeDeliver = lazy(() => import('./pages/HowWeDeliver.jsx'))
const IndustriesHub = lazy(() => import('./pages/Industries.jsx').then((m) => ({ default: m.IndustriesHub })))
const IndustryRoute = lazy(() => import('./pages/IndustryRoute.jsx'))
const InsightsHub = lazy(() => import('./pages/Insights.jsx').then((m) => ({ default: m.InsightsHub })))
const InsightDetail = lazy(() => import('./pages/Insights.jsx').then((m) => ({ default: m.InsightDetail })))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Legal = lazy(() => import('./pages/Legal.jsx'))
import Seo from './components/Seo.jsx'

const routeDefs = [
  ['/', <HomeGem />],
  ['/about', <About />],
  ['/it-consulting-services', <Consulting />],
  ['/it-support-services', <Support />],
  ['/it-infrastructure-services', <Infrastructure />],
  ['/solutions', <Solutions />],
  ['/solutions/:slug', <SolutionDetail />],
  ['/microsoft-365', <ServiceLanding slug="microsoft-365" />],
  ['/azure-cloud', <ServiceLanding slug="azure-cloud" />],
  ['/cybersecurity', <ServiceLanding slug="cybersecurity" />],
  ['/backup-disaster-recovery', <ServiceLanding slug="backup-disaster-recovery" />],
  ['/managed-it-support', <ServiceLanding slug="managed-it-support" />],
  ['/google-workspace-to-microsoft-365', <ServiceLanding slug="google-workspace-to-microsoft-365" />],
  ['/contact', <Contact />],
  ['/case-studies', <CaseStudies />],
  ['/how-we-deliver', <HowWeDeliver />],
  ['/industries', <IndustriesHub />],
  ['/industries/:slug', <IndustryRoute />],
  ['/insights', <InsightsHub />],
  ['/insights/:slug', <InsightDetail />],
  ['/contacts', <Contact />],
  ['/legal/privacy', <Legal type="privacy" />],
  ['/legal/terms', <Legal type="terms" />]
]

function renderRoutes(prefix = '') {
  return routeDefs.map(([path, element]) => {
    const routePath = path === '/' ? (prefix || '/') : `${prefix}${path}`
    return (
      <Route
        key={routePath}
        path={routePath}
        element={<PageTransition>{element}</PageTransition>}
      />
    )
  })
}

export default function App() {
  const location = useLocation()

  return (
    <ErrorBoundary>
      <Seo />
      <Suspense fallback={<div className="min-h-[60vh]" aria-label="Loading page" />}>
        <Routes location={location} key={location.pathname}>
          <Route element={<GemLayout />}>
            {renderRoutes()}
            {renderRoutes('/bg')}
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  )
}
