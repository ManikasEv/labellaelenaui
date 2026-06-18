const WEB3FORMS_KEY = import.meta.env.VITE_WEB3FORMS_KEY

export async function sendReservationNotification(reservation, reference) {
  if (!WEB3FORMS_KEY) return

  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: WEB3FORMS_KEY,
      subject: `Neue Reservierung — ${reservation.firstName} ${reservation.lastName}`,
      from_name: 'La Bella Elena',
      email: reservation.email,
      replyto: reservation.email,
      botcheck: '',
      name: `${reservation.firstName} ${reservation.lastName}`,
      Vorname: reservation.firstName,
      Nachname: reservation.lastName,
      Telefon: reservation.phone,
      Datum: reservation.date,
      Uhrzeit: reservation.time,
      Erwachsene: String(reservation.adults),
      Kinder: String(reservation.kids),
      Gesamt: `${reservation.adults + reservation.kids} Personen`,
      Referenz: reference,
      Nachricht: reservation.message || '—',
    }),
  })

  const result = await response.json().catch(() => ({}))

  if (!response.ok || !result.success) {
    throw new Error('Notification failed')
  }
}
