import { HEADERS } from '#/shared/api/tmdbAuth'
import type { Movie } from '../models/types/movie'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
const TMDB_TREND_ENDPOINT = '/trending/movie/week'

export type TmdbMovieTrendResponse = {
  results: Movie[]
  page: number
  total_pages: number
  total_results: number
}

export async function fetchTmdbMovieTrend(
  params: Record<string, string | number | boolean> = {},
): Promise<TmdbMovieTrendResponse> {
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
    `${TMDB_BASE_URL}${TMDB_TREND_ENDPOINT}?${queryString.toString()}`,
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
