import type { TmdbMovieDetailResponse } from '#/shared/models/mappers/mapper'

export function Poster({
  poster_path,
  title,
}: Partial<TmdbMovieDetailResponse>) {
  return (
    <div className="rounded-xl ">
      {poster_path ? (
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-100 h-70 rounded-lg object-cover"
        />
      ) : (
        <div className="flex h-80 items-center justify-center rounded-lg bg-(--chip-bg) text-sm text-muted">
          Poster unavailable
        </div>
      )}
    </div>
  )
}
