import { HEADERS } from '#/shared/api/tmdbAuth'
import {
  mapMovieApiToMovie,
  type TmdbMovieDetailResponse,
} from '#/shared/models/mappers/mapper'
import type { Movie } from '#/shared/models/types/movie'

const TMDB_BASE_URL = 'https://api.themoviedb.org/3'

export async function fetchTmdbMovieDetails(
  movieId: number | string,
): Promise<Movie> {
  const response = await fetch(
    `${TMDB_BASE_URL}/movie/${movieId}?append_to_response=videos,credits`,
    {
      headers: HEADERS,
    },
  )

  if (!response.ok) {
    throw new Error(
      `TMDB request failed: ${response.status} ${response.statusText}`,
    )
  }

  const payload = (await response.json()) as TmdbMovieDetailResponse

  return mapMovieApiToMovie(payload)
}
