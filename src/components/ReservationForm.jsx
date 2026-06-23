import { useState, useMemo, useEffect } from 'react'
import { submitReservation } from '../api/reservations'
import { fetchPublicBlockedDates } from '../api/blockedDates'
import { getAvailableDates, getTimeSlotsForDate } from '../data/openingHours'
import ReservationCalendar from './ReservationCalendar'
import ReservationTimePicker from './ReservationTimePicker'
import GuestCounter from './GuestCounter'

const inputClass =
  'w-full rounded-xl border border-charcoal/10 bg-cream/50 px-4 py-3 text-charcoal outline-none transition-colors focus:border-terracotta focus:ring-2 focus:ring-terracotta/20'

const initialForm = {
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  date: '',
  time: '',
  adults: 2,
  kids: 0,
  message: '',
}

function FormSection({ title, children }) {
  return (
    <div className="space-y-4">
      <h3 className="font-display border-b border-charcoal/10 pb-2 text-lg text-charcoal">
        {title}
      </h3>
      {children}
    </div>
  )
}

export default function ReservationForm({ onSuccess }) {
  const [blockedDates, setBlockedDates] = useState([])
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchPublicBlockedDates().then(setBlockedDates)
  }, [])

  const availableDates = useMemo(
    () => getAvailableDates(90, blockedDates),
    [blockedDates],
  )

  useEffect(() => {
    if (!availableDates.length) return
    setForm((prev) => {
      if (prev.date && availableDates.includes(prev.date)) return prev
      const firstDate = availableDates[0]
      const firstSlots = getTimeSlotsForDate(firstDate, blockedDates)
      return {
        ...prev,
        date: firstDate,
        time: firstSlots[0] || '',
      }
    })
  }, [availableDates, blockedDates])

  const timeSlots = useMemo(
    () => (form.date ? getTimeSlotsForDate(form.date, blockedDates) : []),
    [form.date, blockedDates],
  )

  const totalGuests = form.adults + form.kids

  const update = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }))
    setError('')
  }

  const handleDateChange = (dateStr) => {
    setForm((prev) => {
      const slots = getTimeSlotsForDate(dateStr, blockedDates)
      return {
        ...prev,
        date: dateStr,
        time: slots.includes(prev.time) ? prev.time : slots[0] || '',
      }
    })
    setError('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    if (!form.date || !timeSlots.length) {
      setError('Bitte wählen Sie ein verfügbares Datum.')
      setLoading(false)
      return
    }

    if (!form.time) {
      setError('Bitte wählen Sie eine verfügbare Uhrzeit.')
      setLoading(false)
      return
    }

    if (totalGuests > 30) {
      setError('Maximal 30 Personen pro Reservierung. Bitte passen Sie die Anzahl an.')
      setLoading(false)
      return
    }

    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        email: form.email.trim(),
        phone: form.phone.trim(),
        date: form.date,
        time: form.time,
        adults: form.adults,
        kids: form.kids,
        message: form.message.trim() || undefined,
      }

      const result = await submitReservation(payload)
      onSuccess(result)
    } catch (err) {
      const messages = {
        SERVICE_UNAVAILABLE: 'Der Reservierungsservice ist derzeit nicht verfügbar. Bitte rufen Sie uns an: +41 41 850 13 13.',
        REQUEST_FAILED: 'Die Reservierung konnte nicht gesendet werden. Bitte versuchen Sie es erneut.',
        'Ungültige Eingabe. Bitte überprüfen Sie Ihre Angaben.': 'Bitte überprüfen Sie Ihre Angaben und versuchen Sie es erneut.',
        'Das Reservierungsdatum liegt in der Vergangenheit.': 'Bitte wählen Sie ein Datum in der Zukunft.',
        'An diesem Tag ist das Restaurant geschlossen.': 'An diesem Tag ist das Restaurant geschlossen. Bitte wählen Sie ein anderes Datum.',
        'An diesem Tag sind keine Reservierungen mehr möglich.': 'An diesem Tag sind keine Reservierungen mehr möglich. Bitte wählen Sie ein anderes Datum.',
        'Die gewählte Uhrzeit ist nicht verfügbar.': 'Die gewählte Uhrzeit ist nicht verfügbar. Bitte wählen Sie eine andere Uhrzeit.',
        'Maximal 30 Personen pro Reservierung.': 'Maximal 30 Personen pro Reservierung. Bitte passen Sie die Anzahl an.',
        'Die Reservierung konnte nicht verarbeitet werden. Bitte versuchen Sie es später erneut.': 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut oder rufen Sie uns an.',
      }
      setError(messages[err.message] || 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="bg-cream py-12 sm:py-16 lg:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <form onSubmit={handleSubmit} className="min-w-0 space-y-8 rounded-2xl border border-charcoal/5 bg-white p-4 shadow-sm sm:space-y-10 sm:rounded-3xl sm:p-8 lg:p-10">
          <FormSection title="Persönliche Angaben">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-charcoal">
                  Vorname *
                </label>
                <input
                  id="firstName"
                  type="text"
                  required
                  autoComplete="given-name"
                  value={form.firstName}
                  onChange={update('firstName')}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-charcoal">
                  Nachname *
                </label>
                <input
                  id="lastName"
                  type="text"
                  required
                  autoComplete="family-name"
                  value={form.lastName}
                  onChange={update('lastName')}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-2 block text-sm font-medium text-charcoal">
                  E-Mail *
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={form.email}
                  onChange={update('email')}
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="phone" className="mb-2 block text-sm font-medium text-charcoal">
                  Telefon *
                </label>
                <input
                  id="phone"
                  type="tel"
                  required
                  autoComplete="tel"
                  value={form.phone}
                  onChange={update('phone')}
                  className={inputClass}
                />
              </div>
            </div>
          </FormSection>

          <FormSection title="Termin wählen">
            <div className="grid min-w-0 gap-6 lg:grid-cols-2 lg:items-start">
              <ReservationCalendar
                value={form.date}
                onChange={handleDateChange}
                blockedDates={blockedDates}
              />
              <ReservationTimePicker
                date={form.date}
                value={form.time}
                blockedDates={blockedDates}
                onChange={(time) => {
                  setForm((prev) => ({ ...prev, time }))
                  setError('')
                }}
              />
            </div>
          </FormSection>

          <FormSection title="Anzahl Gäste">
            <div className="grid gap-3 sm:grid-cols-2">
              <GuestCounter
                label="Erwachsene"
                value={form.adults}
                min={1}
                max={20}
                onChange={(adults) => {
                  setForm((prev) => ({ ...prev, adults }))
                  setError('')
                }}
              />
              <GuestCounter
                label="Kinder"
                value={form.kids}
                min={0}
                max={10}
                onChange={(kids) => {
                  setForm((prev) => ({ ...prev, kids }))
                  setError('')
                }}
              />
            </div>
          </FormSection>

          <FormSection title="Besondere Wünsche">
            <textarea
              id="message"
              rows={3}
              maxLength={1000}
              placeholder="Allergien, Anlass, Kinderstuhl..."
              value={form.message}
              onChange={update('message')}
              className={`${inputClass} resize-none`}
            />
          </FormSection>

          {error && (
            <p className="rounded-xl bg-terracotta/10 px-4 py-3 text-sm text-terracotta-dark" role="alert">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading || !timeSlots.length || !form.time}
            className="w-full rounded-full bg-terracotta px-8 py-4 text-base font-medium text-cream transition-colors hover:bg-terracotta-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Wird gesendet...' : 'Reservierung absenden'}
          </button>

          <p className="text-center text-xs text-charcoal/50">
            Mit dem Absenden stimmen Sie zu, dass wir Ihre Daten zur Bearbeitung der Reservierung speichern.
          </p>
        </form>
      </div>
    </section>
  )
}
