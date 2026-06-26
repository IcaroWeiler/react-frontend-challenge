import { Star } from 'lucide-react'
import type { Movie } from '#/shared/models/types/movie'

interface MovieInfoProps {
  movie: Movie
}

export function MovieInfo({ movie }: MovieInfoProps) {
  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{movie.title}</h1>
          <p className="text-sm ">
            {movie.release_date || 'Release date unavailable'}
          </p>
        </div>

        <div className="rounded-full flex items-center justify-center gap-1 border border-(--line) px-3 py-1 text-sm font-medium">
          <Star color="#efea1f" size={20} />{' '}
          {movie.vote_average?.toFixed(1) ?? 'N/A'}
        </div>
      </div>

      <p className="leading-7 ">
        {movie.overview || 'No synopsis available for this movie.'}
      </p>

      <div className="flex flex-wrap gap-2">
        {(movie.genres ?? []).map((genre: { id: number; name: string }) => (
          <span
            key={genre.id}
            className="rounded-full border border-(--line) bg-(--chip-bg) px-3 py-1 text-sm"
          >
            {genre.name}
          </span>
        ))}
      </div>

      <div className="text-sm">
        <p>Runtime: {movie.runtime ? `${movie.runtime} min` : 'Unavailable'}</p>
      </div>
    </div>
  )
}
