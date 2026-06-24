import { restaurantImageAlt } from '../data/site'

/** Visible cover image for Google search thumbnail signals (near top of homepage). */
export default function RestaurantCoverImage() {
  return (
    <figure className="w-full bg-olive-dark">
      <img
        src="/restaurant-cover.jpg"
        alt={restaurantImageAlt}
        width={1200}
        height={630}
        className="mx-auto block h-auto w-full max-h-[min(42vh,420px)] object-cover object-center"
        fetchPriority="high"
        decoding="async"
      />
    </figure>
  )
}
