import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { showHeuteMenu } from '../data/dailyDishes'
import { getSectionId, scrollToSection } from '../utils/scrollToSection'

const navLinks = [
  { href: '/#uber-uns', label: 'Über uns' },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#menu', label: 'Menü' },
  ...(showHeuteMenu ? [{ href: '/#menu-heute', label: 'Heute' }] : []),
  { href: '/#kontakt', label: 'Kontakt' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isReservationPage = location.pathname === '/reservierung'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const closeMenu = () => setMenuOpen(false)
  const solid = scrolled || menuOpen || isReservationPage

  const handleSectionNav = (event, href) => {
    event.preventDefault()
    closeMenu()

    const sectionId = getSectionId(href)
    if (!sectionId) return

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
      return
    }

    scrollToSection(sectionId)
  }

  const sectionLinkClass = (isMobile) =>
    isMobile
      ? 'font-display text-2xl text-charcoal transition-colors hover:text-terracotta'
      : `text-sm font-medium tracking-wide transition-colors ${
          solid
            ? 'text-charcoal/80 hover:text-terracotta'
            : 'text-cream/90 hover:text-gold'
        }`

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        menuOpen
          ? 'bg-cream shadow-sm'
          : solid
            ? 'bg-cream/95 shadow-sm backdrop-blur-md'
            : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
        <Link
          to="/"
          className={`font-display max-w-[58%] truncate text-lg tracking-wide transition-colors sm:max-w-none sm:text-xl md:text-2xl ${
            solid
              ? 'text-charcoal hover:text-terracotta'
              : 'text-cream hover:text-gold'
          }`}
        >
          La Bella Elena
        </Link>

        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={(event) => handleSectionNav(event, link.href)}
                className={sectionLinkClass(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:block">
          <Link
            to="/reservierung"
            className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors ${
              solid
                ? 'bg-terracotta text-cream hover:bg-terracotta-dark'
                : 'border border-cream/40 bg-cream/10 text-cream backdrop-blur-sm hover:border-cream hover:bg-cream/20'
            }`}
          >
            Tisch reservieren
          </Link>
        </div>

        <button
          type="button"
          className="relative z-[70] flex h-10 w-10 flex-col items-center justify-center gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
          aria-expanded={menuOpen}
        >
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              solid ? 'bg-charcoal' : 'bg-cream'
            } ${menuOpen ? 'translate-y-2 rotate-45' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              solid ? 'bg-charcoal' : 'bg-cream'
            } ${menuOpen ? 'opacity-0' : ''}`}
          />
          <span
            className={`block h-0.5 w-6 transition-all duration-300 ${
              solid ? 'bg-charcoal' : 'bg-cream'
            } ${menuOpen ? '-translate-y-2 -rotate-45' : ''}`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-cream pt-16 md:hidden ${
          menuOpen ? 'visible' : 'invisible pointer-events-none'
        }`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            onClick={(event) => handleSectionNav(event, link.href)}
            className={sectionLinkClass(true)}
          >
            {link.label}
          </a>
        ))}
        <Link
          to="/reservierung"
          onClick={closeMenu}
          className="mt-4 rounded-full bg-terracotta px-8 py-3 text-cream"
        >
          Tisch reservieren
        </Link>
      </div>
    </header>
  )
}
