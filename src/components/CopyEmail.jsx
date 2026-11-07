import { useState, useRef, useEffect } from 'react'
import { restaurantEmail } from '../data/location'

export default function CopyEmail({ className = '', children, ariaLabel }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(restaurantEmail)
    } catch {
      // Fallback for older browsers / insecure contexts
      const field = document.createElement('textarea')
      field.value = restaurantEmail
      field.setAttribute('readonly', '')
      field.style.position = 'fixed'
      field.style.opacity = '0'
      document.body.appendChild(field)
      field.select()
      document.execCommand('copy')
      document.body.removeChild(field)
    }
    setCopied(true)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setCopied(false), 2200)
  }

  return (
    <>
      <button
        type="button"
        onClick={copy}
        className={`copy-email ${className}`.trim()}
        aria-label={ariaLabel || `E-Mail kopieren · ${restaurantEmail}`}
      >
        {children}
      </button>

      <div
        className={`copy-toast ${copied ? 'copy-toast--visible' : ''}`}
        role="status"
        aria-live="polite"
      >
        E-Mail kopiert
      </div>
    </>
  )
}
