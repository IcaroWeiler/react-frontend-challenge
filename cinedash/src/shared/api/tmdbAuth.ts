export const getTmdbApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('TMDB API key is not defined in VITE_TMDB_API_KEY')
  }

  return apiKey
}

export const HEADERS = {
  Authorization: `Bearer ${getTmdbApiKey()}`,
  'Content-Type': 'application/json',
}
