import { HEADERS } from '#/shared/api/tmdbAuth'
import type { Movie } from '#/shared/models/types/movie'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_SEARCH_ENDPOINT = '/search/movie'

export type TmdbMovieSearchResponse = {
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

function buildQueryParams(
  params: Record<
    string,
    string | number | boolean | Date | undefined | null
  > = {},
): Record<string, string> {
  return Object.entries(params).reduce<Record<string, string>>(
    (acc, [key, value]) => {
      if (value === undefined || value === null) {
        return acc
      }

      acc[key] = value instanceof Date ? value.toISOString() : String(value)
      return acc
    },
    {},
  )
}

export async function fetchTmdbSearchMovies(
  params: Record<
    string,
    string | number | boolean | Date | undefined | null
  > = {},
): Promise<TmdbMovieSearchResponse> {
  const queryString = new URLSearchParams(buildQueryParams(params))

  const response = await fetch(
    `${TMDB_BASE_URL}${TMDB_SEARCH_ENDPOINT}?${queryString.toString()}`,
    {
      headers: HEADERS,
    },
  )

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    )
  }

  return response.json()
}
