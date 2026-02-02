import { Routes, Route } from 'react-router-dom'
import SiteLayout from './components/SiteLayout.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import Consulting from './pages/Consulting.jsx'
import Support from './pages/Support.jsx'
import Infrastructure from './pages/Infrastructure.jsx'
import Solutions from './pages/Solutions.jsx'
import Contact from './pages/Contact.jsx'

export default function App() {
  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/it-consulting-services" element={<Consulting />} />
        <Route path="/it-support-services" element={<Support />} />
        <Route path="/it-infrastructure-services" element={<Infrastructure />} />
        <Route path="/solutions" element={<Solutions />} />
        <Route path="/contacts" element={<Contact />} />
      </Route>
    </Routes>
  )
}
