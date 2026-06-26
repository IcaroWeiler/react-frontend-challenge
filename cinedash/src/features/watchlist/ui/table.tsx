import { useMemo, useState } from 'react'
import { getGenreNameById } from '#/features/discovery/models/genres/genres'
import { sortMovies, type SortDirection, type SortKey } from '../lib/sort'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/shared/components/ui/table'
import { Button } from '#/shared/components/ui/button'
import { useWatchlistStore } from '../store/watchlist'
import { redirect } from '@tanstack/react-router'

export function WatchlistTable() {
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')
  const { movies, removeMovie } = useWatchlistStore()

  const sortedMovies = useMemo(() => {
    return sortMovies(movies, sortKey, sortDirection)
  }, [sortDirection, sortKey, movies])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
  }

  const redirectToMovie = (movieId: string) => {
    redirect({ href: `app/movie/${movieId}` })
  }

  return (
    <div className="space-y-4 p-2">
      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => handleSort('title')}>
          Sort by title
        </Button>
        <Button variant="outline" onClick={() => handleSort('genre')}>
          Sort by first genre
        </Button>
        <Button variant="outline" onClick={() => handleSort('rating')}>
          Sort by rating
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Release Date</TableHead>
            <TableHead>Genres</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-center">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMovies.map((movie) => (
            <TableRow
              onClick={() => redirectToMovie(String(movie.id))}
              key={movie.id}
            >
              <TableCell>{movie.title}</TableCell>
              <TableCell>{movie.release_date}</TableCell>
              <TableCell>
                {movie.genre_ids
                  ?.map((id) => getGenreNameById(id))
                  .filter((value): value is string => Boolean(value))
                  .join(', ')}
              </TableCell>
              <TableCell>{movie.vote_average.toFixed(1)}</TableCell>
              <TableCell className="text-center">
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Remove ${movie.title}`}
                  onClick={() => removeMovie(movie.id)}
                >
                  ×
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
