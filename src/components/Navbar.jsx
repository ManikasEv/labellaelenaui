import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { homeSectionLinks, sectionPaths } from '../data/siteNavigation'

const navLinks = homeSectionLinks.map((link) => ({
  to: link.path,
  label: link.label,
}))

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
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const reducedMotion = useReducedMotion()
  const isReservationPage = location.pathname === '/reservierung'
  const isStandortPage = location.pathname === '/standort'
  const isSectionPage = sectionPaths.has(location.pathname)
  const isImpressumPage = location.pathname === '/impressum'
  const isSubPage = isReservationPage || isStandortPage || isImpressumPage || isSectionPage

  // Scroll-aware header: transparent at the top, hides when scrolling down,
  // slides back in as soon as the visitor scrolls up.
  useEffect(() => {
    let lastY = window.scrollY
    let ticking = false

    const update = () => {
      const y = window.scrollY
      const delta = y - lastY
      setScrolled(y > 24)
      if (y < 120) {
        setHidden(false)
      } else if (Math.abs(delta) > 6) {
        setHidden(delta > 0)
      }
      lastY = y
      ticking = false
    }

    const onScroll = () => {
      if (!ticking) {
        ticking = true
        window.requestAnimationFrame(update)
      }
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

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
  const isHidden = hidden && !menuOpen
  void isSubPage

  // Over the full-screen hero the bar is transparent with white type;
  // it turns white as soon as the visitor scrolls or opens the menu.
  const isHome = location.pathname === '/'
  const onHero = isHome && !scrolled && !menuOpen
  const ink = onHero ? 'text-white' : 'text-charcoal'
  const inkSoft = onHero ? 'text-white/80 hover:text-white' : 'text-charcoal/75 hover:text-charcoal'
  const inkMuted = onHero ? 'text-white/65' : 'text-charcoal/55'
  const barTone = onHero ? 'bg-white' : 'bg-charcoal'

  const desktopLinkClass = `nav-link text-[0.9rem] whitespace-nowrap transition-colors duration-200 ${inkSoft}`

  const barClass = `h-px w-6 ${barTone} transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]`

  return (
    <>
      <header
        className={`site-header fixed inset-x-0 top-0 z-[80] ${onHero ? 'site-header--transparent' : ''} ${
          scrolled ? 'site-header--scrolled' : ''
        } ${isHidden ? 'site-header--hidden' : ''}`}
      >
        <nav className="relative flex w-full items-center justify-between gap-4 px-5 py-3 sm:px-7 sm:py-4 lg:px-10 xl:px-12">
          {/* Left: burger (mobile) / section links (desktop) — flush to the edge */}
          <div className="relative z-[81] flex min-w-0 shrink items-center">
            <button
              type="button"
              className="relative z-[80] -ml-2 flex h-11 w-11 items-center justify-center md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? 'Menü schliessen' : 'Menü öffnen'}
              aria-expanded={menuOpen}
              aria-controls="mobile-nav-panel"
            >
              <span className="sr-only">{menuOpen ? 'Menü schliessen' : 'Menü öffnen'}</span>
              <span className="relative block h-4 w-6">
                <span
                  className={`absolute top-0 left-0 block origin-center ${barClass} ${
                    menuOpen ? 'translate-y-[7.5px] rotate-45' : ''
                  }`}
                />
                <span
                  className={`absolute top-[7.5px] left-0 block h-px w-6 ${barTone} transition-opacity duration-200 ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                <span
                  className={`absolute top-[15px] left-0 block origin-center ${barClass} ${
                    menuOpen ? '-translate-y-[7.5px] -rotate-45' : ''
                  }`}
                />
              </span>
            </button>

            <ul className="hidden items-center gap-5 lg:gap-6 xl:gap-7 md:flex">
              {navLinks.map((link) => (
                <li key={link.to}>
                  <Link to={link.to} className={desktopLinkClass}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Centre: two-line wordmark — truly centred in the bar */}
          <Link
            to="/"
            onClick={closeMenu}
            className={`group pointer-events-auto absolute top-1/2 left-1/2 z-[80] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center transition-colors duration-300 ${ink}`}
          >
            <span className="display text-[1.3rem] leading-none whitespace-nowrap transition-colors group-hover:text-terracotta sm:text-[1.7rem]">
              La Bella Elena
            </span>
            <span className={`mt-1.5 hidden text-[0.52rem] font-medium tracking-[0.32em] uppercase transition-colors duration-300 sm:block ${inkMuted}`}>
              Griechisch-Italienisches Restaurant
            </span>
          </Link>

          {/* Right: reservation button — flush to the edge */}
          <div className="relative z-[81] flex shrink-0 items-center justify-end">
            <Link
              to="/reservierung"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-terracotta text-[0.7rem] font-semibold tracking-[0.14em] whitespace-nowrap text-white uppercase transition-colors duration-200 hover:bg-terracotta-dark sm:h-12 sm:w-auto sm:px-6"
              aria-label="Tisch reservieren"
            >
              <svg className="h-4 w-4 sm:hidden" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8} aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 3v3m8-3v3M4 9h16M5 5h14a1 1 0 011 1v13a1 1 0 01-1 1H5a1 1 0 01-1-1V6a1 1 0 011-1z" />
              </svg>
              <span className="hidden sm:inline">Tisch reservieren</span>
            </Link>
          </div>
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
              className="mobile-nav-panel absolute inset-x-0 top-0 flex max-h-[100dvh] min-h-[100dvh] flex-col bg-white shadow-xl"
              style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 5.5rem)' }}
              {...panelMotion}
            >
              <nav className="relative flex flex-1 flex-col justify-center gap-1 px-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
                {navLinks.map((link, index) => (
                  <motion.div key={link.to} {...linkMotion(index, reducedMotion)}>
                    <Link
                      to={link.to}
                      onClick={closeMenu}
                      className="display flex w-full items-center justify-between border-b border-charcoal/10 py-4 text-[1.9rem] text-charcoal transition-colors duration-200 hover:text-terracotta active:bg-charcoal/5"
                    >
                      {link.label}
                      <svg className="h-4 w-4 text-charcoal/40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </motion.div>
                ))}

                <motion.div
                  className="mt-8 w-full"
                  {...linkMotion(navLinks.length, reducedMotion)}
                >
                  <Link
                    to="/reservierung"
                    onClick={closeMenu}
                    className="btn btn-primary w-full transition-transform duration-200 active:scale-[0.98]"
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
