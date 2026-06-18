// dayOfWeek: 0 = Sonntag, 1 = Montag, … 6 = Samstag
// Leeres Array = geschlossen
export const weeklySchedule = {
  0: [{ open: '11:00', close: '14:00' }, { open: '17:30', close: '22:00' }],
  1: [{ open: '11:30', close: '14:30' }, { open: '18:00', close: '24:00' }],
  2: [],
  3: [],
  4: [{ open: '11:30', close: '14:30' }, { open: '18:00', close: '24:00' }],
  5: [{ open: '11:30', close: '14:30' }, { open: '18:00', close: '24:00' }],
  6: [{ open: '11:30', close: '14:30' }, { open: '18:00', close: '24:00' }],
}

const DAY_NAMES = ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag']
const DISPLAY_ORDER = [1, 2, 3, 4, 5, 6, 0]

function formatCloseTime(close) {
  return close === '24:00' ? '00:00' : close
}

function formatDayHours(periods) {
  if (!periods?.length) return 'Geschlossen'
  return periods.map((p) => `${p.open} – ${formatCloseTime(p.close)}`).join(' · ')
}

export const openingHoursDisplay = DISPLAY_ORDER.map((day) => {
  const periods = weeklySchedule[day] || []

  return {
    day: DAY_NAMES[day],
    hours: formatDayHours(periods),
    closed: !periods.length,
    periods: periods.map((p) => `${p.open} – ${formatCloseTime(p.close)}`),
  }
})

const DAY_ABBREV = {
  Sonntag: 'So',
  Montag: 'Mo',
  Dienstag: 'Di',
  Mittwoch: 'Mi',
  Donnerstag: 'Do',
  Freitag: 'Fr',
  Samstag: 'Sa',
}

const CALENDAR_ORDER = ['Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag', 'Sonntag']

function formatDayGroupLabel(dayNames) {
  const indices = dayNames.map((d) => CALENDAR_ORDER.indexOf(d)).sort((a, b) => a - b)
  const ranges = []
  let rangeStart = indices[0]
  let rangeEnd = indices[0]

  for (let i = 1; i < indices.length; i++) {
    if (indices[i] === rangeEnd + 1) {
      rangeEnd = indices[i]
    } else {
      ranges.push([rangeStart, rangeEnd])
      rangeStart = rangeEnd = indices[i]
    }
  }
  ranges.push([rangeStart, rangeEnd])

  return ranges
    .map(([start, end]) => {
      const from = DAY_ABBREV[CALENDAR_ORDER[start]]
      const to = DAY_ABBREV[CALENDAR_ORDER[end]]
      return start === end ? from : `${from}–${to}`
    })
    .join(', ')
}

export const openingHoursCompact = openingHoursDisplay.reduce((groups, entry) => {
  const last = groups[groups.length - 1]

  if (last && last.hours === entry.hours) {
    last.days.push(entry.day)
    last.label = formatDayGroupLabel(last.days)
    return groups
  }

  groups.push({
    days: [entry.day],
    label: DAY_ABBREV[entry.day] || entry.day.slice(0, 2),
    hours: entry.hours,
    closed: entry.closed,
  })

  return groups
}, [])

export const LAST_RESERVATION_SLOT = '21:30'

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

function generateSlots(open, close) {
  const slots = []
  let current = toMinutes(open)
  const end = toMinutes(close)
  const lastAllowed = toMinutes(LAST_RESERVATION_SLOT)

  while (current + SLOT_INTERVAL <= end) {
    if (current <= lastAllowed) slots.push(toTime(current))
    current += SLOT_INTERVAL
  }

  return slots
}

export function isOpenOnDate(dateStr) {
  const day = new Date(`${dateStr}T12:00:00`).getDay()
  const periods = weeklySchedule[day]
  return Boolean(periods?.length)
}

export function isBlockedOnDate(dateStr, blockedDates = []) {
  return blockedDates.includes(dateStr)
}

export function isClosedOnDate(dateStr, blockedDates = []) {
  return !isOpenOnDate(dateStr) || isBlockedOnDate(dateStr, blockedDates)
}

export function isWeekdayClosed(jsDayOfWeek) {
  return !weeklySchedule[jsDayOfWeek]?.length
}

export function getTimeSlotsForDate(dateStr, blockedDates = []) {
  if (isClosedOnDate(dateStr, blockedDates)) return []

  const day = new Date(`${dateStr}T12:00:00`).getDay()
  const slots = weeklySchedule[day].flatMap((p) => generateSlots(p.open, p.close))

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
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('de-CH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

export function getTimeSlotGroups(dateStr, blockedDates = []) {
  const available = getTimeSlotsForDate(dateStr, blockedDates)
  if (!available.length) return []

  const day = new Date(`${dateStr}T12:00:00`).getDay()
  const periods = weeklySchedule[day]
  const groups = []

  periods.forEach((period) => {
    const periodSlots = generateSlots(period.open, period.close)
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
