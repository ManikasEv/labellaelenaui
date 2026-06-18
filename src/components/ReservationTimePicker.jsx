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
    <div className="flex h-full flex-col rounded-2xl border border-charcoal/10 bg-cream/20 p-5">
      <div className="mb-5 border-b border-charcoal/10 pb-4">
        <p className="text-xs font-medium tracking-wider text-terracotta uppercase">
          Uhrzeit
        </p>
        <p className="font-display mt-1 text-lg text-charcoal">
          {formatDateLabel(date)}
        </p>
      </div>

      <div className="space-y-5">
        {groups.map((group) => (
          <div key={group.label}>
            <p className="mb-2.5 text-xs font-medium text-charcoal/60">
              {group.label}
            </p>
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
              {group.slots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => onChange(slot)}
                  className={`rounded-xl px-2 py-2.5 text-sm font-medium transition-all ${
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
