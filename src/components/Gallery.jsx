import { useState, useEffect, useCallback, useRef } from 'react'
import { galleryImages } from '../data/gallery'

const AUTOPLAY_MS = 5000

export default function Gallery() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const touchStart = useRef(0)
  const thumbStripRef = useRef(null)
  const thumbRefs = useRef([])
  const prefersReducedMotion = useRef(
    typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  )

  const total = galleryImages.length

  const goTo = useCallback((index) => {
    setActive(((index % total) + total) % total)
    setAnimKey((k) => k + 1)
  }, [total])

  const next = useCallback(() => goTo(active + 1), [active, goTo])
  const prev = useCallback(() => goTo(active - 1), [active, goTo])

  useEffect(() => {
    if (!prefersReducedMotion.current) return

    const timer = setInterval(next, AUTOPLAY_MS)
    return () => clearInterval(timer)
  }, [next])

  useEffect(() => {
    const strip = thumbStripRef.current
    const thumb = thumbRefs.current[active]
    if (!strip || !thumb) return

    const targetLeft = thumb.offsetLeft - (strip.clientWidth - thumb.offsetWidth) / 2
    strip.scrollTo({
      left: Math.max(0, targetLeft),
      behavior: 'smooth',
    })
  }, [active])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [next, prev])

  const onZoomComplete = () => {
    if (!prefersReducedMotion.current) next()
  }

  const onTouchStart = (e) => {
    touchStart.current = e.touches[0].clientX
  }

  const onTouchEnd = (e) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
  }

  return (
    <section id="galerie" className="overflow-x-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Galerie
          </p>
          <h2 className="font-display mb-4 text-4xl text-charcoal lg:text-5xl">
            Ein Blick in unsere Küche
          </h2>
          <p className="mx-auto max-w-xl text-charcoal/60">
            Mediterrane Gerichte, frische Zutaten und das warme Ambiente an der Hohlen Gasse.
          </p>
        </div>

        <div
          className="group relative mx-auto max-w-4xl"
          style={{ '--gallery-duration': `${AUTOPLAY_MS}ms` }}
        >
          <div
            className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-charcoal shadow-xl"
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-label="Bildergalerie"
            aria-roledescription="Karussell"
          >
            {galleryImages.map((image, index) => (
              <figure
                key={`${image.alt}-${index}`}
                className={`absolute inset-0 transition-opacity duration-500 ease-out ${
                  index === active ? 'z-10 opacity-100' : 'z-0 opacity-0'
                }`}
                aria-hidden={index !== active}
              >
                <img
                  key={index === active ? `active-${animKey}` : `idle-${index}`}
                  src={image.src}
                  alt={image.alt}
                  className={`h-full w-full object-cover ${
                    index === active ? 'gallery-slide-zoom' : 'scale-100'
                  }`}
                  loading={index <= 1 ? 'eager' : 'lazy'}
                  draggable={false}
                  onAnimationEnd={index === active ? onZoomComplete : undefined}
                />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-charcoal/90 via-charcoal/50 to-transparent px-4 pb-4 pt-12 sm:px-8 sm:pb-6 sm:pt-20">
                  <p className="font-display max-w-xl text-base leading-relaxed text-cream italic sm:text-xl">
                    {image.quote}
                  </p>
                  <p className="mt-2 text-xs tracking-wide text-gold sm:text-sm">
                    — {image.author}
                  </p>
                </figcaption>
              </figure>
            ))}

            <button
              type="button"
              onClick={prev}
              aria-label="Vorheriges Bild"
              className="absolute top-1/2 left-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-charcoal opacity-70 shadow-lg backdrop-blur-sm transition-all hover:bg-cream hover:scale-105 group-hover:opacity-100 sm:left-5 sm:h-11 sm:w-11 sm:opacity-0"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              type="button"
              onClick={next}
              aria-label="Nächstes Bild"
              className="absolute top-1/2 right-3 z-20 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-cream/90 text-charcoal opacity-70 shadow-lg backdrop-blur-sm transition-all hover:bg-cream hover:scale-105 group-hover:opacity-100 sm:right-5 sm:h-11 sm:w-11 sm:opacity-0"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <div className="mt-4 flex justify-center gap-2">
            {galleryImages.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => goTo(index)}
                aria-label={`Bild ${index + 1} anzeigen`}
                aria-current={index === active ? 'true' : undefined}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  index === active
                    ? 'w-8 bg-terracotta'
                    : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'
                }`}
              />
            ))}
          </div>

        </div>

        <div
          ref={thumbStripRef}
          className="gallery-thumb-scroll mt-5 flex gap-2.5 overflow-x-auto scroll-smooth px-1 pb-3 sm:gap-3"
          role="list"
          aria-label="Galerie-Vorschau"
        >
          {galleryImages.map((image, index) => (
            <button
              key={`thumb-${image.alt}-${index}`}
              ref={(el) => { thumbRefs.current[index] = el }}
              type="button"
              onClick={() => goTo(index)}
              aria-label={`Bild ${index + 1} anzeigen`}
              aria-current={index === active ? 'true' : undefined}
              role="listitem"
              className={`gallery-thumb-item relative h-16 w-24 shrink-0 overflow-hidden rounded-lg transition-all duration-300 sm:h-[4.5rem] sm:w-32 ${
                index === active
                  ? 'ring-2 ring-terracotta ring-offset-2 opacity-100'
                  : 'opacity-50 hover:opacity-80'
              }`}
            >
              <img
                src={image.src}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
