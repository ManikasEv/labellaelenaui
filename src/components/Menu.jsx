import { useEffect, useState } from 'react'
import { menuCategories, originDeclaration, dietaryTagLabels } from '../data/menu'
import { summerMenuItems, summerMenuMeta } from '../data/summerMenu'
import { getLunchMenuForDate } from '../data/lunchMenu'

const tagAbbrev = {
  vegan: 'V',
  vegetarian: 'Vegetarisch',
  lactoseFree: 'LF',
  glutenFree: 'GF',
}

const topSections = [
  { id: 'karte', title: 'Speisekarte' },
  { id: 'sommer', title: 'Sommer-Menü', badge: 'Saison' },
  { id: 'tages', title: 'Mittagsmenü', badge: 'Diese Woche' },
]

function MenuRow({ item }) {
  return (
    <li className="menu-row group">
      {item.prices?.length ? (
        <div className="space-y-2">
          {item.prices.map((entry) => (
            <div key={entry.label} className="menu-row-line">
              <span className="menu-row-name font-display text-charcoal transition-colors group-hover:text-terracotta">
                {item.name}
                <span className="ml-2 font-sans text-xs font-normal text-charcoal/45">
                  {entry.label}
                </span>
              </span>
              <span className="menu-row-leader" aria-hidden="true" />
              <span className="menu-row-price font-display text-terracotta">{entry.price}</span>
            </div>
          ))}
          {item.description && <p className="menu-row-desc">{item.description}</p>}
        </div>
      ) : (
        <>
          <div className="menu-row-line">
            <span className="menu-row-name font-display text-charcoal transition-colors group-hover:text-terracotta">
              {item.name}
            </span>
            {item.price ? (
              <>
                <span className="menu-row-leader" aria-hidden="true" />
                <span className="menu-row-price font-display text-terracotta">{item.price}</span>
              </>
            ) : null}
          </div>
          {item.description && <p className="menu-row-desc">{item.description}</p>}
        </>
      )}
      {item.tags?.length > 0 && (
        <div className="menu-row-tags">
          {item.tags.map((tag) => (
            <span key={tag} title={dietaryTagLabels[tag]}>
              {tagAbbrev[tag]}
            </span>
          ))}
        </div>
      )}
    </li>
  )
}

function LunchMenuPanel() {
  const { closed, week, dateLabel } = getLunchMenuForDate()

  if (closed) {
    return (
      <div className="menu-feature-card py-10 text-center">
        <p className="font-display text-xl text-charcoal/70">{dateLabel}</p>
        <p className="mt-3 text-charcoal/55">Heute haben wir geschlossen.</p>
      </div>
    )
  }

  if (!week) {
    return (
      <div className="menu-feature-card py-10 text-center">
        <p className="font-display text-lg text-charcoal/70">Tagesmenü</p>
        <p className="mt-3 text-sm text-charcoal/55">
          Das aktuelle Mittagsmenü wird in Kürze veröffentlicht.
        </p>
      </div>
    )
  }

  return (
    <div className="menu-feature-card">
      <div className="menu-feature-header">
        <div>
          <p className="menu-feature-eyebrow">Mittagsservice · 11:30 – 14:30</p>
          <h4 className="font-display text-2xl text-charcoal">Mittagsmenü</h4>
        </div>
        <span className="menu-feature-badge">{week.label}</span>
      </div>

      <p className="menu-feature-intro">
        Jede Woche neue Gerichte — Vorspeise, Hauptgericht und Dessert à la carte.
      </p>

      <div className="menu-lunch-grid">
        <article className="menu-lunch-block">
          <p className="menu-lunch-label">Vorspeise</p>
          <p className="font-display text-lg text-charcoal">{week.starter.name}</p>
        </article>

        <div className="menu-lunch-mains">
          <p className="menu-lunch-label">Hauptgerichte</p>
          <div className="space-y-4">
            {week.mains.map((dish) => (
              <article key={dish.name} className="menu-lunch-dish">
                <div className="menu-lunch-dish-head">
                  <h5 className="font-display text-lg text-charcoal">{dish.name}</h5>
                  <span className="menu-lunch-price font-display text-terracotta">
                    <span className="menu-price-currency">CHF</span> {dish.price}
                  </span>
                </div>
                {dish.description && (
                  <p className="menu-lunch-dish-desc">{dish.description}</p>
                )}
                {dish.tags?.includes('vegan') && (
                  <span className="menu-lunch-tag">Vegan</span>
                )}
              </article>
            ))}
          </div>
        </div>

        <article className="menu-lunch-block menu-lunch-dessert">
          <p className="menu-lunch-label">Dessert</p>
          <div className="flex items-baseline justify-between gap-3">
            <p className="font-display text-lg text-charcoal">{week.dessert.name}</p>
            <span className="menu-lunch-price font-display text-terracotta">
              <span className="menu-price-currency">CHF</span> {week.dessert.price}
            </span>
          </div>
        </article>
      </div>
    </div>
  )
}

