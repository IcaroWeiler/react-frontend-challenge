import { useMemo, useState } from 'react'
import { useNavigate } from '@tanstack/react-router'
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

const watchlistColumnClasses: Record<string, string> = {
  title: 'whitespace-normal',
  release_date: 'hidden sm:table-cell',
  genre: 'hidden md:table-cell',
  rating: 'hidden sm:table-cell',
  remove: 'w-16',
}

export function WatchlistTable() {
  const navigate = useNavigate()
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
    navigate({ to: '/app/movie/$movieId', params: { movieId } })
  }

  const getColumnClassName = (columnId: string) =>
    watchlistColumnClasses[columnId] ?? ''

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
            <TableHead className={getColumnClassName('title')}>Title</TableHead>
            <TableHead className={getColumnClassName('release_date')}>
              Release Date
            </TableHead>
            <TableHead className={getColumnClassName('genre')}>
              Genres
            </TableHead>
            <TableHead className={getColumnClassName('rating')}>
              Rating
            </TableHead>
            <TableHead
              className={`text-center ${getColumnClassName('remove')}`}
            >
              Remove
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMovies.map((movie) => (
            <TableRow
              className="cursor-pointer"
              onClick={() => redirectToMovie(String(movie.id))}
              key={movie.id}
            >
              <TableCell className={getColumnClassName('title')}>
                {movie.title}
              </TableCell>
              <TableCell className={getColumnClassName('release_date')}>
                {movie.release_date}
              </TableCell>
              <TableCell className={getColumnClassName('genre')}>
                {movie.genre_ids
                  ?.map((id) => getGenreNameById(id))
                  .filter((value): value is string => Boolean(value))
                  .join(', ')}
              </TableCell>
              <TableCell className={getColumnClassName('rating')}>
                {movie.vote_average.toFixed(1)}
              </TableCell>
              <TableCell
                className={`text-center ${getColumnClassName('remove')}`}
              >
                <Button
                  variant="outline"
                  size="icon"
                  aria-label={`Remove ${movie.title}`}
                  onClick={(event) => {
                    event.stopPropagation()
                    removeMovie(movie.id)
                  }}
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
