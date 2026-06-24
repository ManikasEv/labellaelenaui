import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import SeoHead from './components/SeoHead'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Reservation from './pages/Reservation'
import Standort from './pages/Standort'
import { homeSectionLinks } from './data/siteNavigation'

function App() {
  return (
    <>
      <SeoHead />
      <ScrollToTop />
      <Navbar />
      <main className="w-full min-w-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          {homeSectionLinks.map((link) => (
            <Route key={link.path} path={link.path} element={<Home />} />
          ))}
          <Route path="/reservierung" element={<Reservation />} />
          <Route path="/standort" element={<Standort />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
