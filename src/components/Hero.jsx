import { Link } from 'react-router-dom'
import heroImage from '../assets/hero.jpg'
import { restaurantPhone, whatsappUrl } from '../data/location'
import { scrollToSection } from '../utils/scrollToSection'

export default function Hero() {
  return (
    <section className="flex h-[100dvh] w-full min-h-0 flex-col">
      {/* 70% — full-width image canvas, aspect ratio preserved (resizeMode: contain) */}
      <div className="relative h-[70%] min-h-0 w-full shrink-0 bg-olive-dark">
        <img
          src={heroImage}
          alt="La Bella Elena — Restaurant an der Hohlen Gasse in Immensee mit Blick auf die Berge"
          className="size-full object-contain object-center"
          fetchPriority="high"
          decoding="async"
        />
      </div>

      {/* 30% — text and actions (separate from image, no overlay crop) */}
      <div className="relative flex h-[30%] min-h-0 shrink-0 flex-col items-center justify-center overflow-y-auto bg-gradient-to-b from-olive-dark to-charcoal px-4 py-3 text-center sm:px-6">
        <p className="mb-1 text-[10px] font-medium tracking-[0.2em] text-cream/75 uppercase sm:mb-2 sm:text-xs sm:tracking-[0.28em]">
          Griechisch-Italienisches Restaurant
        </p>

        <h1 className="font-display mb-1 text-2xl leading-tight text-cream sm:mb-2 sm:text-4xl lg:text-5xl">
          La Bella Elena
        </h1>

        <p className="mx-auto mb-1 max-w-xl text-xs leading-snug text-cream/85 sm:mb-2 sm:text-sm sm:leading-relaxed lg:text-base">
          Hohle Gasse · Artherstrasse 38, 6405 Immensee
        </p>

        <p className="mb-2 text-xs text-cream/65 sm:mb-3 sm:text-sm">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            WhatsApp · {restaurantPhone}
          </a>
        </p>

        <div className="flex w-full max-w-md flex-col items-stretch justify-center gap-2 sm:max-w-none sm:flex-row sm:items-center sm:gap-3">
          <Link
            to="/reservierung"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl sm:px-7 sm:py-3 sm:text-base"
          >
            Tisch reservieren
          </Link>
          <a
            href="#menu"
            onClick={(event) => {
              event.preventDefault()
              scrollToSection('menu')
            }}
            className="inline-flex items-center justify-center rounded-full border-2 border-cream/40 px-5 py-2.5 text-sm font-medium text-cream transition-all hover:border-cream hover:bg-cream/10 sm:px-7 sm:py-3 sm:text-base"
          >
            Menü entdecken
          </a>
        </div>

        <p className="mt-2 hidden max-w-lg text-xs italic leading-relaxed text-cream/55 sm:mt-3 sm:block sm:text-sm">
          «Una faccia, una razza — ob Griechenland oder Italien, am Ende zählt nur: dass es schmeckt wie bei Mamma.»
        </p>

        <a
          href="#uber-uns"
          onClick={(event) => {
            event.preventDefault()
            scrollToSection('uber-uns')
          }}
          aria-label="Weiter scrollen"
          className="absolute right-4 bottom-2 text-cream/40 transition-colors hover:text-cream sm:bottom-3"
        >
          <svg className="h-5 w-5 animate-bounce" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
