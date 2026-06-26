import { HEADERS } from '#/shared/api/tmdbAuth'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export type MovieVideo = {
  id: string
  iso_639_1: string
  iso_3166_1: string
  name: string
  key: string
  site: string
  size: number
  type:
    | 'Trailer'
    | 'Teaser'
    | 'Clip'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Bloopers'
  official: boolean
  published_at: string
}

export type VideoResults = {
  results: MovieVideo[]
}

export type TmdbMovieDetailResponse = {
  id: number
  title: string
  overview: string
  release_date: string
  vote_average: number
  poster_path?: string | null
  runtime?: number
  genres?: Array<{ id: number; name: string }>
  videos?: VideoResults
}

export async function fetchTmdbMovieDetails(
  movieId: number | string,
): Promise<TmdbMovieDetailResponse> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=videos`,
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
