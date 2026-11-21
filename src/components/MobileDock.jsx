import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { whatsappUrl, restaurantPhone } from '../data/location'

/** Soft sticky welcome actions on phones — appears after leaving the hero. */
export default function MobileDock() {
  const [visible, setVisible] = useState(false)
  const location = useLocation()
  const reduced = useReducedMotion()
  const hideOnReservation = location.pathname === '/reservierung'

  useEffect(() => {
    if (hideOnReservation) {
      setVisible(false)
      return undefined
    }

    const onScroll = () => {
      const threshold = Math.min(window.innerHeight * 0.72, 640)
      setVisible(window.scrollY > threshold)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [hideOnReservation, location.pathname])

  return (
    <AnimatePresence>
      {visible && !hideOnReservation && (
        <motion.div
          className="mobile-dock md:hidden"
          initial={reduced ? false : { y: 28, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={reduced ? undefined : { y: 20, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mobile-dock__ghost"
            aria-label={`WhatsApp · ${restaurantPhone}`}
          >
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h2.1a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.25 1.03L8.1 9.3a12.5 12.5 0 006.6 6.6l1.3-1.3a1 1 0 011.03-.25l3.3 1.1a1 1 0 01.68.95v2.1A2.5 2.5 0 0118.5 21 15.5 15.5 0 013 5.5z" />
            </svg>
          </a>
          <Link to="/reservierung" className="mobile-dock__primary">
            Tisch reservieren
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
