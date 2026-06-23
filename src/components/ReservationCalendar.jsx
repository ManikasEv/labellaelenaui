import { useMemo, useState } from 'react'
import { getBlockedDateNotice } from '../data/blockedDateNotices'
import {
  toLocalDateStr,
  isClosedOnDate,
  isWeekdayClosed,
  getTimeSlotsForDate,
} from '../data/openingHours'

const WEEKDAYS = ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So']
const WEEKDAY_JS = [1, 2, 3, 4, 5, 6, 0]

function parseDate(dateStr) {
  const [y, m, d] = dateStr.split('-').map(Number)
  return new Date(y, m - 1, d)
}

function getDayState(dateStr, inMonth, blockedDates) {
  if (!inMonth) return 'hidden'

  const today = toLocalDateStr(new Date())
  if (dateStr < today) return 'past'
  if (isClosedOnDate(dateStr, blockedDates)) return 'closed'

  if (getTimeSlotsForDate(dateStr, blockedDates).length > 0) return 'available'
  return 'unavailable'
}

function buildMonthDays(year, month) {
  const first = new Date(year, month, 1)
  const startPad = (first.getDay() + 6) % 7
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const cells = []

  for (let i = 0; i < startPad; i++) {
    const d = new Date(year, month, -startPad + i + 1)
    cells.push({ dateStr: toLocalDateStr(d), inMonth: false })
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, month, day)
    cells.push({ dateStr: toLocalDateStr(d), inMonth: true })
  }

  while (cells.length % 7 !== 0) {
    const last = parseDate(cells[cells.length - 1].dateStr)
    last.setDate(last.getDate() + 1)
    cells.push({ dateStr: toLocalDateStr(last), inMonth: false })
  }

  return cells
}

const dayStyles = {
  available: 'text-charcoal hover:bg-white hover:text-terracotta',
  selected: 'bg-terracotta text-cream shadow-md',
  today: 'ring-1 ring-terracotta/40',
  past: 'cursor-not-allowed bg-charcoal/[0.03] text-charcoal/20',
  closed: 'calendar-day-closed cursor-not-allowed bg-charcoal/[0.06] text-charcoal/30',
  unavailable: 'cursor-not-allowed bg-charcoal/[0.03] text-charcoal/20',
}

export default function ReservationCalendar({ value, onChange, blockedDates = [] }) {
  const initial = value ? parseDate(value) : new Date()
  const [viewYear, setViewYear] = useState(initial.getFullYear())
  const [viewMonth, setViewMonth] = useState(initial.getMonth())

  const monthLabel = useMemo(
    () => new Date(viewYear, viewMonth, 1).toLocaleDateString('de-CH', { month: 'long', year: 'numeric' }),
    [viewYear, viewMonth],
  )

  const days = useMemo(() => buildMonthDays(viewYear, viewMonth), [viewYear, viewMonth])

  const goMonth = (delta) => {
    const next = new Date(viewYear, viewMonth + delta, 1)
    setViewYear(next.getFullYear())
    setViewMonth(next.getMonth())
  }

  const handleSelect = (dateStr) => {
    if (getDayState(dateStr, true, blockedDates) !== 'available') return
    onChange(dateStr)
  }

  return (
    <div className="min-w-0 rounded-2xl border border-charcoal/10 bg-cream/30 p-3 sm:p-5">
      <div className="mb-4 border-b border-charcoal/10 pb-4">
        <p className="mb-3 text-xs font-medium tracking-wider text-terracotta uppercase">
          Datum
        </p>
        <div className="flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={() => goMonth(-1)}
            aria-label="Vorheriger Monat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white hover:text-terracotta"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <p className="font-display min-w-0 text-center text-base capitalize text-charcoal sm:text-lg">{monthLabel}</p>

          <button
            type="button"
            onClick={() => goMonth(1)}
            aria-label="Nächster Monat"
            className="flex h-9 w-9 items-center justify-center rounded-full text-charcoal transition-colors hover:bg-white hover:text-terracotta"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <div className="mb-2 grid grid-cols-7 gap-1">
        {WEEKDAYS.map((day, i) => {
          const closed = isWeekdayClosed(WEEKDAY_JS[i])
          return (
            <div
              key={day}
              className={`py-1 text-center text-xs font-medium tracking-wide ${
                closed ? 'text-charcoal/25 line-through' : 'text-charcoal/50'
              }`}
            >
              {day}
            </div>
          )
        })}
      </div>

      <div className="grid grid-cols-7 gap-1" role="grid" aria-label="Reservierungskalender">
        {days.map(({ dateStr, inMonth }) => {
          const state = getDayState(dateStr, inMonth, blockedDates)
          const selected = value === dateStr
          const today = dateStr === toLocalDateStr(new Date())
          const clickable = state === 'available'

          const blockedNotice = getBlockedDateNotice(dateStr)
          const ariaLabel = state === 'closed'
            ? blockedNotice || (blockedDates.includes(dateStr)
              ? `${dateStr}, keine Reservierungen möglich`
              : `${dateStr}, geschlossen`)
            : state === 'past'
              ? `${dateStr}, vergangen`
              : dateStr

          return (
            <button
              key={dateStr}
              type="button"
              role="gridcell"
              disabled={!clickable}
              onClick={() => handleSelect(dateStr)}
              aria-label={ariaLabel}
              aria-selected={selected}
              title={
                state === 'closed'
                  ? getBlockedDateNotice(dateStr) ||
                    (blockedDates.includes(dateStr)
                      ? 'Keine Reservierungen möglich'
                      : 'Ruhetag — Restaurant geschlossen')
                  : undefined
              }
              className={[
                'aspect-square min-h-[2.25rem] rounded-lg text-xs font-medium transition-all sm:rounded-xl sm:text-sm',
                state === 'hidden' && 'invisible pointer-events-none',
                selected && dayStyles.selected,
                !selected && state === 'available' && dayStyles.available,
                !selected && state === 'past' && dayStyles.past,
                !selected && state === 'closed' && dayStyles.closed,
                !selected && state === 'unavailable' && dayStyles.unavailable,
                today && !selected && clickable && dayStyles.today,
              ].filter(Boolean).join(' ')}
            >
              {inMonth ? parseDate(dateStr).getDate() : ''}
            </button>
          )
        })}
      </div>

      <div className="overflow-x-touch scrollbar-none mt-4 flex flex-nowrap items-center gap-3 pb-1 text-xs text-charcoal/50 sm:flex-wrap sm:overflow-visible sm:pb-0">
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-terracotta" />
          Ausgewählt
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="calendar-day-closed h-3 w-3 rounded bg-charcoal/[0.06]" />
          Geschlossen
        </span>
        <span className="flex shrink-0 items-center gap-1.5">
          <span className="h-3 w-3 rounded bg-charcoal/[0.03]" />
          Nicht verfügbar
        </span>
      </div>
    </div>
  )
}
