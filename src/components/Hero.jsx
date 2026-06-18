import { Link } from 'react-router-dom'
import heroImage from '../assets/place1.jpg'
import { restaurantPhone, whatsappUrl } from '../data/location'

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden lg:min-h-[80vh]">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt=""
          className="h-full w-full scale-105 object-cover object-[center_35%] blur-[2px]"
          fetchPriority="high"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-charcoal/40" />
        <div className="absolute inset-0 bg-gradient-to-b from-olive-dark/85 via-olive/55 to-olive-dark/80" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(22,45,56,0.45),transparent_68%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(141,212,232,0.18),transparent_55%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <p className="mb-4 text-sm font-medium tracking-[0.3em] text-cream/80 uppercase">
          Griechisch-Italienisches Restaurant
        </p>

        <h1 className="font-display mb-6 text-5xl leading-tight text-cream sm:text-6xl lg:text-7xl">
          La Bella Elena
        </h1>

        <p className="mx-auto mb-2 max-w-xl text-lg text-cream/90 sm:text-xl">
          Hohle Gasse · Artherstrasse 38, 6405 Immensee
        </p>

        <p className="mb-10 text-cream/70">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-gold"
          >
            WhatsApp · {restaurantPhone}
          </a>
        </p>

        <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            to="/reservierung"
            className="inline-flex items-center rounded-full bg-terracotta px-8 py-3.5 text-base font-medium text-cream shadow-lg transition-all hover:bg-terracotta-dark hover:shadow-xl"
          >
            Tisch reservieren
          </Link>
          <a
            href="#menu"
            className="inline-flex items-center rounded-full border-2 border-cream/40 px-8 py-3.5 text-base font-medium text-cream transition-all hover:border-cream hover:bg-cream/10"
          >
            Menü entdecken
          </a>
        </div>

        <p className="mt-16 text-sm italic text-cream/60">
          «Una faccia, una razza — ob Griechenland oder Italien, am Ende zählt nur: dass es schmeckt wie bei Mamma.»
        </p>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <a href="#uber-uns" aria-label="Weiter scrollen" className="text-cream/50 hover:text-cream">
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  )
}
