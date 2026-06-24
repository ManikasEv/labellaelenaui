import { Link } from 'react-router-dom'
import { allSiteNavLinks } from '../data/siteNavigation'
import { restaurantPhone, restaurantEmail, whatsappUrl } from '../data/location'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-charcoal text-cream/70">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <p className="font-display mb-4 text-2xl text-cream">La Bella Elena</p>
            <p className="text-sm leading-relaxed">
              Griechisch-Italienisches Restaurant an der Hohlen Gasse, Artherstrasse 38, 6405
              Immensee.
            </p>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium tracking-wider text-cream uppercase">
              Navigation
            </p>
            <ul className="space-y-2">
              {allSiteNavLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors hover:text-gold"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 text-sm font-medium tracking-wider text-cream uppercase">
              Kontakt
            </p>
            <ul className="space-y-2 text-sm">
              <li>Artherstrasse 38, 6405 Immensee</li>
              <li>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-gold"
                >
                  {restaurantPhone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${restaurantEmail}`}
                  className="break-all transition-colors hover:text-gold"
                >
                  {restaurantEmail}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-cream/10 pt-8 sm:flex-row">
          <p className="text-xs text-cream/40">
            © {year} La Bella Elena. Alle Rechte vorbehalten.
          </p>
          <p className="text-xs italic text-cream/40">
            Una faccia, una razza
          </p>
        </div>
      </div>
    </footer>
  )
}
