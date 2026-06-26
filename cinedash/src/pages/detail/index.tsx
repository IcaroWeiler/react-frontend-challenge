import { useQuery } from '@tanstack/react-query'
import { Skeleton } from '#/shared/components/ui/skeleton'
import { Poster } from '#/features/detail/ui/poster'
import { fetchTmdbMovieDetails } from '#/features/detail/api/getMovie'
import { MovieInfo } from '#/features/detail/ui/info'
import { Button } from '#/shared/components/ui/button'
import { Trailer } from '#/features/detail/ui/trailer'
import { CirclePlus } from 'lucide-react'
import { useWatchlistStore } from '#/features/watchlist/store/watchlist'
import type { Movie } from '#/shared/models/types/movie'
import { toast } from 'sonner'
import { useEffect } from 'react'

interface MovieDetailPageProps {
  movieId: number
}

export function MovieDetailPage({ movieId }: MovieDetailPageProps) {
  const addMovie = useWatchlistStore((state) => state.addMovie)

  const {
    data: movie,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['movie-detail', movieId],
    queryFn: () => fetchTmdbMovieDetails(movieId),
  })

  const addAndNotify = (movie: Movie) => {
    addMovie(movie)
    toast.success(`${movie.title} added to watchlist`)
  }

  useEffect(() => {
    if (!isError) {
      return
    }

    const message =
      error instanceof Error
        ? `Unable to load movie details: ${error.message}`
        : 'Unable to load movie details.'

    toast.error(message)
  }, [isError, error])

  return (
    <div className="mx-auto flex items-center justify-center max-w-6xl flex-col gap-6 p-6">
      {isLoading ? (
        <div className="h-50 flex flex-col gap-2 w-full">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-5 w-1/2" />
          <Skeleton className="h-24 w-full" />
        </div>
      ) : isError ? (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700">
          Unable to load movie details.{' '}
          {error instanceof Error ? error.message : ''}
        </div>
      ) : movie ? (
        <div>
          <div className="flex gap-4">
            <Poster
              poster_path={movie.poster_path}
              title={movie.title}
            ></Poster>

            <div className="flex flex-col gap-2">
              <MovieInfo movie={movie}></MovieInfo>

              <Button onClick={() => addAndNotify(movie)} className="max-w-50">
                <CirclePlus />
                Add to Watchlist
              </Button>
            </div>
          </div>

          <div>{movie.videos && <Trailer videos={movie.videos}></Trailer>}</div>
        </div>
      ) : null}
    </div>
  )
}
