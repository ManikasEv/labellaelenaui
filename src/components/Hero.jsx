import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import { restaurantPhone, whatsappUrl } from '../data/location'
import food1 from '../assets/food1.jpg'
import specialfood from '../assets/specialfood.jpg'
import food5 from '../assets/food5.jpg'
import place5 from '../assets/place5.jpg'
import outdoor1 from '../assets/outdoor1.jpg'

const shortcuts = [
  {
    key: 'karte',
    label: 'Speisekarte',
    to: '/menu',
    state: { menuSection: 'karte' },
    image: food1,
  },
  {
    key: 'sommer',
    label: 'Monatsspezialitäten',
    to: '/menu',
    state: { menuSection: 'sommer' },
    image: specialfood,
  },
  {
    key: 'tages',
    label: 'Mittagsmenü',
    to: '/menu',
    state: { menuSection: 'tages' },
    image: food5,
  },
  {
    key: 'reservierung',
    label: 'Reservierung',
    to: '/reservierung',
    image: place5,
  },
  {
    key: 'standort',
    label: 'Standort',
    to: '/standort',
    image: outdoor1,
  },
]

const ease = [0.22, 1, 0.36, 1]

export default function Hero() {
  const reduced = useReducedMotion()

  return (
    <>
      <section className="hero">
        <div className="hero-media" aria-hidden="true">
          <img
            src="/restaurant-cover.jpg"
            alt=""
            width={2400}
            height={1260}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-shade" aria-hidden="true" />

        <div className="hero-content">
          <motion.p
            className="text-[0.6rem] font-semibold tracking-[0.32em] text-white/70 uppercase sm:text-[0.66rem]"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.05 }}
          >
            Griechisch-Italienisches Restaurant
          </motion.p>
          <motion.h1
            className="display hero-title mt-5 text-white"
            initial={reduced ? false : { opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: 1.22 }}
          >
            La Bella Elena
          </motion.h1>
          <motion.p
            className="display mt-3 text-lg text-white/85 sm:text-2xl"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.95, ease, delay: 1.34 }}
          >
            Hohle Gasse · Immensee
          </motion.p>

          <motion.p
            className="mt-6 text-[0.9rem] leading-relaxed text-white/75 sm:text-base"
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.48 }}
          >
            Hohle Gasse · Artherstrasse 38, 6405 Immensee
            <br />
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/75 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              WhatsApp · {restaurantPhone}
            </a>
          </motion.p>

          <motion.div
            className="hero-actions mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
            initial={reduced ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 1.58 }}
          >
            <Link to="/reservierung" className="btn btn-primary hero-btn">
              Tisch reservieren
            </Link>
            <Link to="/menu" className="btn btn-light hero-btn">
              Menü entdecken
            </Link>
          </motion.div>
        </div>

        <span className="sr-only">
          La Bella Elena — Restaurant an der Hohlen Gasse in Immensee mit Blick auf die Berge
        </span>
      </section>

      <section className="dest-section" aria-label="Schnelleinstiege">
        <div className="dest-strip" role="navigation">
          {shortcuts.map((item, index) => (
            <motion.div
              key={item.key}
              className="dest-tile-wrap"
              initial={reduced ? false : { opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.7, ease, delay: reduced ? 0 : index * 0.06 }}
            >
              <Link to={item.to} state={item.state} className="dest-tile">
                <span className="dest-tile__media" aria-hidden="true">
                  <img src={item.image} alt="" loading="lazy" decoding="async" />
                </span>
                <span className="dest-tile__shade" aria-hidden="true" />
                <span className="dest-tile__index">{String(index + 1).padStart(2, '0')}</span>
                <span className="dest-tile__label">{item.label}</span>
                <span className="dest-tile__go" aria-hidden="true">
                  <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.7}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>
    </>
  )
}
