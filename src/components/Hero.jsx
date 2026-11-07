import { Link } from 'react-router-dom'
import { restaurantPhone, restaurantEmail, whatsappUrl } from '../data/location'
import { topLevelLinks } from '../data/siteNavigation'

const menuShortcuts = [
  { label: 'Speisekarte', section: 'karte' },
  { label: 'Monatsspezialitäten', section: 'sommer' },
  { label: 'Mittagsmenü', section: 'tages' },
]

function Chevron() {
  return (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2} aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  )
}

export default function Hero() {
  return (
    <>
      {/* Full-viewport hero: photo fills the screen, shaded so the text reads */}
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

        <div className="hero-scroll hero-rise hero-rise-3" aria-hidden="true">
          <span />
        </div>
      </section>

      {/* Contact shortcuts + quick links — directly under the hero */}
      <section className="bg-white">
        <div className="flex justify-center gap-3 pt-10 sm:pt-12">
          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="icon-circle" aria-label={`WhatsApp · ${restaurantPhone}`}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 5.5A2.5 2.5 0 015.5 3h2.1a1 1 0 01.95.68l1.1 3.3a1 1 0 01-.25 1.03L8.1 9.3a12.5 12.5 0 006.6 6.6l1.3-1.3a1 1 0 011.03-.25l3.3 1.1a1 1 0 01.68.95v2.1A2.5 2.5 0 0118.5 21 15.5 15.5 0 013 5.5z" />
            </svg>
          </a>
          <a href={`mailto:${restaurantEmail}`} className="icon-circle" aria-label={restaurantEmail}>
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.5 6.5h17v11h-17z M3.5 7l8.5 6 8.5-6" />
            </svg>
          </a>
        </div>

        <div className="mx-auto max-w-5xl px-5 pt-7 pb-8 sm:pt-8 sm:pb-10">
          <div className="flex flex-wrap justify-center gap-2.5">
            {menuShortcuts.map((item) => (
              <Link key={item.section} to="/menu" state={{ menuSection: item.section }} className="pill-link">
                {item.label}
                <Chevron />
              </Link>
            ))}
            {topLevelLinks.map((link) => (
              <Link key={link.path} to={link.path} className="pill-link">
                {link.label}
                <Chevron />
              </Link>
            ))}
          </div>
        </div>

        <Link to="/uber-uns" aria-label="Weiter scrollen" className="sr-only">
          Weiter scrollen
        </Link>
      </section>
    </>
  )
}
