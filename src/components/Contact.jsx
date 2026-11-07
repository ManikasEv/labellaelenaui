import { Link } from 'react-router-dom'
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
    <section id="kontakt" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-14">
          <h2 className="title-rule display display-lg text-charcoal">
            <span>Kontakt</span>
          </h2>
          <p className="subtitle mt-5 text-charcoal/85">La Bella Elena — Hohlen Gasse in Immensee</p>
          <p className="mx-auto mt-4 max-w-xl text-[0.95rem] leading-relaxed text-charcoal/70">
            Restaurant an der Hohlen Gasse in Immensee — Artherstrasse 38, 6405 Immensee.
            Griechisch-italienische Küche nahe Küssnacht am Rigi.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-stretch">
          <div className="contact-card flex flex-col p-7 sm:p-9">
            <h3 className="display text-2xl text-charcoal">Adresse</h3>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="mb-1 text-[0.68rem] font-medium tracking-[0.18em] text-charcoal/45 uppercase">Restaurant</dt>
                <dd className="text-[0.95rem] leading-relaxed text-charcoal/85">
                  {restaurantLocation.name}<br />
                  {restaurantLocation.street}<br />
                  {restaurantLocation.postalCode} {restaurantLocation.city}
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.68rem] font-medium tracking-[0.18em] text-charcoal/45 uppercase">WhatsApp</dt>
                <dd>
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="display text-xl text-charcoal transition-colors hover:text-terracotta">
                    {restaurantPhone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="mb-1 text-[0.68rem] font-medium tracking-[0.18em] text-charcoal/45 uppercase">E-Mail</dt>
                <dd>
                  <a href={`mailto:${restaurantEmail}`} className="break-all text-[0.95rem] text-charcoal transition-colors hover:text-terracotta">
                    {restaurantEmail}
                  </a>
                </dd>
              </div>
            </dl>

            <div className="mt-auto pt-8">
              <Link to="/reservierung" className="btn btn-primary w-full sm:w-auto">
                Jetzt reservieren
              </Link>
            </div>
          </div>

          <div className="contact-card flex flex-col overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-charcoal/8 px-6 py-4">
              <div>
                <p className="display text-lg text-charcoal">{restaurantLocation.area}</p>
                <p className="text-xs text-charcoal/55">
                  {restaurantLocation.street}, {restaurantLocation.city}
                </p>
              </div>
              <a href={mapsDirectionsUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline px-3.5 py-2 text-xs">
                Route planen
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            <div className="relative min-h-[18rem] flex-1 bg-charcoal/5">
              <iframe
                title="La Bella Elena auf Google Maps"
                src={mapsEmbedUrl}
                className="absolute inset-0 h-full w-full border-0"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-charcoal/8 px-6 py-4">
              <p className="text-xs text-charcoal/55">Parkplätze direkt am Restaurant verfügbar.</p>
              <a href={mapsSearchUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-terracotta transition-colors hover:text-terracotta-dark">
                In Google Maps öffnen
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
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
