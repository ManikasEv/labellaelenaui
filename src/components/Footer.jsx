import { Link } from 'react-router-dom'
import { allSiteNavLinks } from '../data/siteNavigation'
import { restaurantPhone, restaurantEmail, whatsappUrl } from '../data/location'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-charcoal/10 bg-white text-charcoal">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8 sm:py-16">
        <div className="grid gap-10 md:grid-cols-[1.3fr_0.8fr_1fr]">
          <div>
            <p className="display text-3xl text-charcoal">La Bella Elena</p>
            <p className="mt-1.5 text-[0.6rem] font-medium tracking-[0.3em] text-charcoal/55 uppercase">
              Griechisch-Italienisches Restaurant
            </p>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-charcoal/70">
              Griechisch-Italienisches Restaurant an der Hohlen Gasse, Artherstrasse 38, 6405
              Immensee.
            </p>
          </div>

          <div>
            <p className="mb-4 text-[0.68rem] font-medium tracking-[0.18em] text-charcoal/45 uppercase">Navigation</p>
            <ul className="space-y-2">
              {allSiteNavLinks.map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className="nav-link text-sm text-charcoal/80 transition-colors hover:text-charcoal">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-[0.68rem] font-medium tracking-[0.18em] text-charcoal/45 uppercase">Kontakt</p>
            <ul className="space-y-2 text-sm">
              <li className="text-charcoal/80">Artherstrasse 38, 6405 Immensee</li>
              <li>
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="display text-lg text-charcoal transition-colors hover:text-terracotta">
                  {restaurantPhone}
                </a>
              </li>
              <li>
                <a href={`mailto:${restaurantEmail}`} className="break-all text-charcoal/80 transition-colors hover:text-terracotta">
                  {restaurantEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-charcoal/10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-5 py-5 text-xs text-charcoal/55 sm:flex-row sm:px-8">
          <p>© {year} Pellekara GmbH · La Bella Elena. Alle Rechte vorbehalten.</p>
          <Link to="/impressum" className="tracking-[0.14em] text-charcoal/70 uppercase transition-colors hover:text-terracotta">
            Impressum
          </Link>
        </div>
      </div>
    </footer>
  )
}
