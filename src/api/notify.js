const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

function formatReservationDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('de-CH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function buildGuestSummary(reservation, reference) {
  const total = reservation.adults + reservation.kids
  const people =
    reservation.kids > 0
      ? `${reservation.adults} Erwachsene, ${reservation.kids} Kinder (${total} Personen)`
      : `${reservation.adults} ${reservation.adults === 1 ? 'Person' : 'Personen'}`

  return [
    `Datum: ${formatReservationDate(reservation.date)}`,
    `Uhrzeit: ${reservation.time} Uhr`,
    `Personen: ${people}`,
    `Referenz: ${reference}`,
    reservation.message ? `Ihre Nachricht: ${reservation.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export async function sendReservationNotification(reservation, reference) {
  if (!WEB3FORMS_KEY) return

  const guestName = `${reservation.firstName} ${reservation.lastName}`
  const guestSummary = buildGuestSummary(reservation, reference)

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Neue Reservierung — ${guestName}`,
      from_name: 'La Bella Elena',
      email: reservation.email,
      replyto: reservation.email,
      botcheck: '',
      name: guestName,
      Vorname: reservation.firstName,
      Nachname: reservation.lastName,
      Telefon: reservation.phone,
      Datum: formatReservationDate(reservation.date),
      Uhrzeit: `${reservation.time} Uhr`,
      Erwachsene: String(reservation.adults),
      Kinder: String(reservation.kids),
      Gesamt: `${reservation.adults + reservation.kids} Personen`,
      Referenz: reference,
      Nachricht: reservation.message || '—',
      message: guestSummary,
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok || !result.success) {
    throw new Error('Notification failed')
  }
}
