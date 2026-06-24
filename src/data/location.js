export const restaurantLocation = {
  name: 'La Bella Elena',
  street: 'Artherstrasse 38',
  postalCode: '6405',
  city: 'Immensee',
  area: 'Hohle Gasse',
  region: 'Küssnacht am Rigi',
  canton: 'Schwyz',
  lat: 47.0906627,
  lng: 8.4511155,
}

export const restaurantPhone = '+41 41 850 13 13'
export const restaurantPhoneTel = '+41418501313'

export const restaurantEmail = 'labellaelena.hohlegasse@gmail.com'

export const whatsappUrl = 'https://wa.me/41418501313'

export const formattedAddress = `${restaurantLocation.street}, ${restaurantLocation.postalCode} ${restaurantLocation.city}`

export const fullAddressLine = `${restaurantLocation.name}, ${restaurantLocation.area}, ${formattedAddress}`

export const localSeoNames = [
  'La Bella Elena',
  'Restaurant Hohle Gasse Immensee',
  'Restaurant Hohle Gasse Küssnacht',
  'Griechisch-Italienisches Restaurant Immensee',
]

const query = encodeURIComponent(
  `${restaurantLocation.name}, ${restaurantLocation.street}, ${restaurantLocation.postalCode} ${restaurantLocation.city}, Switzerland`,
)

export const mapsEmbedUrl =
  `https://www.google.com/maps?q=${restaurantLocation.lat},${restaurantLocation.lng}&hl=de&z=17&output=embed`

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${query}`

export const mapsDirectionsUrl =
  `https://www.google.com/maps/dir/?api=1&destination=${restaurantLocation.lat},${restaurantLocation.lng}`
