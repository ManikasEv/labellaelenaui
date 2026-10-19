import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD).
 * Gültig ab 00:00 Ortszeit am validFrom-Tag bis einschliesslich validUntil.
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w43',
    validFrom: '2026-10-19',
    validUntil: '2026-10-25',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Würzig-italienische Salsiccia',
        description: 'Mit Pommes frites und hausgemachter Bratensauce',
        price: '22.50',
      },
      {
        name: 'Mousaka vegetarisch',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w44',
    validFrom: '2026-10-26',
    validUntil: '2026-11-01',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Hausgemachte Hacktätschli',
        description: 'Verfeinert mit Cheddar, serviert auf luftigem Kartoffelpüree',
        price: '22.50',
      },
      {
        name: 'Spaghetti pomodoro',
        price: '19.50',
      },
    ],
  },
  {
    id: '2026-w45',
    validFrom: '2026-11-02',
    validUntil: '2026-11-08',
    starter: {
      name: 'Suppe oder Salat',
    },
    mains: [
      {
        name: 'Ossobuco mit Risotto',
        price: '22.50',
      },
      {
        name: 'Rigatoni quattro formaggi',
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
