import { Link } from 'react-router-dom'
import MedSeaWaves from './MedSeaWaves'

export default function ReservationHero() {
  return (
    <section className="relative flex min-h-[45vh] items-center justify-center overflow-hidden pt-24">
      <div className="absolute inset-0 bg-gradient-to-br from-olive-dark via-olive to-terracotta/60" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_20%,rgba(141,212,232,0.22),transparent_55%)]" />
      <MedSeaWaves />

      <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
        <p className="mb-3 text-sm font-medium tracking-[0.3em] text-cream/80 uppercase">
          Reservierung
        </p>
        <h1 className="font-display mb-4 text-4xl text-cream sm:text-5xl lg:text-6xl">
          Tisch reservieren
        </h1>
        <p className="mx-auto max-w-xl text-lg text-cream/80">
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
