import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD).
 * Gültig ab 00:00 Ortszeit am validFrom-Tag bis einschliesslich validUntil.
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w46',
    validFrom: '2026-11-09',
    validUntil: '2026-11-15',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Kalbsbratwurst 200 g',
        description: 'Mit cremigem Kartoffelstock und Zwiebelsauce',
        price: '22.50',
      },
      {
        name: 'Cremiges Risotto mit Wirsing',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w47',
    validFrom: '2026-11-16',
    validUntil: '2026-11-22',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Pouletbrust an Safransauce',
        description: 'Mit Kartoffeln und Gemüse',
        price: '22.50',
      },
      {
        name: 'Ravioli Ricotta e Spinaci',
        description: 'An Salbei-Buttersauce',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w48',
    validFrom: '2026-11-23',
    validUntil: '2026-11-29',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Schweinskotelett an Rahmsauce',
        description: 'Mit Tagliatelle und Gemüse',
        price: '22.50',
      },
      {
        name: 'Penne alla Vodka',
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
