function formatReservationDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number)
  return new Date(year, month - 1, day).toLocaleDateString('de-CH', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function formatPeople(reservation) {
  const total = reservation.adults + reservation.kids
  if (reservation.kids > 0) {
    return `${reservation.adults} Erwachsene, ${reservation.kids} Kinder (${total} Personen)`
  }
  return `${reservation.adults} ${reservation.adults === 1 ? 'Person' : 'Personen'}`
}

function buildRestaurantMessage(reservation, reference) {
  return [
    `Neue Reservierung von ${reservation.firstName} ${reservation.lastName}`,
    '',
    `Datum: ${formatReservationDate(reservation.date)}`,
    `Uhrzeit: ${reservation.time} Uhr`,
    `Personen: ${formatPeople(reservation)}`,
    `Telefon: ${reservation.phone}`,
    `E-Mail: ${reservation.email}`,
    `Referenz: ${reference}`,
    reservation.message ? `Nachricht: ${reservation.message}` : null,
  ]
    .filter(Boolean)
    .join('\n')
}

export async function notifyRestaurantViaWeb3Forms(reservation, reference) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY?.trim()
  if (!accessKey) {
    console.warn('[email] Web3Forms key missing — restaurant notification not sent from browser')
    return false
  }

  const guestName = `${reservation.firstName} ${reservation.lastName}`

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        botcheck: '',
        subject: `Neue Reservierung — ${guestName}`,
        from_name: 'La Bella Elena',
        name: guestName,
        email: reservation.email,
        replyto: reservation.email,
        message: buildRestaurantMessage(reservation, reference),
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
      }),
    })

    const result = await response.json().catch(() => ({}))
    if (!response.ok || !result.success) {
      console.error('[email] Web3Forms failed:', result.message || response.status)
      return false
    }

    return true
  } catch (error) {
    console.error('[email] Web3Forms request failed:', error.message)
    return false
  }
}
