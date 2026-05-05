import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import ErrorBoundary from './components/ErrorBoundary.jsx'
import GemLayout from './components/GemLayout.jsx'
import PageTransition from './components/PageTransition.jsx'
import HomeGem from './pages/HomeGem.jsx'
import About from './pages/About.jsx'
import Consulting from './pages/Consulting.jsx'
import Support from './pages/Support.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Solutions from './pages/Solutions.jsx'
import SolutionDetail from './pages/SolutionDetail.jsx'
import Contact from './pages/Contact.jsx'
import Legal from './pages/Legal.jsx'
import Seo from './components/Seo.jsx'

export default function App() {
  const location = useLocation()

  return (
    <ErrorBoundary>
      <Seo />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route element={<GemLayout />}>
            <Route path="/" element={<PageTransition><HomeGem /></PageTransition>} />
            <Route path="/about" element={<PageTransition><About /></PageTransition>} />
            <Route path="/it-consulting-services" element={<PageTransition><Consulting /></PageTransition>} />
            <Route path="/it-support-services" element={<PageTransition><Support /></PageTransition>} />
            <Route path="/it-infrastructure-services" element={<PageTransition><Infrastructure /></PageTransition>} />
            <Route path="/solutions" element={<PageTransition><Solutions /></PageTransition>} />
            <Route path="/solutions/:slug" element={<PageTransition><SolutionDetail /></PageTransition>} />
            <Route path="/contacts" element={<PageTransition><Contact /></PageTransition>} />
            <Route path="/legal/privacy" element={<PageTransition><Legal type="privacy" /></PageTransition>} />
            <Route path="/legal/terms" element={<PageTransition><Legal type="terms" /></PageTransition>} />
          </Route>
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
  )
}
