import { API_URL } from './config.js'

export async function fetchPublicBlockedDates() {
  if (!API_URL) return []

  try {
    const response = await fetch(`${API_URL}/api/blocked-dates`)
    if (!response.ok) return []
    const result = await response.json()
    return result.dates || []
  } catch {
    return []
  }
}
