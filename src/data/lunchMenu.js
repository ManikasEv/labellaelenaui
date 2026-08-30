import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD), validUntil optional (offen).
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w34',
    validFrom: '2026-08-24',
    validUntil: '2026-08-30',
    label: 'Diese Woche · 24. – 30. August 2026',
    starter: {
      name: 'Salat oder Suppe',
    },
    mains: [
      {
        name: 'Poulet Schnitzel mit Pommes',
        price: '22.50',
      },
      {
        name: 'Rigatoni mit Pesto',
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

  const current = lunchMenuWeeks.find((week) => {
    if (today < week.validFrom) return false
    if (week.validUntil && today > week.validUntil) return false
    return true
  })

  if (current) return current

  // Show the next upcoming week if none is active yet
  return lunchMenuWeeks.find((week) => today < week.validFrom) ?? null
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
