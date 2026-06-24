import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { sectionPaths } from '../data/siteNavigation'

/** Reset scroll on route changes (React Router keeps scroll position by default). */
export default function ScrollToTop() {
  const { pathname, state, hash } = useLocation()

  useEffect(() => {
    if (state?.scrollTo) return
    if (hash) return
    if (sectionPaths.has(pathname)) return

    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname, state, hash])

  return null
}
