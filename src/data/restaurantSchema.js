import { siteUrl } from './site'
import {
  formattedAddress,
  mapsDirectionsUrl,
  mapsSearchUrl,
  restaurantEmail,
  restaurantLocation,
  restaurantPhoneTel,
} from './location'

export function getRestaurantSchemaGraph() {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${siteUrl}/#website`,
        url: `${siteUrl}/`,
        name: 'La Bella Elena',
        description:
          'Griechisch-Italienisches Restaurant an der Hohlen Gasse, Artherstrasse 38, 6405 Immensee.',
        publisher: { '@id': `${siteUrl}/#restaurant` },
        inLanguage: 'de-CH',
      },
      {
        '@type': 'Restaurant',
        '@id': `${siteUrl}/#restaurant`,
        name: 'La Bella Elena',
        alternateName: [
          'La Bella Elena Hohle Gasse',
          'Restaurant Hohle Gasse Immensee',
          'Restaurant Hohle Gasse Küssnacht',
          'Restaurant Artherstrasse 38 Immensee',
        ],
        description:
          'Griechisch-Italienisches Restaurant an der Hohlen Gasse in Immensee. Artherstrasse 38, 6405 Immensee — in der Nähe von Küssnacht am Rigi.',
        url: `${siteUrl}/`,
        telephone: restaurantPhoneTel,
        email: restaurantEmail,
        image: [
          {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/search-preview.jpg`,
            width: 1200,
            height: 630,
          },
          {
            '@type': 'ImageObject',
            url: `${siteUrl}/images/restaurant.jpg`,
            width: 1290,
            height: 1720,
          },
        ],
        logo: {
          '@type': 'ImageObject',
          url: `${siteUrl}/favicon-192.png`,
          width: 192,
          height: 192,
        },
        address: {
          '@type': 'PostalAddress',
          streetAddress: restaurantLocation.street,
          addressLocality: restaurantLocation.city,
          postalCode: restaurantLocation.postalCode,
          addressRegion: restaurantLocation.canton,
          addressCountry: 'CH',
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: restaurantLocation.lat,
          longitude: restaurantLocation.lng,
        },
        hasMap: mapsSearchUrl,
        menu: `${siteUrl}/#menu`,
        acceptsReservations: true,
        servesCuisine: ['Greek', 'Italian', 'Mediterranean'],
        priceRange: '$$',
        areaServed: [
          { '@type': 'City', name: 'Immensee' },
          { '@type': 'City', name: 'Küssnacht am Rigi' },
        ],
        potentialAction: {
          '@type': 'ReserveAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/reservierung`,
            inLanguage: 'de-CH',
            actionPlatform: [
              'http://schema.org/DesktopWebPlatform',
              'http://schema.org/MobileWebPlatform',
            ],
          },
          result: {
            '@type': 'Reservation',
            name: 'Tischreservierung La Bella Elena',
          },
        },
        openingHoursSpecification: [
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Thursday', 'Friday', 'Saturday'],
            opens: '11:30',
            closes: '14:30',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Thursday', 'Friday', 'Saturday'],
            opens: '18:00',
            closes: '00:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '11:00',
            closes: '14:00',
          },
          {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: 'Sunday',
            opens: '17:30',
            closes: '22:00',
          },
        ],
      },
      {
        '@type': 'FAQPage',
        '@id': `${siteUrl}/#faq`,
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Wo befindet sich La Bella Elena?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `La Bella Elena befindet sich an der Hohlen Gasse, ${formattedAddress}, Schweiz — nahe Küssnacht am Rigi.`,
            },
          },
          {
            '@type': 'Question',
            name: 'Welches Restaurant ist an der Hohlen Gasse in Immensee?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'An der Hohlen Gasse in Immensee finden Sie La Bella Elena — ein griechisch-italienisches Restaurant an der Artherstrasse 38, 6405 Immensee.',
            },
          },
          {
            '@type': 'Question',
            name: 'Wie reserviere ich einen Tisch bei La Bella Elena?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `Reservieren Sie online unter ${siteUrl}/reservierung oder rufen Sie uns an unter +41 41 850 13 13.`,
            },
          },
        ],
      },
      {
        '@type': 'WebPage',
        '@id': `${siteUrl}/standort`,
        url: `${siteUrl}/standort`,
        name: 'Standort — La Bella Elena, Hohle Gasse Immensee',
        description: `Adresse und Anfahrt: La Bella Elena, ${formattedAddress}. Restaurant an der Hohlen Gasse in Immensee.`,
        isPartOf: { '@id': `${siteUrl}/#website` },
        about: { '@id': `${siteUrl}/#restaurant` },
        inLanguage: 'de-CH',
      },
    ],
  }
}

export const standortMeta = {
  title: 'Standort — La Bella Elena, Hohle Gasse Artherstrasse 38, Immensee',
  description: `La Bella Elena, Restaurant an der Hohlen Gasse: ${formattedAddress}. Griechisch-italienisches Restaurant nahe Küssnacht am Rigi. Route planen & Tisch reservieren.`,
}

export const standortDirectionsUrl = mapsDirectionsUrl
