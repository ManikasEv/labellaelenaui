import { Link } from 'react-router-dom'
import {
  formattedAddress,
  fullAddressLine,
  mapsDirectionsUrl,
  mapsEmbedUrl,
  mapsSearchUrl,
  restaurantLocation,
  restaurantPhone,
  whatsappUrl,
} from '../data/location'

export default function Standort() {
  return (
    <>
      <section className="bg-olive-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-cream/70 uppercase">
            Standort
          </p>
          <h1 className="font-display mb-4 text-3xl text-cream sm:text-4xl lg:text-5xl">
            La Bella Elena an der Hohlen Gasse
          </h1>
          <p className="text-base leading-relaxed text-cream/85 sm:text-lg">
            Griechisch-italienisches Restaurant in Immensee — {formattedAddress}. In der Nähe von{' '}
            {restaurantLocation.region}.
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 sm:px-6 lg:grid-cols-2 lg:items-start">
          <div className="space-y-6">
            <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm">
              <h2 className="font-display mb-4 text-2xl text-charcoal">Adresse & Anfahrt</h2>
              <address className="not-italic leading-relaxed text-charcoal/80">
                <strong className="block text-lg text-charcoal">{restaurantLocation.name}</strong>
                {restaurantLocation.area}
                <br />
                {restaurantLocation.street}
                <br />
                {restaurantLocation.postalCode} {restaurantLocation.city}
                <br />
                {restaurantLocation.canton}, Schweiz
              </address>

              <p className="mt-4 text-sm leading-relaxed text-charcoal/65">
                Suchen Sie ein Restaurant an der <strong>Hohlen Gasse</strong> in{' '}
                <strong>Immensee</strong> oder in der Region <strong>Küssnacht</strong>? Bei La
                Bella Elena an der Artherstrasse 38 erwarten wir Sie mit mediterraner Küche,
                Terrasse und herzlicher Gastfreundschaft.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={mapsDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full bg-terracotta px-5 py-2.5 text-sm font-medium text-cream transition-colors hover:bg-terracotta-dark"
                >
                  Route planen
                </a>
                <a
                  href={mapsSearchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  In Google Maps öffnen
                </a>
                <Link
                  to="/reservierung"
                  className="inline-flex items-center rounded-full border border-charcoal/15 px-5 py-2.5 text-sm font-medium text-charcoal transition-colors hover:border-terracotta hover:text-terracotta"
                >
                  Tisch reservieren
                </Link>
              </div>
            </article>

            <div className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm text-sm text-charcoal/70">
              <h3 className="font-display mb-2 text-lg text-charcoal">Kontakt</h3>
              <p className="mb-2">{fullAddressLine}</p>
              <p>
                Telefon / WhatsApp:{' '}
                <a href={whatsappUrl} className="font-medium text-terracotta hover:underline">
                  {restaurantPhone}
                </a>
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-charcoal/5 bg-white shadow-sm">
            <div className="border-b border-charcoal/5 bg-olive/5 px-5 py-3.5">
              <p className="font-display text-sm text-charcoal">{restaurantLocation.area}</p>
              <p className="text-xs text-charcoal/55">{formattedAddress}</p>
            </div>
            <div className="relative aspect-[4/3] bg-charcoal/5">
              <iframe
                title="La Bella Elena — Restaurant Hohle Gasse Immensee auf Google Maps"
                src={mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
