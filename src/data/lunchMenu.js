import { isWeekdayClosed } from './openingHours'

/**
 * Wöchentliches Mittagsmenü — neue Woche einfach oben eintragen.
 * validFrom / validUntil: ISO-Datum (YYYY-MM-DD), validUntil optional (offen).
 */
export const lunchMenuWeeks = [
  {
    id: '2026-w28',
    validFrom: '2026-07-06',
    validUntil: '2026-07-13',
    label: 'Diese Woche · ab 7. Juli 2026',
    starter: {
      name: 'Gemischter Salat oder Suppe',
    },
    mains: [
      {
        name: 'Piccata alla Milanese',
        description:
          'Zarte Schweineschnitzel (CH) in einer knusprigen Ei-Parmesan-Hülle goldgelb gebraten, serviert auf unseren hausgemachten Spaghetti an einer fruchtigen Tomatensauce',
        price: '22.50',
      },
      {
        name: 'Lasagne vegane',
        price: '19.50',
        tags: ['vegan'],
      },
    ],
    dessert: {
      name: 'Tages Dessert',
      price: '5.00',
    },
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
