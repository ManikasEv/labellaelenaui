import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { siteUrl, siteDescription, siteTitle } from '../data/site'
import { standortMeta } from '../data/restaurantSchema'

const pageMeta = {
  '/': {
    title: siteTitle,
    description: siteDescription,
  },
  '/reservierung': {
    title: 'Tisch reservieren — La Bella Elena, Hohle Gasse Immensee',
    description:
      'Reservieren Sie Ihren Tisch bei La Bella Elena an der Hohlen Gasse, Artherstrasse 38, 6405 Immensee.',
  },
  '/standort': standortMeta,
}

function getCanonicalUrl(pathname) {
  if (!pathname || pathname === '/') return `${siteUrl}/`
  return `${siteUrl}${pathname}`
}

export default function SeoHead() {
  const { pathname } = useLocation()

  useEffect(() => {
    const meta = pageMeta[pathname] || pageMeta['/']
    const canonicalUrl = getCanonicalUrl(pathname)

    document.title = meta.title

    const descriptionTag = document.querySelector('meta[name="description"]')
    if (descriptionTag) descriptionTag.content = meta.description

    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = canonicalUrl

    const ogUrl = document.querySelector('meta[property="og:url"]')
    if (ogUrl) ogUrl.content = canonicalUrl

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.content = meta.title

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.content = meta.description

    const twitterTitle = document.querySelector('meta[name="twitter:title"]')
    if (twitterTitle) twitterTitle.content = meta.title

    const twitterDescription = document.querySelector('meta[name="twitter:description"]')
    if (twitterDescription) twitterDescription.content = meta.description
  }, [pathname])

  return null
}
