import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD).
 * Gültig ab 00:00 Ortszeit am validFrom-Tag bis einschliesslich validUntil.
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w39',
    validFrom: '2026-09-28',
    validUntil: '2026-10-04',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Rindsbratwurst 200 gr. mit Rösti und Zwiebelsauce',
        description: 'Metzgerei Zgraggen Fabio & Beni',
        price: '22.50',
      },
      {
        name: 'Rigatoni alla boscaiola',
        description: 'Champignons, Erbsen, Schinken, Rahm und Tomaten',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w40',
    validFrom: '2026-10-05',
    validUntil: '2026-10-11',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Scaloppine di pollo ai funghi mit Tagliatelle',
        description: 'Pouletschnitzel mit Champignons und Tagliatelle',
        price: '22.50',
      },
      {
        name: 'Gnocchi alla sorrentina',
        description: 'Mit Tomate und Mozzarella',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w41',
    validFrom: '2026-10-12',
    validUntil: '2026-10-18',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Scaloppine di maiale',
        description: 'Schweineschnitzel mit Weinsauce und Kartoffeln',
        price: '22.50',
      },
      {
        name: 'Spaghetti alla bolognese',
        price: '19.50',
      },
    ],
  },
]

function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

export function getActiveLunchWeek(date = new Date()) {
  const today = toLocalDateStr(date)

  // Matches from 00:00 local on validFrom through the end of validUntil.
  return (
    lunchMenuWeeks.find((week) => {
      if (today < week.validFrom) return false
      if (week.validUntil && today > week.validUntil) return false
      return true
    }) ?? null
  )
}

export function getLunchMenuForDate(date = new Date()) {
  const dayIndex = date.getDay()
  const closed = isWeekdayClosed(dayIndex)
  const week = getActiveLunchWeek(date)

  return {
    closed,
    week,
    dateLabel: date.toLocaleDateString('de-CH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    dayName: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'][
      dayIndex
    ],
  }
}
