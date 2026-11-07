import { useState, useEffect, useCallback, useRef } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { galleryImages } from '../data/gallery'

const GRID_COUNT = 8
const SLIDER_INTERVAL_MS = 4500
const ease = [0.22, 1, 0.36, 1]

function pad(n) {
  return String(n).padStart(2, '0')
}

function ChevronIcon({ direction, className = 'h-4 w-4' }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d={direction === 'left' ? 'M15 19l-7-7 7-7' : 'M9 5l7 7-7 7'}
      />
    </svg>
  )
}

function useSlidesPerView() {
  const [spv, setSpv] = useState(4)
  useEffect(() => {
    const queries = [
      [window.matchMedia('(min-width: 1024px)'), 4],
      [window.matchMedia('(min-width: 640px)'), 2],
    ]
    const update = () => setSpv(queries.find(([mq]) => mq.matches)?.[1] ?? 1)
    update()
    queries.forEach(([mq]) => mq.addEventListener('change', update))
    return () => queries.forEach(([mq]) => mq.removeEventListener('change', update))
  }, [])
  return spv
}

function Lightbox({ index, total, image, onClose, onNext, onPrev, reducedMotion }) {
  const touchStart = useRef(0)
  const fade = reducedMotion ? { duration: 0 } : { duration: 0.25, ease: 'easeOut' }

  return (
    <motion.div
      className="fixed inset-0 z-[90] flex flex-col bg-ink/95 text-white backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-label="Bildergalerie"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={fade}
      onClick={onClose}
    >
      <div className="flex items-center justify-between px-4 pt-4 sm:px-6 sm:pt-6">
        <p className="text-sm tracking-[0.2em] text-white/60 uppercase">
          <span className="text-white">{pad(index + 1)}</span>
          <span className="mx-2">/</span>
          {pad(total)}
        </p>
        <button type="button" onClick={onClose} aria-label="Galerie schliessen" className="lightbox-btn">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.6} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <div
        className="relative flex flex-1 items-center justify-center px-4 py-4 sm:px-20"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => (touchStart.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          const diff = touchStart.current - e.changedTouches[0].clientX
          if (Math.abs(diff) > 50) diff > 0 ? onNext() : onPrev()
        }}
      >
        <button type="button" onClick={onPrev} aria-label="Vorheriges Bild" className="lightbox-btn absolute left-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex">
          <ChevronIcon direction="left" className="h-5 w-5" />
        </button>

        <AnimatePresence mode="wait" initial={false}>
          <motion.img
            key={index}
            src={image.src}
            alt={image.alt}
            className="max-h-[68vh] w-auto max-w-full object-contain select-none sm:max-h-[72vh]"
            draggable={false}
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0 }}
            transition={reducedMotion ? { duration: 0 } : { duration: 0.3, ease }}
          />
        </AnimatePresence>

        <button type="button" onClick={onNext} aria-label="Nächstes Bild" className="lightbox-btn absolute right-3 top-1/2 hidden -translate-y-1/2 sm:inline-flex">
          <ChevronIcon direction="right" className="h-5 w-5" />
        </button>
      </div>

      <div className="mx-auto w-full max-w-3xl px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center sm:px-6 sm:pb-8" onClick={(e) => e.stopPropagation()}>
        <p className="font-display text-base leading-relaxed text-white sm:text-xl">{image.quote}</p>
        <p className="mt-2 text-xs tracking-[0.18em] text-white/60 uppercase sm:text-sm">— {image.author}</p>
        <p className="mt-3 text-xs text-white/45">{image.alt}</p>
        <div className="mt-5 flex items-center justify-center gap-3 sm:hidden">
          <button type="button" onClick={onPrev} aria-label="Vorheriges Bild" className="lightbox-btn">
            <ChevronIcon direction="left" className="h-5 w-5" />
          </button>
          <button type="button" onClick={onNext} aria-label="Nächstes Bild" className="lightbox-btn">
            <ChevronIcon direction="right" className="h-5 w-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

