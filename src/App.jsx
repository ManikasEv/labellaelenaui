import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Reservation from './pages/Reservation'

function App() {
  return (
    <>
      <Navbar />
      <main className="w-full min-w-0 overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reservierung" element={<Reservation />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
