import food1 from '../assets/food1.jpg'
import food2 from '../assets/food2.jpg'
import food4 from '../assets/food4.jpg'
import food5 from '../assets/food5.jpg'
import food7 from '../assets/food7.jpg'
import specialfood from '../assets/specialfood.jpg'
import dessert1 from '../assets/dessert1.jpg'
import dessert2 from '../assets/dessert2.jpg'
import dessert3 from '../assets/dessert3.jpg'
import dessert4 from '../assets/dessert4.jpg'
import drinks1 from '../assets/drinks1.jpg'
import place1 from '../assets/place1.jpg'
import place2 from '../assets/place2.jpg'
import place3 from '../assets/place3.jpg'
import place4 from '../assets/place4.jpg'
import place5 from '../assets/place5.jpg'
import outdoor1 from '../assets/outdoor1.jpg'
import outdoor2 from '../assets/outdoor2.jpg'

const quotes = [
  { quote: '«Das Geheimnis des Glücks liegt im Olivenöl und in guten Freunden.»', author: 'Griechisches Sprichwort' },
  { quote: '«L\'appetito vien mangiando.»', author: 'Italienisches Sprichwort' },
  { quote: '«Pasta ist das Lächeln der Nonna auf dem Teller.»', author: 'La Bella Elena' },
  { quote: '«Wo Feuer brennt, da wächst Gemeinschaft.»', author: 'Mediterrane Weisheit' },
  { quote: '«Ein gutes Restaurant fühlt sich an wie Zuhause — nur mit besserem Service.»', author: 'Unbekannt' },
  { quote: '«Una faccia, una razza — ob Griechenland oder Italien, am Ende zählt nur: dass es schmeckt wie bei Mamma.»', author: 'Elena, Angelos & Alessio' },
]

function withQuote(index, src, alt) {
  const { quote, author } = quotes[index % quotes.length]
  return { src, alt, quote, author }
}

export const galleryImages = [
  withQuote(0, food1, 'Lamm mit Ofenkartoffeln und Pommes'),
  withQuote(1, food2, 'Gyros-Teller mit Souvlaki und Pita'),
  withQuote(2, food4, 'Gyros-Platte mit Tzatziki und Salat'),
  withQuote(3, food5, 'Frisch aus unserer Küche'),
  withQuote(4, food7, 'Mediterrane Spezialität'),
  withQuote(5, specialfood, 'Lammkoteletts mit Pasta und Kartoffeln'),
  withQuote(0, dessert1, 'Dessert mit Beeren-Coulis'),
  withQuote(1, dessert2, 'Süsser Abschluss'),
  withQuote(2, dessert3, 'Hausgemachtes Dessert'),
  withQuote(3, dessert4, 'Dolce della casa'),
  withQuote(4, drinks1, 'Erfrischende Cocktails auf der Terrasse'),
  withQuote(5, place1, 'Gedeckter Speisesaal mit maritimem Ambiente'),
  withQuote(0, place2, 'Gemütlicher Innenbereich'),
  withQuote(1, place3, 'Runder Tisch im warmen Licht'),
  withQuote(2, place4, 'Unser Restaurant-Interieur'),
  withQuote(3, place5, 'Elegante Tischdekoration'),
  withQuote(4, outdoor1, 'Terrasse unter dem Baumdach'),
  withQuote(5, outdoor2, 'Aussenbereich an der Hohlen Gasse'),
]
