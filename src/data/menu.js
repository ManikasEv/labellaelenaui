export const menuCategories = [
  {
    id: 'antipasti',
    title: 'Antipasti — Meze',
    items: [
      {
        name: 'Antipasto Misto',
        description: 'Vorspeisen Teller',
        price: '28.00',
      },
      {
        name: 'Bruschette con Burrata, Sardelle e Scorza di Limone',
        description: 'Bruschetta mit Burrata, Sardellen und Zitronenschale',
        price: '15.00',
      },
      {
        name: 'Bruschette al Pomodoro',
        description: 'Tomatenbruschetta',
        price: '12.00',
      },
      {
        name: 'Caprese di Bufala',
        description: 'Tomaten mit Büffelmozzarella',
        price: '19.00',
      },
      {
        name: 'Tzatziki',
        description: 'Joghurt-Dip mit Gurken, Knoblauch und Dill',
        price: '8.00',
        tags: ['vegetarian', 'glutenFree'],
      },
      {
        name: 'Tirokafteri',
        description: 'Pikanter Schafskäse-Dip',
        price: '8.50',
        tags: ['vegetarian', 'glutenFree'],
      },
      {
        name: 'Meze-Teller',
        description: 'Tzatziki, Tirokafteri, Dolmadakia, Bohnensalat, Feta, Pita',
        price: '26.00',
        tags: ['vegetarian'],
      },
      {
        name: 'Dolmadakia',
        description: 'Hausgemachte Weinblätter gefüllt mit Reis',
        price: '12.00',
        tags: ['vegan', 'lactoseFree', 'glutenFree'],
      },
      {
        name: 'Bougiourdi',
        description: 'Auflauf mit Feta, Tomaten, scharfer Paprika und Oregano',
        price: '14.00',
        tags: ['vegetarian', 'glutenFree'],
      },
      {
        name: 'Chtapodi Scharas',
        description: 'Grillierter Oktopus',
        price: '15.00',
        tags: ['lactoseFree', 'glutenFree'],
      },
      {
        name: 'Garides Saganaki',
        description: 'Crevetten in Tomatensauce und Feta',
        price: '18.00',
      },
      {
        name: 'Pita-Brot',
        description: 'Mit Salz und Oregano',
        price: '2.00',
      },
    ],
  },
  {
    id: 'insalate',
    title: 'Insalate',
    items: [
      {
        name: 'Insalata Verde',
        description: 'Grüner Salat',
        price: '10.00',
        tags: ['vegan', 'lactoseFree'],
      },
      {
        name: 'Insalata Mista',
        description: 'Gemischter Salat',
        price: '11.00',
        tags: ['vegan', 'lactoseFree'],
      },
      {
        name: 'Choriatiki Salata',
        description: 'Griechischer Bauernsalat (mit oder ohne Gerstenzwieback)',
        prices: [
          { label: 'Klein (2 Pers.)', price: '15.50' },
          { label: 'Gross (4 Pers.)', price: '19.50' },
        ],
        tags: ['vegetarian', 'glutenFree'],
      },
    ],
  },
  {
    id: 'zuppe',
    title: 'Zuppe',
    items: [
      {
        name: 'Zuppa del Giorno',
        description: 'Tagessuppe',
        price: '9.00',
        tags: ['vegetarian', 'glutenFree'],
      },
    ],
  },
  {
    id: 'pasta',
    title: 'Pasta',
    items: [
      {
        name: 'Lasagne (fatte in casa)',
        description: 'Hausgemachte Lasagne',
        price: '25.50',
      },
      {
        name: 'Spaghetti aglio, olio e peperoncino',
        description: 'Spaghetti mit Knoblauch, Olivenöl und Peperoncino',
        price: '22.00',
        tags: ['vegetarian'],
      },
      {
        name: 'Gnocchi di patate al ragù e pesto (fatti in casa)',
        description: 'Hausgemachte Gnocchi mit Rindsragout und Basilikumpesto',
        price: '31.00',
      },
      {
        name: 'Spaghetti alla pescatora',
        description: 'Spaghetti mit Fisch und Meeresfrüchten',
        price: '32.00',
      },
    ],
  },
  {
    id: 'kreas-pesce',
    title: 'Kreas & Pesce',
    note: 'Fangfrische Meeresfische im Ganzen bereiten wir gerne auf individuelle Vorbestellung für Sie vor.',
    items: [
      {
        name: 'Scaloppine di vitello al limone',
        description: 'Kalbsschnitzel mit Zitronensauce, Gemüse und Bratkartoffeln',
        price: '41.00',
      },
      {
        name: 'Saltimbocca di vitello alla romana',
        description: 'Kalbsschnitzel mit Parmaschinken, Salbei mit Safranrisotto und Gemüse',
        price: '42.00',
      },
      {
        name: 'Rombo al forno',
        description: 'Steinbutt mit Ofenkartoffeln und Gemüse',
        price: '52.00',
        tags: ['glutenFree'],
      },
      {
        name: 'Orata alla mediterranea',
        description: 'Dorade mit Mediterraner-Sauce, Gemüse und Tagliatelle',
        price: '48.00',
      },
      {
        name: 'Gyros',
        description: 'Schweinefleisch vom Drehspiess. Beilagen: Pommes, Tzatziki und Pita-Brot',
        price: '34.00',
      },
      {
        name: 'Bifteki',
        description: 'Gegrillte Hackfleischspezialität. Beilagen: Ofenkartoffel nach Hausrezept. Option: Mit Feta gefüllt +2.00',
        price: '34.00',
        tags: ['glutenFree'],
      },
      {
        name: 'Moussakas',
        description: 'Hausgemachte Kartoffel-, Rinderhackfleisch- und Auberginenauflauf und Tzatziki',
        price: '34.00',
      },
      {
        name: 'Arni sti Gastra',
        description: 'Lamm im Römertopf nach Hausrezept. Beilagen: Kartoffeln, Karotten und Zwiebeln im Römertopf',
        price: '46.00',
        tags: ['lactoseFree', 'glutenFree'],
      },
      {
        name: 'Mix-Teller Calimera',
        description: 'Gemischte Fleischplatte. Beilagen: Pommes, Tzatziki, Pita-Brot (ohne Tzatziki laktosefrei)',
        price: '52.00',
      },
      {
        name: 'Kalamarakia Tiganita',
        description: 'Frittierte Calamari mit Ofengemüse',
        price: '34.00',
      },
      {
        name: 'Mix-Fischplatte Castrignano dei Greci',
        description: 'Mit frischem Fisch des Tages',
        price: '64.00',
        tags: ['lactoseFree'],
      },
    ],
  },
]

export const originDeclaration = [
  { product: 'Rind', origin: 'Argentinien' },
  { product: 'Rindsentrecôte', origin: 'Schweiz' },
  { product: 'Kalb', origin: 'Schweiz' },
  { product: 'Lamm', origin: 'Neuseeland' },
  { product: 'Schwein', origin: 'Schweiz' },
  { product: 'Poulet', origin: 'Schweiz' },
  { product: 'Wolfsbarsch', origin: 'Italien' },
  { product: 'Dorade', origin: 'Italien' },
  { product: 'Steinbutt', origin: 'Nordöstlicher Atlantik und Ostsee' },
  { product: 'Calamari', origin: 'Mittelmeer und Schwarzes Meer' },
  { product: 'Oktapus', origin: 'Östlicher Indischer Ozean' },
  { product: 'Crevetten', origin: 'Südwestatlantik (Argentinien) / Mittelmeer und Schwarzes Meer' },
  { product: 'Anchovis', origin: 'Mittelmeer' },
]

export const dietaryTagLabels = {
  vegan: 'Vegan',
  vegetarian: 'Vegetarisch',
  lactoseFree: 'Laktosefrei',
  glutenFree: 'Glutenfrei',
}
