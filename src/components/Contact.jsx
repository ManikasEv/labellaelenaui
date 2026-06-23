import { Link } from 'react-router-dom'
import { openingHoursCompact as openingHours } from '../data/openingHours'
import {
  restaurantLocation,
  restaurantPhone,
  restaurantEmail,
  whatsappUrl,
  mapsEmbedUrl,
  mapsSearchUrl,
  mapsDirectionsUrl,
} from '../data/location'

export default function Contact() {
  return (
    <section id="kontakt" className="bg-cream py-24 lg:py-16">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-12 text-center lg:mb-8">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Kontakt
          </p>
          <h2 className="font-display mb-3 text-4xl text-charcoal lg:mb-2 lg:text-4xl">Wo sind wir?</h2>
          <p className="mx-auto max-w-xl text-sm text-charcoal/60 lg:text-base">
            Besuchen Sie uns an der Hohlen Gasse in Immensee — wir freuen uns auf Ihren Besuch.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:items-start lg:gap-8">
          <div className="flex flex-col gap-5">
            <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm lg:p-5">
              <h3 className="font-display mb-4 text-lg text-charcoal">Adresse</h3>
              <dl className="space-y-4 text-sm">
                <div>
                  <dt className="mb-1 text-xs font-medium tracking-wide text-charcoal/45 uppercase">
                    Restaurant
                  </dt>
                  <dd className="text-charcoal/80">
                    {restaurantLocation.name}<br />
                    {restaurantLocation.street}<br />
                    {restaurantLocation.postalCode} {restaurantLocation.city}
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs font-medium tracking-wide text-charcoal/45 uppercase">
                    WhatsApp
                  </dt>
                  <dd>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-charcoal transition-colors hover:text-terracotta"
                    >
                      {restaurantPhone}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="mb-1 text-xs font-medium tracking-wide text-charcoal/45 uppercase">
                    E-Mail
                  </dt>
                  <dd>
                    <a
                      href={`mailto:${restaurantEmail}`}
                      className="font-medium text-charcoal transition-colors hover:text-terracotta"
                    >
                      {restaurantEmail}
                    </a>
                  </dd>
                </div>
              </dl>

              <Link
                to="/reservierung"
                className="mt-6 inline-flex w-full items-center justify-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark sm:w-auto"
              >
                Jetzt reservieren
              </Link>
            </div>

            <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm lg:p-5">
              <h3 className="font-display mb-3 text-lg text-charcoal">Öffnungszeiten</h3>
              <ul className="space-y-1.5">
                {openingHours.map((entry) => (
                  <li
                    key={entry.label}
                    className="flex items-baseline justify-between gap-3 text-sm"
                  >
                    <span
                      className={`shrink-0 font-medium ${
                        entry.closed ? 'text-charcoal/45' : 'text-charcoal'
                      }`}
                    >
                      {entry.label}
                    </span>
                    <span
                      className={`text-right tabular-nums leading-snug ${
                        entry.closed ? 'italic text-charcoal/40' : 'text-charcoal/65'
                      }`}
                    >
                      {entry.hours}
                    </span>
                  </li>
                ))}
              </ul>
              <p className="mt-3 text-xs text-charcoal/50">
                Reservierungen bis 21:30 Uhr möglich.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-sm">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/5 bg-olive/5 px-5 py-3.5">
              <div>
                <p className="font-display text-sm text-charcoal">{restaurantLocation.area}</p>
                <p className="text-xs text-charcoal/55">
                  {restaurantLocation.street}, {restaurantLocation.city}
                </p>
              </div>
              <a
                href={mapsDirectionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full bg-terracotta px-4 py-2 text-xs font-medium text-cream transition-colors hover:bg-terracotta-dark"
              >
                Route planen
                <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative aspect-[4/3] bg-charcoal/5 lg:aspect-[16/11]">
              <iframe
                title="La Bella Elena auf Google Maps"
                src={mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/5 px-5 py-3">
              <p className="text-xs text-charcoal/50">
                Parkplätze direkt am Restaurant verfügbar.
              </p>
              <a
                href={mapsSearchUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-terracotta transition-colors hover:text-terracotta-dark"
              >
                In Google Maps öffnen
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
