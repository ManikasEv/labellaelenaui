import { showHeuteMenu } from './dailyDishes'
import { siteUrl } from './site'

/** Homepage sections — each has its own URL for SEO / Google sitelinks. */
export const homeSectionLinks = [
  { path: '/uber-uns', label: 'Über uns', sectionId: 'uber-uns' },
  { path: '/galerie', label: 'Galerie', sectionId: 'galerie' },
  { path: '/menu', label: 'Menü', sectionId: 'menu' },
  ...(showHeuteMenu
    ? [{ path: '/menu-heute', label: 'Heute', sectionId: 'menu-heute' }]
    : []),
  { path: '/kontakt', label: 'Kontakt', sectionId: 'kontakt' },
]

export const topLevelLinks = [
  { path: '/reservierung', label: 'Reservierung' },
  { path: '/standort', label: 'Standort' },
]

export const allSiteNavLinks = [...homeSectionLinks, ...topLevelLinks]

export const sectionPaths = new Set(homeSectionLinks.map((link) => link.path))

export const sectionMeta = {
  '/uber-uns': {
    title: 'Über uns — La Bella Elena, Restaurant Hohle Gasse Immensee',
    description:
      'Elena, Angelos und Alessio — griechisch-italienisches Restaurant an der Hohlen Gasse, Artherstrasse 38, 6405 Immensee.',
  },
  '/galerie': {
    title: 'Galerie — La Bella Elena, Restaurant Immensee',
    description:
      'Ein Blick in unsere Küche und das Restaurant La Bella Elena an der Hohlen Gasse in Immensee.',
  },
  '/menu': {
    title: 'Menü — La Bella Elena, Griechisch-Italienisches Restaurant Immensee',
    description:
      'Speisekarte von La Bella Elena: mediterrane Gerichte, griechische und italienische Küche in Immensee.',
  },
  '/menu-heute': {
    title: 'Heute im Angebot — La Bella Elena, Immensee',
    description: 'Tagesgerichte und aktuelle Angebote bei La Bella Elena an der Hohlen Gasse.',
  },
  '/kontakt': {
    title: 'Kontakt — La Bella Elena, Artherstrasse 38, Immensee',
    description:
      'Kontakt und Öffnungszeiten: La Bella Elena, Hohle Gasse, Artherstrasse 38, 6405 Immensee. Tel. +41 41 850 13 13.',
  },
}

export function getSiteNavigationSchema() {
  return {
    '@type': 'ItemList',
    '@id': `${siteUrl}/#sitenavigation`,
    name: 'La Bella Elena Navigation',
    itemListElement: allSiteNavLinks.map((link, index) => ({
      '@type': 'SiteNavigationElement',
      position: index + 1,
      name: link.label,
      url: `${siteUrl}${link.path}`,
    })),
  }
}