function SummerMenuPanel() {
  return (
    <div className="menu-feature-card menu-feature-card-summer">
      <div className="menu-feature-header">
        <div>
          <p className="menu-feature-eyebrow">La Bella Elena · Hohle Gasse</p>
          <h4 className="font-display text-3xl text-olive">{summerMenuMeta.title}</h4>
        </div>
        <span className="menu-feature-badge menu-feature-badge-summer">Sommer 2026</span>
      </div>

      <p className="menu-feature-intro">{summerMenuMeta.subtitle}</p>

      <ul className="menu-list">
        {summerMenuItems.map((item) => (
          <MenuRow key={item.name} item={item} />
        ))}
      </ul>

      {summerMenuMeta.note && (
        <p className="menu-summer-note">{summerMenuMeta.note}</p>
      )}
    </div>
  )
}

function OriginDeclaration() {
  const [open, setOpen] = useState(true)

  return (
    <div className="menu-declaration">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="menu-declaration-toggle"
        aria-expanded={open}
      >
        <span className="font-display text-sm text-charcoal/70">Herkunft der Produkte</span>
        <svg
          className={`h-4 w-4 text-charcoal/40 transition-transform ${open ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="menu-declaration-body">
          {originDeclaration.map((entry) => (
            <span key={entry.product} className="menu-declaration-item">
              <strong>{entry.product}</strong> {entry.origin}
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Menu() {
  const [activeSection, setActiveSection] = useState('karte')
  const [activeCategoryId, setActiveCategoryId] = useState(menuCategories[0].id)

  useEffect(() => {
    const hash = window.location.hash
    if (hash === '#menu-sommer') setActiveSection('sommer')
    else if (hash === '#menu-tages' || hash === '#menu-mittag' || hash === '#menu-heute') {
      setActiveSection('tages')
    } else if (hash.startsWith('#menu-')) {
      const catId = hash.replace('#menu-', '')
      const match = menuCategories.find((c) => c.id === catId)
      if (match) {
        setActiveSection('karte')
        setActiveCategoryId(match.id)
      }
    }
  }, [])

  const activeCategory = menuCategories.find((c) => c.id === activeCategoryId) ?? menuCategories[0]

  const handleSectionChange = (id) => {
    setActiveSection(id)
    if (id === 'sommer') window.history.replaceState(null, '', '#menu-sommer')
    else if (id === 'tages') window.history.replaceState(null, '', '#menu-tages')
    else window.history.replaceState(null, '', '#menu')
  }

  const handleCategoryChange = (id) => {
    setActiveCategoryId(id)
    window.history.replaceState(null, '', `#menu-${id}`)
  }

  return (
    <section id="menu" className="overflow-x-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8">
        <div className="mb-10 text-center sm:mb-12">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Speisekarte
          </p>
          <h2 className="font-display mb-3 text-4xl text-charcoal lg:text-5xl">Menù</h2>
          <p className="mx-auto max-w-lg text-sm text-charcoal/55">
            Mittagsservice, Sommer-Spezialitäten und unsere klassische griechisch-italienische Karte.
          </p>
        </div>

        <nav className="menu-section-nav" aria-label="Menübereiche">
          {topSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => handleSectionChange(section.id)}
              className={`menu-section-btn ${
                activeSection === section.id ? 'menu-section-btn-active' : ''
              }`}
              aria-current={activeSection === section.id ? 'true' : undefined}
            >
              <span>{section.title}</span>
              {section.badge && (
                <span className="menu-section-badge">{section.badge}</span>
              )}
            </button>
          ))}
        </nav>

        {activeSection === 'karte' && (
          <nav className="menu-nav scrollbar-none" aria-label="Menükategorien">
            {menuCategories.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleCategoryChange(tab.id)}
                className={`menu-nav-link ${
                  activeCategoryId === tab.id ? 'menu-nav-link-active' : ''
                }`}
                aria-current={activeCategoryId === tab.id ? 'true' : undefined}
              >
                {tab.title.split(' — ')[0]}
              </button>
            ))}
          </nav>
        )}

        <section key={activeSection + activeCategoryId} className="menu-panel">
          {activeSection === 'tages' && <LunchMenuPanel />}
          {activeSection === 'sommer' && <SummerMenuPanel />}
          {activeSection === 'karte' && (
            <>
              <header className="menu-category-header">
                <h3 className="font-display text-2xl text-olive">{activeCategory.title}</h3>
              </header>
              {activeCategory.note && (
                <p className="mb-5 text-center text-xs italic text-charcoal/45">
                  {activeCategory.note}
                </p>
              )}
              <ul className="menu-list">
                {activeCategory.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            </>
          )}
        </section>

        {activeSection === 'karte' && (
          <div className="menu-legend">
            <span title="Vegan">V</span>
            <span title="Vegetarisch">Vegetarisch</span>
            <span title="Laktosefrei">LF</span>
            <span title="Glutenfrei">GF</span>
          </div>
        )}

        <OriginDeclaration />

        <p className="mt-6 text-center text-xs text-charcoal/40">
          Alle Preise in CHF · Änderungen vorbehalten
        </p>
      </div>
    </section>
  )
}
