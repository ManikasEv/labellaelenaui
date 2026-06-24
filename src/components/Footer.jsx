import { Link, useLocation, useNavigate } from 'react-router-dom'
import { showHeuteMenu } from '../data/dailyDishes'
import { restaurantPhone, restaurantEmail, whatsappUrl } from '../data/location'
import { getSectionId, scrollToSection } from '../utils/scrollToSection'

const footerLinks = [
  { href: '/#uber-uns', label: 'Über uns' },
  { href: '/#galerie', label: 'Galerie' },
  { href: '/#menu', label: 'Menü' },
  ...(showHeuteMenu ? [{ href: '/#menu-heute', label: 'Heute' }] : []),
  { href: '/#kontakt', label: 'Kontakt' },
  { href: '/standort', label: 'Standort' },
  { href: '/reservierung', label: 'Reservierung' },
]

export default function Footer() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const navigate = useNavigate()

  const handleFooterNav = (event, href) => {
    const sectionId = getSectionId(href)
    if (!sectionId) return

    event.preventDefault()

    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } })
      return
    }

    scrollToSection(sectionId)
  }

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
              {footerLinks.map((link) => {
                const sectionId = getSectionId(link.href)

                if (sectionId) {
                  return (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        onClick={(event) => handleFooterNav(event, link.href)}
                        className="text-sm transition-colors hover:text-gold"
                      >
                        {link.label}
                      </a>
                    </li>
                  )
                }

                return (
                  <li key={link.href}>
                    <Link
                      to={link.href}
                      className="text-sm transition-colors hover:text-gold"
                    >
                      {link.label}
                    </Link>
                  </li>
                )
              })}
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
