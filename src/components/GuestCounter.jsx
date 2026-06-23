import { useState } from 'react'

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value))
}

export default function GuestCounter({ label, value, min, max, onChange }) {
  const [draft, setDraft] = useState(null)

  const display = draft !== null ? draft : String(value)

  const decrease = () => {
    setDraft(null)
    onChange(Math.max(min, value - 1))
  }

  const increase = () => {
    setDraft(null)
    onChange(Math.min(max, value + 1))
  }

  const commit = (raw) => {
    setDraft(null)
    const num = parseInt(raw, 10)
    if (Number.isNaN(num)) {
      onChange(min)
      return
    }
    onChange(clamp(num, min, max))
  }

  const handleInput = (e) => {
    const raw = e.target.value.replace(/\D/g, '')
    setDraft(raw)
    if (raw !== '') {
      onChange(clamp(parseInt(raw, 10), min, max))
    }
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-charcoal/10 bg-cream/30 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-sm font-medium text-charcoal">{label}</span>
      <div className="flex items-center justify-end gap-3">
        <button
          type="button"
          onClick={decrease}
          disabled={value <= min}
          aria-label={`${label} verringern`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/15 bg-white text-lg text-charcoal transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>
        <input
          type="text"
          inputMode="numeric"
          aria-label={label}
          value={display}
          onChange={handleInput}
          onBlur={(e) => commit(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') e.target.blur()
          }}
          className="w-10 rounded-lg border border-transparent bg-white/80 py-1 text-center text-lg font-medium text-charcoal outline-none transition-colors focus:border-terracotta/40 focus:ring-2 focus:ring-terracotta/20"
        />
        <button
          type="button"
          onClick={increase}
          disabled={value >= max}
          aria-label={`${label} erhöhen`}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/15 bg-white text-lg text-charcoal transition-colors hover:border-terracotta hover:text-terracotta disabled:cursor-not-allowed disabled:opacity-30"
        >
          +
        </button>
      </div>
    </div>
  )
}
