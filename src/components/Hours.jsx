import { Link } from 'react-router-dom'
import { openingHoursDisplay } from '../data/openingHours'
import hoursImage from '../assets/outdoor1.jpg'

/** Opening hours beside a tall portrait photo — the reference's "Öffnungszeiten" row. */
export default function Hours() {
  return (
    <section id="oeffnungszeiten" className="bg-cream py-14 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
          <div className="order-2 lg:order-1 lg:pr-8">
            <h2 className="display display-lg text-charcoal">Öffnungszeiten</h2>
            <p className="subtitle mt-4 text-charcoal/85">Hohle Gasse · Immensee</p>

            <dl className="hours-table mt-7 max-w-md sm:mt-8">
              {openingHoursDisplay.map((entry) => (
                <div key={entry.day} className="contents">
                  <dt className={entry.closed ? 'is-closed' : ''}>{entry.day}</dt>
                  <dd className={entry.closed ? 'is-closed' : ''}>
                    {entry.closed
                      ? entry.hours
                      : entry.periods.map((p) => (
                          <span key={p} className="block">
                            {p}
                          </span>
                        ))}
                  </dd>
                </div>
              ))}
            </dl>

            <div className="mt-8 flex flex-col gap-3 sm:mt-9 sm:flex-row sm:flex-wrap">
              <Link to="/reservierung" className="btn btn-primary min-h-12 w-full sm:w-auto">
                Tisch reservieren
              </Link>
              <Link to="/standort" className="btn btn-outline min-h-12 w-full sm:w-auto">
                Standort
              </Link>
            </div>
          </div>

          <figure className="img-zoom order-1 m-0 overflow-hidden rounded-[0.55rem] sm:rounded-none lg:order-2">
            <img
              src={hoursImage}
              alt="Terrasse unter dem Baumdach"
              className="block aspect-[5/4] h-auto w-full object-cover sm:aspect-[4/5]"
              loading="lazy"
            />
          </figure>
        </div>
      </div>
    </section>
  )
}
