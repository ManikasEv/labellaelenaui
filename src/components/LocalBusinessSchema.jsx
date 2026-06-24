import { getRestaurantSchemaGraph } from '../data/restaurantSchema'

export default function LocalBusinessSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(getRestaurantSchemaGraph()) }}
    />
  )
}