export default function Gallery() {
  const total = galleryImages.length
  const reducedMotion = useReducedMotion()
  const spv = useSlidesPerView()
  const [lightbox, setLightbox] = useState(null)
  const [page, setPage] = useState(0)
  const [paused, setPaused] = useState(false)

  const gridImages = galleryImages.slice(0, GRID_COUNT)
  const sliderImages = galleryImages.slice(GRID_COUNT)
  const pageCount = Math.max(1, Math.ceil(sliderImages.length / spv))

  useEffect(() => {
    setPage((p) => Math.min(p, pageCount - 1))
  }, [pageCount])

  const goPage = useCallback((p) => setPage(((p % pageCount) + pageCount) % pageCount), [pageCount])

  useEffect(() => {
    if (reducedMotion || paused || lightbox !== null || pageCount < 2) return
    const id = window.setTimeout(() => goPage(page + 1), SLIDER_INTERVAL_MS)
    return () => window.clearTimeout(id)
  }, [page, paused, lightbox, reducedMotion, pageCount, goPage])

  const close = useCallback(() => setLightbox(null), [])
  const next = useCallback(() => setLightbox((i) => (i === null ? null : (i + 1) % total)), [total])
  const prev = useCallback(() => setLightbox((i) => (i === null ? null : (i - 1 + total) % total)), [total])

  useEffect(() => {
    if (lightbox === null) return
    const onKey = (e) => {
      if (e.key === 'Escape') close()
      if (e.key === 'ArrowRight') next()
      if (e.key === 'ArrowLeft') prev()
    }
    window.addEventListener('keydown', onKey)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = previousOverflow
    }
  }, [lightbox, close, next, prev])

  const lightboxImage = lightbox === null ? null : galleryImages[lightbox]
  // Each page is one viewport width (slide gaps live inside the slides); the last
  // page is aligned to the end so no empty space shows.
  const firstSlide = Math.min(page * spv, Math.max(0, sliderImages.length - spv))
  const trackX = `${-(firstSlide / spv) * 100}%`

  return (
    <section id="galerie" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Text + 4-column thumbnail grid */}
        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.18em] text-charcoal/50 uppercase">Galerie</p>
            <h2 className="display display-lg text-charcoal">Ein Blick in unsere Küche</h2>
            <p className="mt-6 max-w-md text-[0.95rem] leading-relaxed text-charcoal/75">
              Mediterrane Gerichte, frische Zutaten und das warme Ambiente an der Hohlen Gasse.
            </p>
          </div>

          <div className="gallery-grid">
            {gridImages.map((image, i) => (
              <button
                key={image.src}
                type="button"
                onClick={() => setLightbox(i)}
                aria-label={`${image.alt} — Bild ${i + 1} von ${total} vergrössern`}
                className="gallery-thumb"
              >
                <img src={image.src} alt={image.alt} loading={i < 4 ? 'eager' : 'lazy'} decoding="async" draggable={false} />
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* 4-up slider */}
      {sliderImages.length > 0 && (
        <div
          className="mx-auto mt-14 max-w-[1400px] px-5 sm:mt-20 sm:px-8"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="slider" style={{ '--spv': spv }}>
            {pageCount > 1 && (
              <>
                <button type="button" onClick={() => goPage(page - 1)} aria-label="Vorherige Bilder" className="slider-arrow slider-arrow--prev">
                  <ChevronIcon direction="left" />
                </button>
                <button type="button" onClick={() => goPage(page + 1)} aria-label="Nächste Bilder" className="slider-arrow slider-arrow--next">
                  <ChevronIcon direction="right" />
                </button>
              </>
            )}
            <div className="slider-viewport">
              <motion.div
                className="slider-track"
                animate={{ x: trackX }}
                transition={reducedMotion ? { duration: 0 } : { duration: 0.8, ease }}
              >
                {sliderImages.map((image, k) => {
                  const index = GRID_COUNT + k
                  return (
                    <button
                      key={image.src}
                      type="button"
                      className="slider-slide"
                      onClick={() => setLightbox(index)}
                      aria-label={`${image.alt} — Bild ${index + 1} von ${total} vergrössern`}
                    >
                      <span>
                        <img src={image.src} alt={image.alt} loading="lazy" decoding="async" draggable={false} />
                      </span>
                    </button>
                  )
                })}
              </motion.div>
            </div>
          </div>

          {pageCount > 1 && (
            <div className="slider-dots" role="tablist" aria-label="Bilder blättern">
              {Array.from({ length: pageCount }, (_, i) => (
                <button
                  key={i}
                  type="button"
                  role="tab"
                  aria-selected={i === page}
                  aria-label={`Seite ${i + 1}`}
                  onClick={() => goPage(i)}
                  className={`slider-dot ${i === page ? 'slider-dot--active' : ''}`}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {lightboxImage && (
              <Lightbox
                key="lightbox"
                index={lightbox}
                total={total}
                image={lightboxImage}
                onClose={close}
                onNext={next}
                onPrev={prev}
                reducedMotion={reducedMotion}
              />
            )}
          </AnimatePresence>,
          document.body,
        )}
    </section>
  )
}
