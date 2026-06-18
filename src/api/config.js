const PRODUCTION_API_URL = 'https://labellaelenaserver.vercel.app'
const DEVELOPMENT_API_URL = 'http://localhost:3001'

function resolveApiUrl() {
  const fromEnv = import.meta.env.VITE_API_URL?.trim().replace(/\/$/, '')
  if (fromEnv) return fromEnv
  if (import.meta.env.PROD) return PRODUCTION_API_URL
  return DEVELOPMENT_API_URL
}

export const API_URL = resolveApiUrl()
