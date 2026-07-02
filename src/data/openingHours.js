// dayOfWeek: 0 = Sonntag, 1 = Montag, … 6 = Samstag

const WEEKDAY_PERIODS = [
  { open: '11:30', close: '14:30', kitchenClose: '14:30' },
  { open: '18:00', close: '23:30', kitchenClose: '21:30' },
]

const SUNDAY_PERIODS = [
  { open: '11:00', close: '14:00', kitchenClose: '14:00' },
  { open: '17:30', close: '22:00', kitchenClose: '20:30' },
]

export const weeklySchedule = {
  0: SUNDAY_PERIODS,
  1: WEEKDAY_PERIODS,
  2: [],
  3: [],
  4: WEEKDAY_PERIODS,
  5: WEEKDAY_PERIODS,
  6: WEEKDAY_PERIODS,
}

/** Schweizer Feiertage (gleiche Zeiten wie Sonntag). */
const PUBLIC_HOLIDAYS = new Set([
  '2025-01-01',
  '2025-04-18',
  '2025-04-21',
  '2025-05-29',
  '2025-06-09',
  '2025-08-01',
  '2025-12-25',
  '2025-12-26',
  '2026-01-01',
  '2026-04-03',
  '2026-04-06',
  '2026-05-14',
  '2026-05-25',
  '2026-08-01',
  '2026-12-25',
  '2026-12-26',
  '2027-01-01',
  '2027-03-26',
  '2027-03-29',
  '2027-05-06',
  '2027-05-17',
  '2027-08-01',
  '2027-12-25',
  '2027-12-26',
])

const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']

function formatDayHours(periods) {
  if (!periods?.length) return 'Geschlossen'
  return periods.map((p) => `${p.open} – ${p.close}`).join(' · ')
}

export const openingHoursDisplay = [
  {
    day: 'Montag, Donnerstag – Samstag',
    hours: formatDayHours(WEEKDAY_PERIODS),
    closed: false,
    periods: WEEKDAY_PERIODS.map((p) => `${p.open} – ${p.close}`),
  },
  {
    day: 'Dienstag & Mittwoch',
    hours: 'Geschlossen',
    closed: true,
    periods: [],
  },
  {
    day: 'Sonntag & Feiertage',
    hours: formatDayHours(SUNDAY_PERIODS),
    closed: false,
    periods: SUNDAY_PERIODS.map((p) => `${p.open} – ${p.close}`),
  },
]

function formatPeriodLines(periods) {
  if (!periods?.length) return ['Geschlossen']
  return periods.map((p) => `${p.open} – ${p.close}`)
}

export const openingHoursCompact = [
  {
    days: ['Montag'],
    label: 'Mo',
    hours: formatDayHours(WEEKDAY_PERIODS),
    periodLines: formatPeriodLines(WEEKDAY_PERIODS),
    closed: false,
  },
  {
    days: ['Dienstag', 'Mittwoch'],
    label: 'Di–Mi',
    hours: 'Geschlossen',
    periodLines: ['Geschlossen'],
    closed: true,
  },
  {
    days: ['Donnerstag', 'Freitag', 'Samstag'],
    label: 'Do–Sa',
    hours: formatDayHours(WEEKDAY_PERIODS),
    periodLines: formatPeriodLines(WEEKDAY_PERIODS),
    closed: false,
  },
  {
    days: ['Sonntag'],
    label: 'So & Feiertage',
    hours: formatDayHours(SUNDAY_PERIODS),
    periodLines: formatPeriodLines(SUNDAY_PERIODS),
    closed: false,
  },
]

const SLOT_INTERVAL = 30

export function toLocalDateStr(date) {
  const y = date.getFullYear()
  const m = String(date.getMonth() + 1).padStart(2, '0')
  const d = String(date.getDate()).padStart(2, '0')
  return `${y}-${m}-${d}`
}

function toMinutes(time) {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function toTime(minutes) {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

export function isPublicHoliday(dateStr) {
  return PUBLIC_HOLIDAYS.has(dateStr)
}

export function usesSundayHours(dateStr) {
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  return day === 0 || isPublicHoliday(dateStr)
}

export function getPeriodsForDate(dateStr) {
  if (isPublicHoliday(dateStr)) return SUNDAY_PERIODS
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  return weeklySchedule[day] ?? []
}

function generateSlots(period) {
  const slots = []
  let current = toMinutes(period.open)
  const last = toMinutes(period.kitchenClose)

  while (current <= last) {
    slots.push(toTime(current))
    current += SLOT_INTERVAL
  }

  return slots
}

export function isOpenOnDate(dateStr) {
  return getPeriodsForDate(dateStr).length > 0
}

export function isBlockedOnDate(dateStr, blockedDates = []) {
  return blockedDates.includes(dateStr)
}

export function isClosedOnDate(dateStr, blockedDates = []) {
  return !isOpenOnDate(dateStr) || isBlockedOnDate(dateStr, blockedDates)
}

export function isWeekdayClosed(jsDayOfWeek) {
  return jsDayOfWeek === 2 || jsDayOfWeek === 3
}

export function getTimeSlotsForDate(dateStr, blockedDates = []) {
  if (isClosedOnDate(dateStr, blockedDates)) return []

  const slots = getPeriodsForDate(dateStr).flatMap((period) => generateSlots(period))

  const today = toLocalDateStr(new Date())
  if (dateStr !== today) return slots

  const now = new Date()
  const nowMinutes = now.getHours() * 60 + now.getMinutes()

  return slots.filter((slot) => toMinutes(slot) > nowMinutes)
}

export function getAvailableDates(daysAhead = 90, blockedDates = []) {
  const dates = []
  const cursor = new Date()
  cursor.setHours(12, 0, 0, 0)

  for (let i = 0; i < daysAhead; i++) {
    const dateStr = toLocalDateStr(cursor)
    if (!isClosedOnDate(dateStr, blockedDates)) {
      const slots = getTimeSlotsForDate(dateStr, blockedDates)
      if (slots.length > 0) dates.push(dateStr)
    }
    cursor.setDate(cursor.getDate() + 1)
  }

  return dates
}

export function formatDateLabel(dateStr) {
  const label = new Date(`${dateStr}T12:00:00`).toLocaleDateString('de-CH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
  return isPublicHoliday(dateStr) ? `${label} (Feiertag)` : label
}

export function getTimeSlotGroups(dateStr, blockedDates = []) {
  const available = getTimeSlotsForDate(dateStr, blockedDates)
  if (!available.length) return []

  const periods = getPeriodsForDate(dateStr)
  const groups = []

  periods.forEach((period) => {
    const periodSlots = generateSlots(period)
    const slots = available.filter((slot) => periodSlots.includes(slot))
    if (!slots.length) return

    const label = periods.length === 1
      ? 'Verfügbare Zeiten'
      : toMinutes(period.open) < 15 * 60
        ? 'Mittagessen'
        : 'Abendessen'

    groups.push({ label, slots })
  })

  return groups
}

export function getLastKitchenClose(dateStr) {
  const periods = getPeriodsForDate(dateStr)
  const dinner = periods[periods.length - 1]
  return dinner?.kitchenClose ?? '21:30'
}
