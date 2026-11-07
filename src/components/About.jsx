import aboutImage from '../assets/place5.jpg'

const team = ['Elena', 'Angelos', 'Alessio']
const teamLine = `${team.slice(0, -1).join(', ')} & ${team[team.length - 1]}`

export default function About() {
  return (
    <section id="uber-uns" className="bg-white py-16 sm:py-20 lg:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <figure className="img-zoom m-0">
            <img
              src={aboutImage}
              alt="Gemütlicher Innenbereich von La Bella Elena"
              className="block aspect-[4/5] h-auto w-full object-cover"
              loading="lazy"
            />
          </figure>

          <div>
            <p className="mb-3 text-sm font-medium tracking-[0.18em] text-charcoal/50 uppercase">Über uns</p>
            <h2 className="display display-lg text-charcoal">
              Zwei Kulturen,
              <br />
              ein Spirit.
            </h2>
            <p className="subtitle mt-4 text-charcoal/85">{teamLine}</p>

            <p className="mt-7 text-[0.95rem] leading-relaxed text-charcoal/75">
              Wir sind Elena, Angelos und Alessio — ein Trio, das so viel mediterranes Temperament
              im Blut hat, dass wir eigentlich eine eigene Stromrechnung bräuchten.
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal/75">
              Elena und Angelos wurden praktisch in einer Olivenöl-Wanne getauft, Alessio bringt
              die Pasta-Expertise und die «Dolce Vita»-Power mit. Wir kochen so, wie wir leben:
              laut, herzlich und mit verdammt viel Liebe zum Detail.
            </p>
            <p className="mt-4 text-[0.95rem] leading-relaxed text-charcoal/75">
              Unser Restaurant liegt an der <strong className="font-semibold text-charcoal">Hohlen Gasse</strong> in{' '}
              <strong className="font-semibold text-charcoal">Immensee</strong> — Artherstrasse 38, nahe Küssnacht am Rigi. Ob Terrasse,
              Familienfeier oder spontanes Mittagessen: bei uns finden Sie mediterrane Küche mit
              Herz.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
