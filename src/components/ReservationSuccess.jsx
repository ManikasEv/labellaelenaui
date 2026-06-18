import { Link } from 'react-router-dom'
import { restaurantPhone, whatsappUrl } from '../data/location'

export default function ReservationSuccess({ reference }) {
  return (
    <section className="bg-cream py-16 lg:py-24">
      <div className="mx-auto max-w-2xl px-6 text-center lg:px-8">
        <div className="rounded-3xl border border-olive/20 bg-white p-10 shadow-sm lg:p-14">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-olive/10 text-3xl">
            ✓
          </div>

          <h2 className="font-display mb-4 text-3xl text-charcoal lg:text-4xl">
            Ihre Reservierung wurde erfolgreich übermittelt
          </h2>

          <p className="mb-2 text-lg leading-relaxed text-charcoal/70">
            Vielen Dank! Ihre Reservierung ist bestätigt. Sie erhalten in Kürze eine Bestätigung per E-Mail.
          </p>

          {reference && (
            <p className="mb-6 text-sm text-charcoal/50">
              Referenznummer: <span className="font-medium text-olive">{reference}</span>
            </p>
          )}

          <p className="mb-8 text-sm leading-relaxed text-charcoal/50">
            Sollten Sie Fragen haben oder Ihre Reservierung ändern möchten, schreiben Sie uns per WhatsApp unter{' '}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-terracotta hover:underline"
            >
              {restaurantPhone}
            </a>.
          </p>

          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/"
              className="inline-flex rounded-full bg-terracotta px-8 py-3 font-medium text-cream transition-colors hover:bg-terracotta-dark"
            >
              Zur Startseite
            </Link>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex rounded-full border border-charcoal/20 px-8 py-3 font-medium text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
            >
              Per WhatsApp schreiben
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
