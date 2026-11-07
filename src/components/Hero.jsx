import { Link } from 'react-router-dom'
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
    alt: 'Lamm mit Ofenkartoffeln und Pommes',
  },
  {
    key: 'sommer',
    label: 'Monatsspezialitäten',
    to: '/menu',
    state: { menuSection: 'sommer' },
    image: specialfood,
    alt: 'Lammkoteletts mit Pasta und Kartoffeln',
  },
  {
    key: 'tages',
    label: 'Mittagsmenü',
    to: '/menu',
    state: { menuSection: 'tages' },
    image: food5,
    alt: 'Frisch aus unserer Küche',
  },
  {
    key: 'reservierung',
    label: 'Reservierung',
    to: '/reservierung',
    image: place5,
    alt: 'Innenraum des Restaurants',
  },
  {
    key: 'standort',
    label: 'Standort',
    to: '/standort',
    image: outdoor1,
    alt: 'Terrasse unter dem Baumdach',
  },
]

export default function Hero() {
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
          <p className="hero-rise hero-rise-1 text-[0.6rem] font-semibold tracking-[0.32em] text-white/70 uppercase sm:text-[0.66rem]">
            Griechisch-Italienisches Restaurant
          </p>
          <h1 className="hero-rise hero-rise-2 display hero-title mt-5 text-white">La Bella Elena</h1>
          <p className="hero-rise hero-rise-2 display mt-3 text-lg text-white/85 sm:text-2xl">Hohle Gasse · Immensee</p>

          <p className="hero-rise hero-rise-3 mt-6 text-[0.9rem] leading-relaxed text-white/75 sm:text-base">
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
          </p>

          <div className="hero-rise hero-rise-3 mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link to="/reservierung" className="btn btn-primary">
              Tisch reservieren
            </Link>
            <Link to="/menu" className="btn btn-light">
              Menü entdecken
            </Link>
          </div>
        </div>

        <span className="sr-only">
          La Bella Elena — Restaurant an der Hohlen Gasse in Immensee mit Blick auf die Berge
        </span>
      </section>

      <section className="dest-strip" role="navigation" aria-label="Schnelleinstiege">
        {shortcuts.map((item, index) => (
          <Link
            key={item.key}
            to={item.to}
            state={item.state}
            className="dest-tile"
          >
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
        ))}
      </section>
    </>
  )
}
