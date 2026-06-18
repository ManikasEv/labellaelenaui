import { isWeekdayClosed } from './openingHours'

export const showHeuteMenu = false

export const weekdays = [
  'Sonntag',
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
]

export const weekdayOrder = [1, 2, 3, 4, 5, 6, 0]

export const courseLabels = {
  soup: 'Suppe',
  main: 'Hauptgericht',
  dessert: 'Dessert',
}

export const dailyMenuPrice = '18.50'

export const dailyDishesByDay = {
  0: {
    soup: { name: 'Avgolemono', description: 'Griechische Zitronen-Hühnersuppe' },
    main: { name: 'Arni sto Fourno', description: 'Im Ofen gebratenes Lamm mit Rosmarinkartoffeln', price: '24.50' },
    dessert: { name: 'Loukoumades', description: 'Honig-Küchlein mit Zimt', price: '7.50' },
  },
  1: {
    soup: { name: 'Minestrone', description: 'Italienische Gemüsesuppe mit Pesto' },
    main: { name: 'Pollo alla Cacciatora', description: 'Hähnchen in Tomaten-Paprikasauce mit Reis', price: '22.00' },
    dessert: { name: 'Tiramisu', description: 'Hausgemacht nach Alessios Rezept', price: '8.00' },
  },
  2: {
    soup: { name: 'Fasolada', description: 'Griechische Bohnensuppe mit Kräutern' },
    main: { name: 'Gemüselasagne', description: 'Saisonales Gemüse, Béchamel, Parmesan', price: '20.50' },
    dessert: { name: 'Panna Cotta', description: 'Vanille mit Waldbeeren', price: '7.50' },
  },
  3: {
    soup: { name: 'Tomatensuppe', description: 'Cremig mit Basilikum und Croutons' },
    main: { name: 'Souvlaki-Teller', description: 'Schweinelende, Tzatziki, Pommes, Salat', price: '21.50' },
    dessert: { name: 'Baklava', description: 'Walnuss-Honig-Blätterteig', price: '8.00' },
  },
  4: {
    soup: { name: 'Zuppa di Pesce', description: 'Leichte Fischsuppe mit Safran' },
    main: { name: 'Spaghetti alle Vongole', description: 'Venusmuscheln, Weisswein, Petersilie', price: '23.50' },
    dessert: { name: 'Cannoli', description: 'Ricotta, Pistazien, Schokolade', price: '8.50' },
  },
  5: {
    soup: { name: 'Linsensuppe', description: 'Mit Kreuzkümmel und Zitrone' },
    main: { name: 'Gyros-Pita-Teller', description: 'Schwein, Zwiebeln, Tzatziki, Pommes', price: '22.50' },
    dessert: { name: 'Galaktoboureko', description: 'Griechischer Milchpudding', price: '8.00' },
  },
  6: {
    soup: { name: 'Ribollita', description: 'Toskanische Brot-Gemüsesuppe' },
    main: { name: 'Ossobuco', description: 'Kalbshaxe, Risotto Milanese, Gremolata', price: '28.00' },
    dessert: { name: 'Affogato', description: 'Vanilleeis mit heissem Espresso', price: '7.00' },
  },
}

export function getTodayDishes(date = new Date()) {
  const dayIndex = date.getDay()
  const isClosed = isWeekdayClosed(dayIndex)

  return {
    dayIndex,
    dayName: weekdays[dayIndex],
    date: date.toLocaleDateString('de-CH', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }),
    dishes: isClosed ? null : dailyDishesByDay[dayIndex],
    menuPrice: dailyMenuPrice,
    isClosed,
  }
}
