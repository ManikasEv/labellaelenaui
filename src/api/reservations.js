const API_URL = import.meta.env.VITE_API_URL

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
