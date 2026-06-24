import { Link } from 'react-router-dom'
import { restaurantPhone, whatsappUrl } from '../data/location'
import { scrollToSection } from '../utils/scrollToSection'

export default function Hero() {
  return (
    <section className="relative flex min-h-[100dvh] w-full items-center justify-center overflow-hidden">
      <img
        src="/restaurant-cover.jpg"
        alt="La Bella Elena — Restaurant an der Hohlen Gasse in Immensee mit Blick auf die Berge"
        width={1200}
        height={630}
        className="absolute inset-0 size-full object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />
      <div className="absolute inset-0 bg-charcoal/30" />
      <div className="absolute inset-0 bg-gradient-to-b from-olive-dark/70 via-olive/40 to-olive-dark/80" />

      <div className="relative z-10 mx-auto max-w-4xl px-4 py-24 text-center sm:px-6">
        <p className="mb-4 text-xs font-medium tracking-[0.22em] text-cream/80 uppercase sm:text-sm sm:tracking-[0.3em]">
          Griechisch-Italienisches Restaurant
        </p>

        <h1 className="font-display mb-6 text-4xl leading-tight text-cream sm:text-6xl lg:text-7xl">
          La Bella Elena
        </h1>

        <p className="mx-auto mb-2 max-w-xl text-base leading-relaxed text-cream/90 sm:text-lg sm:text-xl">
          Hohle Gasse<br className="sm:hidden" />
          <span className="hidden sm:inline"> · </span>
          Artherstrasse 38, 6405 Immensee
        </p>

        <p className="mb-8 text-sm leading-relaxed text-cream/70 sm:mb-10 sm:text-base">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            WhatsApp · {restaurantPhone}
          </a>
        </p>

        <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-3 sm:mx-auto sm:max-w-none sm:flex-row sm:items-center sm:gap-4">
          <Link
            to="/reservierung"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-6 py-3.5 text-base font-medium text-cream shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl sm:px-8"
          >
            Tisch reservieren
          </Link>
          <a
            href="#menu"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('menu')
            }}
            className="inline-flex items-center justify-center rounded-full border-2 border-cream/40 px-6 py-3.5 text-base font-medium text-cream transition-all hover:border-cream hover:bg-cream/10 sm:px-8"
          >
            Menü entdecken
          </a>
        </div>

        <p className="mt-10 px-2 text-sm italic leading-relaxed text-cream/60 sm:mt-16">
          «Una faccia, una razza — ob Griechenland oder Italien, am Ende zählt nur: dass es schmeckt wie bei Mamma.»
        </p>
      </div>

      <a
        href="#uber-uns"
        onClick={(event) => {
          event.preventDefault()
          scrollToSection('uber-uns')
        }}
        aria-label="Weiter scrollen"
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 animate-bounce text-cream/50 hover:text-cream"
      >
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </a>
    </section>
  )
}
