import { restaurantImageAlt } from '../data/site'

/** Stable public URLs so Google can index homepage images for search thumbnails. */
export default function SeoCrawlImages() {
  return (
    <div className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" aria-hidden="true">
      <img src="/images/search-preview.jpg" alt={restaurantImageAlt} width={1200} height={630} />
      <img src="/images/restaurant.jpg" alt={restaurantImageAlt} width={1290} height={1720} />
      <img src="/favicon-192.png" alt="La Bella Elena Logo" width={192} height={192} />
    </div>
  )
}
