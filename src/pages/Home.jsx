import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Hero from '../components/Hero'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Menu from '../components/Menu'
import Contact from '../components/Contact'
import SeoCrawlImages from '../components/SeoCrawlImages'
import ScrollReveal from '../components/ScrollReveal'
import { scrollToSection } from '../utils/scrollToSection'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    const sectionId =
      location.state?.scrollTo || window.location.hash.replace(/^#/, '')

    if (!sectionId) return

    let attempts = 0
    let frameId = 0

    const scrollWhenReady = () => {
      if (scrollToSection(sectionId) || attempts > 24) return
      attempts += 1
      frameId = requestAnimationFrame(scrollWhenReady)
    }

    frameId = requestAnimationFrame(scrollWhenReady)

    return () => cancelAnimationFrame(frameId)
  }, [location])

  return (
    <>
      <SeoCrawlImages />
      <ScrollReveal variant="hero">
        <Hero />
      </ScrollReveal>
      <ScrollReveal variant="about">
        <About />
      </ScrollReveal>
      <ScrollReveal variant="gallery">
        <Gallery />
      </ScrollReveal>
      <ScrollReveal variant="menu">
        <Menu />
      </ScrollReveal>
      <ScrollReveal variant="contact">
        <Contact />
      </ScrollReveal>
    </>
  )
}
