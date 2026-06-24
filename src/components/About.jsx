import aboutImage from '../assets/place5.jpg'

export default function About() {
  return (
    <section id="uber-uns" className="overflow-x-hidden bg-cream py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-16 lg:grid-cols-2">
          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
              Über uns
            </p>
            <h2 className="font-display mb-6 text-4xl text-charcoal lg:text-5xl">
              Zwei Kulturen,<br />ein Spirit.
            </h2>
            <p className="mb-6 text-lg leading-relaxed text-charcoal/70">
              Wir sind Elena, Angelos und Alessio — ein Trio, das so viel mediterranes Temperament
              im Blut hat, dass wir eigentlich eine eigene Stromrechnung bräuchten.
            </p>
            <p className="mb-8 leading-relaxed text-charcoal/70">
              Elena und Angelos wurden praktisch in einer Olivenöl-Wanne getauft, Alessio bringt
              die Pasta-Expertise und die «Dolce Vita»-Power mit. Wir kochen so, wie wir leben:
              laut, herzlich und mit verdammt viel Liebe zum Detail.
            </p>
            <p className="mb-8 leading-relaxed text-charcoal/70">
              Unser Restaurant liegt an der <strong>Hohlen Gasse</strong> in{' '}
              <strong>Immensee</strong> — Artherstrasse 38, nahe Küssnacht am Rigi. Ob Terrasse,
              Familienfeier oder spontanes Mittagessen: bei uns finden Sie mediterrane Küche mit
              Herz.
            </p>

            <div className="flex flex-wrap gap-4">
              {['Elena', 'Angelos', 'Alessio'].map((name) => (
                <div
                  key={name}
                  className="flex items-center gap-3 rounded-2xl border border-olive/20 bg-white px-5 py-3 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-olive/10 font-display text-olive">
                    {name[0]}
                  </div>
                  <span className="font-medium text-charcoal">{name}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="relative overflow-hidden">
            <div className="aspect-[4/5] overflow-hidden rounded-3xl shadow-xl">
              <img
                src={aboutImage}
                alt="Gemütlicher Innenbereich von La Bella Elena"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="absolute -right-2 -bottom-2 -z-10 hidden h-full w-full rounded-3xl bg-terracotta/10 sm:block sm:-right-4 sm:-bottom-4" />
          </div>
        </div>
      </div>
    </section>
  )
}
