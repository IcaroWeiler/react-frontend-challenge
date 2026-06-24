const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_CHANGES_ENDPOINT = '/movie/changes'

const getTmdbApiKey = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY

  if (!apiKey || typeof apiKey !== 'string') {
    throw new Error('TMDB API key is not defined in VITE_TMDB_API_KEY')
  }

  return apiKey
}

export type TmdbMovieChangesResponse = {
  results: Array<Record<string, unknown>>
  page: number
  total_pages: number
  total_results: number
}

export async function fetchTmdbMovieChanges(
  params: Record<string, string | number | boolean> = {},
): Promise<TmdbMovieChangesResponse> {
  const apiKey = getTmdbApiKey()
  const queryString = new URLSearchParams(
    Object.entries(params).reduce<Record<string, string>>(
      (acc, [key, value]) => {
        acc[key] = String(value)
        return acc
      },
      {},
    ),
  )

  const response = await fetch(
    `${TMDB_BASE_URL}${TMDB_CHANGES_ENDPOINT}?${queryString.toString()}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
    },
  )

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
