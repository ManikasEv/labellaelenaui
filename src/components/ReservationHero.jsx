import { Link } from 'react-router-dom'
import MedSeaWaves from './MedSeaWaves'

export default function ReservationHero() {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-terracotta/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(141,212,232,0.22),transparent_55%)]" />
      <MedSeaWaves />

      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
        <p className="mb-3 text-xs font-medium tracking-[0.22em] text-cream/80 uppercase sm:text-sm sm:tracking-[0.3em]">
          Reservierung
        </p>
        <h1 className="font-display mb-4 text-3xl text-cream sm:text-5xl lg:text-6xl">
          Tisch reservieren
        </h1>
        <p className="mx-auto max-w-xl text-base leading-relaxed text-cream/80 sm:text-lg">
          Wir freuen uns auf Ihren Besuch. Füllen Sie das Formular aus — wir bestätigen Ihre Reservierung so bald wie möglich.
        </p>
        <Link
          to="/"
          className="mt-6 inline-block text-sm text-cream/60 transition-colors hover:text-gold"
        >
          ← Zurück zur Startseite
        </Link>
      </div>
    </section>
  )
}
