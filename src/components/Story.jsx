import { Link } from 'react-router-dom'

const quote =
  '«Una faccia, una razza — ob Griechenland oder Italien, am Ende zählt nur: dass es schmeckt wie bei Mamma.»'

/** Full-width dark band: brand mark on the left, the house motto on the right. */
export default function Story() {
  return (
    <section className="bg-charcoal py-16 text-white sm:py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div className="flex justify-center lg:justify-start">
            <img
              src="/logo.png"
              alt="La Bella Elena"
              width={400}
              height={240}
              loading="lazy"
              className="h-auto w-56 opacity-95 sm:w-64 lg:w-72"
            />
          </div>

          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.18em] text-white/55 uppercase">
              Griechisch-Italienisches Restaurant
            </p>
            <p className="display display-lg text-white">{quote}</p>
            <p className="mt-5 text-sm text-white/60">Elena, Angelos &amp; Alessio</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/reservierung" className="btn btn-light">
                Tisch reservieren
              </Link>
              <Link to="/menu" className="btn btn-light">
                Menü entdecken
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
