const HEADER_OFFSET = 88

export function getSectionId(href) {
  const hashIndex = href.indexOf('#')
  return hashIndex >= 0 ? href.slice(hashIndex + 1) : null
}

export function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId)
  if (!element) return false

  const top =
    element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET

  window.scrollTo({ top, behavior: 'smooth' })
  window.history.replaceState(null, '', `/#${sectionId}`)
  return true
}
