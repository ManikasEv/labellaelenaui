import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD).
 * Gültig ab 00:00 Ortszeit am validFrom-Tag bis einschliesslich validUntil.
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w36',
    validFrom: '2026-09-07',
    validUntil: '2026-09-13',
    starter: {
      name: 'Salat oder Suppe',
    },
    mains: [
      {
        name: 'Paniertes Schweinesteak mit Ofenkartoffeln',
        price: '22.50',
      },
      {
        name: 'Rigatoni mit Pilzen, Erbsen und Cherry-Tomaten',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w37',
    validFrom: '2026-09-14',
    validUntil: '2026-09-20',
    starter: {
      name: 'Salat oder Suppe',
    },
    mains: [
      {
        name: 'Lachs in Zitronensauce und Gemüse',
        price: '22.50',
      },
      {
        name: 'Spaghetti aglio olio e peperoncino',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w38',
    validFrom: '2026-09-21',
    validUntil: '2026-09-27',
    starter: {
      name: 'Salat oder Suppe',
    },
    mains: [
      {
        name: 'Spareribs mit Pommes',
        price: '22.50',
      },
      {
        name: 'Risotto mit Gemüse',
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
