import { API_URL } from './config.js'

export async function submitReservation(data) {
  if (!API_URL) {
    throw new Error('SERVICE_UNAVAILABLE')
  }

  const response = await fetch(`${API_URL}/api/reservations`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok) {
    throw new Error(result.error || 'REQUEST_FAILED')
  }

  return result
}
