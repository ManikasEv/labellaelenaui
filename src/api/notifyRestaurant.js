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

/**
 * Guest-facing confirmation text.
 * Used when Web3Forms Pro autoresponder has "Show copy of their submission" enabled —
 * and as a clear field guests see in that copy.
 */
function buildGuestConfirmationMessage(reservation, reference) {
  return [
    `Liebe/r ${reservation.firstName} ${reservation.lastName},`,
    '',
    'vielen Dank für Ihre Reservierung bei La Bella Elena!',
    'Wir haben Ihre Anfrage erhalten und freuen uns auf Ihren Besuch.',
    '',
    'Ihre Angaben:',
    `Datum: ${formatReservationDate(reservation.date)}`,
    `Uhrzeit: ${reservation.time} Uhr`,
    `Personen: ${formatPeople(reservation)}`,
    `Referenz: ${reference}`,
    reservation.message ? `Ihre Nachricht: ${reservation.message}` : null,
    '',
    'Falls Sie Änderungen wünschen, antworten Sie auf diese E-Mail oder rufen Sie uns an:',
    '+41 41 850 13 13',
    'Herzliche Grüsse',
    'La Bella Elena',
    'Hohle Gasse · Artherstrasse 38 · 6405 Immensee',
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
  const dateLabel = formatReservationDate(reservation.date)
  const peopleLabel = formatPeople(reservation)
  const guestConfirmation = buildGuestConfirmationMessage(reservation, reference)

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        botcheck: '',
        subject: `Neue Reservierung — ${guestName}`,
        from_name: 'La Bella Elena',
        // Required for Pro autoresponder (must be named email / Email)
        email: reservation.email,
        name: guestName,
        replyto: reservation.email,
        // Restaurant notification body
        message: buildRestaurantMessage(reservation, reference),
        // Guest-friendly confirmation — appears in autoresponder when
        // "Show copy of their submission" is enabled in Web3Forms Pro
        'Ihre Reservierungsbestätigung': guestConfirmation,
        Vorname: reservation.firstName,
        Nachname: reservation.lastName,
        Telefon: reservation.phone,
        Datum: dateLabel,
        Uhrzeit: `${reservation.time} Uhr`,
        Personen: peopleLabel,
        Erwachsene: String(reservation.adults),
        Kinder: String(reservation.kids),
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
