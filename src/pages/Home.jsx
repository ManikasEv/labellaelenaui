import Hero from '../components/Hero'
import About from '../components/About'
import Gallery from '../components/Gallery'
import Menu from '../components/Menu'
import Contact from '../components/Contact'
import ScrollReveal from '../components/ScrollReveal'

export default function Home() {
  return (
    <>
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
