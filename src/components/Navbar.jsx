import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { showHeuteMenu } from '../data/dailyDishes'
import { getSectionId, scrollToSection } from '../utils/scrollToSection'

const navLinks = [
  { href: '/#uber-uns', label: 'Über uns' },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#menu', label: 'Menü' },
  ...(showHeuteMenu ? [{ href: '/#menu-heute', label: 'Heute' }] : []),
  { href: '/#kontakt', label: 'Kontakt' },
]

const menuEase = [0.32, 0.72, 0, 1]

const overlayMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.28, ease: menuEase },
}

const panelMotion = {
  initial: { opacity: 0, y: -18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.32, ease: menuEase },
}

const linkMotion = (index, reduced) => ({
  initial: reduced ? false : { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  exit: reduced ? undefined : { opacity: 0, y: 8 },
  transition: {
    duration: reduced ? 0 : 0.3,
    ease: menuEase,
    delay: reduced ? 0 : 0.06 + index * 0.045,
  },
})

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const isReservationPage = location.pathname === '/reservierung'
  const isSubPage = isReservationPage || location.pathname === '/standort'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    document.body.style.touchAction = menuOpen ? 'none' : ''
    return () => {
      document.body.style.overflow = ''
      document.body.style.touchAction = ''
    }
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const closeMenu = () => setMenuOpen(false)
  const solid = scrolled || menuOpen || isSubPage

  const handleSectionNav = (event, href) => {
    event.preventDefault()
    closeMenu()

    const sectionId = getSectionId(href)
    if (!sectionId) return

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
      return
    }

    window.requestAnimationFrame(() => scrollToSection(sectionId))
  }

  const desktopLinkClass = `text-sm font-medium tracking-wide transition-colors duration-200 ${
    solid
      ? 'text-charcoal/80 hover:text-terracotta'
      : 'text-cream/90 hover:text-gold'
  }`

  return (
    <>
      <header
        className={`fixed top-0 right-0 left-0 z-50 transition-[background-color,box-shadow] duration-300 md:backdrop-blur-md ${
          menuOpen
            ? 'bg-cream shadow-sm max-md:backdrop-blur-none'
            : solid
              ? 'bg-cream/95 shadow-sm max-md:bg-cream max-md:backdrop-blur-none'
              : 'bg-transparent max-md:backdrop-blur-none'
        }`}
      >
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6 sm:py-4 lg:px-8">
          <Link
            to="/"
            onClick={closeMenu}
            className={`font-display max-w-[58%] truncate text-lg tracking-wide transition-colors duration-200 sm:max-w-none sm:text-xl md:text-2xl ${
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
                  className={desktopLinkClass}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden md:block">
            <Link
              to="/reservierung"
              className={`inline-flex items-center rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-200 ${
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
            className="relative z-[80] flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-200 md:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-panel"
          >
            <span className="sr-only">{menuOpen ? 'Menü schliessen' : 'Menü öffnen'}</span>
            <span className="relative block h-5 w-6">
              <span
                className={`absolute top-0 left-0 block h-0.5 w-6 origin-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  solid ? 'bg-charcoal' : 'bg-cream'
                } ${menuOpen ? 'translate-y-[9px] rotate-45' : ''}`}
              />
              <span
                className={`absolute top-[9px] left-0 block h-0.5 w-6 transition-opacity duration-200 ${
                  solid ? 'bg-charcoal' : 'bg-cream'
                } ${menuOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <span
                className={`absolute top-[18px] left-0 block h-0.5 w-6 origin-center transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                  solid ? 'bg-charcoal' : 'bg-cream'
                } ${menuOpen ? '-translate-y-[9px] -rotate-45' : ''}`}
              />
            </span>
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-nav"
            id="mobile-nav-panel"
            className="mobile-nav-root fixed inset-0 z-[70] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 1 }}
          >
            <motion.button
              type="button"
              className="absolute inset-0 bg-charcoal/15"
              aria-label="Menü schliessen"
              onClick={closeMenu}
              {...overlayMotion}
            />

            <motion.div
              className="mobile-nav-panel absolute inset-x-0 top-0 flex max-h-[100dvh] min-h-[100dvh] flex-col bg-cream shadow-xl"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 4.75rem)' }}
              {...panelMotion}
            >
              <nav className="flex flex-1 flex-col items-center justify-center gap-2 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
                {navLinks.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(event) => handleSectionNav(event, link.href)}
                    className="font-display w-full max-w-xs rounded-2xl px-4 py-3.5 text-center text-2xl text-charcoal transition-colors duration-200 active:bg-olive/5 hover:text-terracotta"
                    {...linkMotion(index, reducedMotion)}
                  >
                    {link.label}
                  </motion.a>
                ))}

                <motion.div
                  className="mt-5 w-full max-w-xs"
                  {...linkMotion(navLinks.length, reducedMotion)}
                >
                  <Link
                    to="/reservierung"
                    onClick={closeMenu}
                    className="flex w-full items-center justify-center rounded-full bg-terracotta px-8 py-3.5 text-base font-medium text-cream shadow-md transition-transform duration-200 active:scale-[0.98] hover:bg-terracotta-dark"
                  >
                    Tisch reservieren
                  </Link>
                </motion.div>
              </nav>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
