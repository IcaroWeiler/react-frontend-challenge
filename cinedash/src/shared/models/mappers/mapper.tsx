import type { Movie, MovieVideo } from '#/shared/models/types/movie'

export interface TmdbMovieDetailResponse {
  id: number
  title: string
  release_date: string
  vote_average: number
  genre_ids?: number[]
  poster_path?: string | null
  overview?: string
  runtime?: number
  genres?: Array<{ id: number; name: string }>
  videos?: {
    results?: MovieVideo[]
  }
}

export function mapMovieApiToMovie(payload: TmdbMovieDetailResponse): Movie {
  return {
    id: payload.id,
    title: payload.title,
    release_date: payload.release_date,
    vote_average: payload.vote_average,
    genre_ids: payload.genre_ids ?? payload.genres?.map((genre) => genre.id),
    poster_path: payload.poster_path ?? undefined,
    overview: payload.overview,
    runtime: payload.runtime,
    genres: payload.genres?.map((genre) => ({
      id: genre.id,
      name: genre.name,
    })),
    videos: payload.videos?.results?.map((video) => ({
      id: video.id,
      key: video.key,
      name: video.name,
      site: video.site,
      size: video.size,
      type: video.type,
      official: video.official,
    })),
  }
}
