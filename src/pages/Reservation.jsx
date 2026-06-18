import { useState } from 'react'
import ReservationHero from '../components/ReservationHero'
import ReservationForm from '../components/ReservationForm'
import ReservationSuccess from '../components/ReservationSuccess'

export default function Reservation() {
  const [completed, setCompleted] = useState(null)

  return (
    <>
      <ReservationHero />
      {completed ? (
        <ReservationSuccess reference={completed.reference} />
      ) : (
        <ReservationForm onSuccess={setCompleted} />
      )}
    </>
  )
}
