import MedSeaWaves from './MedSeaWaves'

export default function HeroDecorations() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <MedSeaWaves />

      {/* Olive branch — bottom left */}
      <svg
        className="absolute -bottom-4 -left-2 h-44 w-44 text-cream/25 sm:h-52 sm:w-52 lg:h-64 lg:w-64"
        viewBox="0 0 120 120"
        fill="none"
      >
        <path
          d="M18 98 C34 72 52 58 78 42 C88 35 96 28 104 18"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <ellipse cx="42" cy="68" rx="9" ry="5" fill="#5f7a48" opacity="0.55" transform="rotate(-25 42 68)" />
        <ellipse cx="58" cy="54" rx="8" ry="4.5" fill="#5f7a48" opacity="0.5" transform="rotate(-15 58 54)" />
        <ellipse cx="74" cy="40" rx="7" ry="4" fill="#5f7a48" opacity="0.45" transform="rotate(-8 74 40)" />
        <path d="M36 62 C40 56 46 54 50 58" stroke="#6d8f52" strokeWidth="1.2" opacity="0.6" />
        <path d="M52 48 C56 42 62 40 66 44" stroke="#6d8f52" strokeWidth="1.2" opacity="0.55" />
        <path d="M68 34 C72 28 78 26 82 30" stroke="#6d8f52" strokeWidth="1.2" opacity="0.5" />
      </svg>

      {/* Small olive cluster — top left */}
      <svg
        className="absolute top-16 left-6 h-20 w-20 text-cream/15 sm:left-12 lg:top-20 lg:left-20 lg:h-24 lg:w-24"
        viewBox="0 0 80 80"
        fill="none"
      >
        <path d="M12 58 C24 44 36 36 52 24" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <ellipse cx="28" cy="46" rx="6" ry="3.5" fill="#5f7a48" opacity="0.45" transform="rotate(-20 28 46)" />
        <ellipse cx="40" cy="36" rx="5.5" ry="3" fill="#5f7a48" opacity="0.4" transform="rotate(-10 40 36)" />
      </svg>
    </div>
  )
}
