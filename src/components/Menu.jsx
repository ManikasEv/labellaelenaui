import { useEffect, useState } from 'react'
import { menuCategories, originDeclaration, dietaryTagLabels } from '../data/menu'
import {
  courseLabels,
  getTodayDishes,
  showHeuteMenu,
} from '../data/dailyDishes'

const tagAbbrev = {
  vegan: 'V',
  vegetarian: 'Vegetarisch',
  lactoseFree: 'LF',
  glutenFree: 'GF',
}

const menuTabs = [
  ...menuCategories,
  ...(showHeuteMenu ? [{ id: 'heute', title: 'Heute' }] : []),
]

function MenuRow({ item }) {
  return (
    <li className="menu-row group">
      {item.prices?.length ? (
        <div className="space-y-2">
          {item.prices.map((entry) => (
            <div key={entry.label} className="menu-row-line">
              <span className="menu-row-name font-display text-charcoal group-hover:text-terracotta transition-colors">
                {item.name}
                <span className="ml-2 font-sans text-xs font-normal text-charcoal/45">
                  {entry.label}
                </span>
              </span>
              <span className="menu-row-leader" aria-hidden="true" />
              <span className="menu-row-price font-display text-terracotta">{entry.price}</span>
            </div>
          ))}
          {item.description && (
            <p className="menu-row-desc">{item.description}</p>
          )}
        </div>
      ) : (
        <>
          <div className="menu-row-line">
            <span className="menu-row-name font-display text-charcoal group-hover:text-terracotta transition-colors">
              {item.name}
            </span>
            {item.price ? (
              <>
                <span className="menu-row-leader" aria-hidden="true" />
                <span className="menu-row-price font-display text-terracotta">{item.price}</span>
              </>
            ) : null}
          </div>
          {item.description && (
            <p className="menu-row-desc">{item.description}</p>
          )}
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

function DailyMenuPanel() {
  const { dayName, date, dishes, menuPrice, isClosed } = getTodayDishes()

  if (isClosed) {
    return (
      <div className="py-8 text-center">
        <p className="font-display text-xl text-charcoal/70">{date}</p>
        <p className="mt-4 text-charcoal/55">
          An diesem Tag haben wir geschlossen.
        </p>
      </div>
    )
  }

  return (
    <div>
      <h4 className="mb-2 text-center font-display text-lg text-terracotta">
        {dayName}
        <span className="ml-2 font-sans text-xs font-medium tracking-wider text-terracotta/70 uppercase">
          Heute
        </span>
      </h4>
      <p className="mb-6 text-center text-sm text-charcoal/50">{date}</p>
      <ul className="menu-list">
        {Object.entries(dishes).map(([course, dish]) => (
          <MenuRow
            key={course}
            item={{
              name: dish.name,
              description: `${courseLabels[course]} — ${dish.description}`,
              price: dish.price,
            }}
          />
        ))}
        <MenuRow
          item={{
            name: 'Tagesmenü komplett',
            description: 'Suppe · Hauptgericht · Dessert',
            price: menuPrice,
          }}
        />
      </ul>
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
  const [activeId, setActiveId] = useState(menuTabs[0].id)
  const activeTab = menuTabs.find((t) => t.id === activeId) ?? menuTabs[0]
  const activeCategory = menuCategories.find((c) => c.id === activeId)

  useEffect(() => {
    if (
      showHeuteMenu &&
      (window.location.hash === '#menu-heute' || window.location.hash === '#menu-taegliches')
    ) {
      setActiveId('heute')
    }
  }, [])

  const handleTabChange = (id) => {
    setActiveId(id)
    if (id === 'heute') {
      window.history.replaceState(null, '', '#menu-heute')
    } else {
      window.history.replaceState(null, '', '#menu')
    }
  }

  return (
    <section id="menu" className="overflow-x-hidden bg-white py-16 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm font-medium tracking-[0.2em] text-terracotta uppercase">
            Speisekarte
          </p>
          <h2 className="font-display mb-3 text-4xl text-charcoal lg:text-5xl">Menù</h2>
          <p className="mx-auto max-w-lg text-sm text-charcoal/55">
            Griechisch-italienische Küche — frisch zubereitet mit Leidenschaft.
          </p>
        </div>

        <nav className="menu-nav scrollbar-none" aria-label="Menükategorien">
          {menuTabs.map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabChange(tab.id)}
              className={`menu-nav-link ${activeId === tab.id ? 'menu-nav-link-active' : ''}`}
              aria-current={activeId === tab.id ? 'true' : undefined}
            >
              {tab.title}
            </button>
          ))}
        </nav>

        <section key={activeId} className="menu-panel">
          <header className="menu-category-header">
            <h3 className="font-display text-2xl text-olive">{activeTab.title}</h3>
          </header>

          {activeId === 'heute' ? (
            <>
              <p className="mb-8 text-center text-xs italic text-charcoal/45">
                Unser Tagesmenü wechselt täglich — hier sehen Sie, was heute auf dem Teller ist.
              </p>
              <DailyMenuPanel />
            </>
          ) : (
            <>
              {activeCategory?.note && (
                <p className="mb-5 text-center text-xs italic text-charcoal/45">
                  {activeCategory.note}
                </p>
              )}
              <ul className="menu-list">
                {activeCategory?.items.map((item) => (
                  <MenuRow key={item.name} item={item} />
                ))}
              </ul>
            </>
          )}
        </section>

        <div className="menu-legend">
          <span title="Vegan">V</span>
          <span title="Vegetarisch">Vegetarisch</span>
          <span title="Laktosefrei">LF</span>
          <span title="Glutenfrei">GF</span>
        </div>

        <OriginDeclaration />

        <p className="mt-6 text-center text-xs text-charcoal/40">
          Alle Preise in CHF · Änderungen vorbehalten
        </p>
      </div>
    </section>
  )
}
