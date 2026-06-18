export default function MedSeaWaves() {
  return (
    <svg
      className="pointer-events-none absolute bottom-0 left-0 w-full text-cream/20"
      viewBox="0 0 1440 120"
      preserveAspectRatio="none"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M0,64 C240,96 480,32 720,64 C960,96 1200,32 1440,64 L1440,120 L0,120 Z" />
      <path
        d="M0,80 C200,48 400,96 600,72 C800,48 1000,88 1440,72 L1440,120 L0,120 Z"
        className="text-gold/25"
        fill="currentColor"
      />
    </svg>
  )
}
