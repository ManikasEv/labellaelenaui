import { getTimeSlotGroups, formatDateLabel } from '../data/openingHours'

export default function ReservationTimePicker({ date, value, onChange, blockedDates = [] }) {
  const groups = date ? getTimeSlotGroups(date, blockedDates) : []

  if (!date) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-dashed border-charcoal/15 bg-cream/20 p-6 text-center text-sm text-charcoal/50">
        Bitte wählen Sie zuerst ein Datum im Kalender.
      </div>
    )
  }

  if (!groups.length) {
    return (
      <div className="flex h-full min-h-[280px] items-center justify-center rounded-2xl border border-charcoal/10 bg-cream/20 p-6 text-center text-sm text-charcoal/50">
        Für dieses Datum sind keine Zeiten mehr verfügbar.
      </div>
    )
  }

  return (
    <div className="flex h-full min-w-0 flex-col rounded-2xl border border-charcoal/10 bg-cream/20 p-4 sm:p-5">
      <div className="mb-4 border-b border-charcoal/10 pb-4 sm:mb-5">
        <p className="text-xs font-medium tracking-wider text-terracotta uppercase">
          Uhrzeit
        </p>
        <p className="font-display mt-1 text-base text-charcoal sm:text-lg">
          {formatDateLabel(date)}
        </p>
      </div>

      <div className="space-y-4 sm:space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2 text-xs font-medium text-charcoal/60 sm:mb-2.5">
              {group.label}
            </p>
            <div className="overflow-x-touch scrollbar-none -mx-1 flex gap-2 px-1 pb-1 sm:mx-0 sm:grid sm:grid-cols-4 sm:gap-2 sm:overflow-visible sm:px-0 sm:pb-0">
              {group.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onChange(slot)}
                  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-medium transition-all sm:shrink sm:px-2 ${
                    value === slot
                      ? 'bg-terracotta text-cream shadow-sm'
                      : 'border border-charcoal/10 bg-white text-charcoal hover:border-terracotta/50 hover:text-terracotta'
                  }`}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
