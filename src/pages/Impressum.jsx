import {
  restaurantEmail,
  restaurantPhone,
  whatsappUrl,
} from '../data/location'

export default function Impressum() {
  return (
    <>
      <section className="bg-olive-dark py-16 text-center sm:py-20">
        <div className="mx-auto max-w-3xl px-5 sm:px-6">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-cream/70 uppercase">
            Rechtliches
          </p>
          <h1 className="font-display mb-4 text-3xl text-cream sm:text-4xl lg:text-5xl">
            Impressum
          </h1>
          <p className="text-base leading-relaxed text-cream/85 sm:text-lg">
            Angaben gemäss schweizerischem Recht — Pellekara GmbH
          </p>
        </div>
      </section>

      <section className="bg-cream py-12 sm:py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-5 sm:px-6">
          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">Impressum</h2>
            <address className="not-italic leading-relaxed text-charcoal/80">
              <strong className="block text-lg text-charcoal">Pellekara GmbH</strong>
              Artherstrasse 38
              <br />
              6405 Immensee
              <br />
              Schweiz
            </address>
            <dl className="mt-5 space-y-2 text-sm text-charcoal/75">
              <div>
                <dt className="inline font-medium text-charcoal">Handelsregisternummer: </dt>
                <dd className="inline">CH-130.4.036.404-8</dd>
              </div>
              <div>
                <dt className="inline font-medium text-charcoal">
                  Unternehmens-Identifikationsnummer (UID):{' '}
                </dt>
                <dd className="inline">CHE-317.534.760</dd>
              </div>
              <div>
                <dt className="inline font-medium text-charcoal">Mehrwertsteuernummer: </dt>
                <dd className="inline">CHE-317.534.760 MWST</dd>
              </div>
            </dl>
          </article>

          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">
              Vertretungsberechtigte Personen
            </h2>
            <ul className="space-y-1 text-charcoal/80">
              <li>Eleni Karaolani</li>
              <li>Alessio Pellegrino</li>
              <li>Angelos Karaolanis</li>
            </ul>
          </article>

          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">Kontakt</h2>
            <ul className="space-y-2 text-charcoal/80">
              <li>
                E-Mail:{' '}
                <a
                  href={`mailto:${restaurantEmail}`}
                  className="break-all font-medium text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  {restaurantEmail}
                </a>
              </li>
              <li>
                Telefon:{' '}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-terracotta transition-colors hover:text-terracotta-dark"
                >
                  {restaurantPhone}
                </a>
              </li>
            </ul>
          </article>

          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">Haftungsausschluss</h2>
            <p className="leading-relaxed text-charcoal/75">
              Die Pellekara GmbH übernimmt keine Gewähr für die Richtigkeit, Vollständigkeit und
              Aktualität der auf dieser Website bereitgestellten Informationen. Haftungsansprüche
              aufgrund von Schäden, die durch die Nutzung oder Nichtnutzung dieser Website
              entstehen, werden – soweit gesetzlich zulässig – ausgeschlossen.
            </p>
          </article>

          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">Externe Links</h2>
            <p className="leading-relaxed text-charcoal/75">
              Diese Website kann Links zu externen Websites enthalten. Die Pellekara GmbH hat
              keinen Einfluss auf deren Inhalte und übernimmt dafür keine Verantwortung. Für die
              Inhalte und den Datenschutz der verlinkten Websites sind ausschliesslich deren
              Betreiber verantwortlich.
            </p>
          </article>

          <article className="rounded-2xl border border-charcoal/5 bg-white p-6 shadow-sm sm:p-8">
            <h2 className="font-display mb-4 text-2xl text-charcoal">Urheberrecht</h2>
            <p className="leading-relaxed text-charcoal/75">
              Die Inhalte, Bilder und sonstigen Werke dieser Website unterliegen dem
              schweizerischen Urheberrecht. Die Verwendung, Vervielfältigung, Bearbeitung oder
              Weitergabe bedarf der vorherigen schriftlichen Zustimmung der Pellekara GmbH oder
              der jeweiligen Rechteinhaber.
            </p>
          </article>
        </div>
      </section>
    </>
  )
}
