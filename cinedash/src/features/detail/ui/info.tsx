import { Star } from 'lucide-react'
import type { TmdbMovieDetailResponse } from '../api/getMovie'

export function MovieInfo({
  title,
  runtime,
  genres,
  release_date,
  vote_average,
  overview,
}: Partial<TmdbMovieDetailResponse>) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          <p className="text-sm ">
            {release_date || 'Release date unavailable'}
          </p>
        </div>

        <div className="rounded-full flex items-center justify-center gap-1 border border-(--line) px-3 py-1 text-sm font-medium">
          <Star color="#efea1f" size={20} /> {vote_average?.toFixed(1) ?? 'N/A'}
        </div>
      </div>

      <p className="leading-7 ">
        {overview || 'No synopsis available for this movie.'}
      </p>

      <div className="flex flex-wrap gap-2">
        {(genres ?? []).map((genre) => (
          <span
            key={genre.id}
            className="rounded-full border border-[var(--line)] bg-[var(--chip-bg)] px-3 py-1 text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className="text-sm">
        <p>Runtime: {runtime ? `${runtime} min` : 'Unavailable'}</p>
      </div>
    </div>
  )
}
