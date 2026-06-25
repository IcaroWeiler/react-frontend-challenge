import { useMemo, useState } from 'react'
import type { Movie } from '#/features/discovery/models/types/movie'
import { getGenreNameById } from '#/features/discovery/models/genres/genres'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/shared/components/ui/table'
import { Button } from '#/shared/components/ui/button'

const mockMovies: Movie[] = [
  {
    id: 1,
    title: 'Interstellar',
    release_date: '2014-11-07',
    vote_average: 8.6,
    genre_ids: [12, 18, 878],
  },
  {
    id: 2,
    title: 'Parasite',
    release_date: '2019-05-30',
    vote_average: 8.5,
    genre_ids: [35, 18, 53],
  },
  {
    id: 3,
    title: 'Arrival',
    release_date: '2016-11-11',
    vote_average: 7.9,
    genre_ids: [18, 878, 53],
  },
  {
    id: 4,
    title: 'Dune',
    release_date: '2021-09-15',
    vote_average: 8.1,
    genre_ids: [878, 12],
  },
]

type SortKey = 'title' | 'genre' | 'rating'

type SortDirection = 'asc' | 'desc'

export function WatchlistTable() {
  const [sortKey, setSortKey] = useState<SortKey>('title')
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc')

  const sortedMovies = useMemo(() => {
    const sorted = [...mockMovies]

    sorted.sort((a, b) => {
      if (sortKey === 'title') {
        return a.title.localeCompare(b.title)
      }

      if (sortKey === 'genre') {
        const aGenre = a.genre_ids?.[0]
        const bGenre = b.genre_ids?.[0]
        const aName = aGenre ? (getGenreNameById(aGenre) ?? '') : ''
        const bName = bGenre ? (getGenreNameById(bGenre) ?? '') : ''

        return aName.localeCompare(bName)
      }

      return a.vote_average - b.vote_average
    })

    return sortDirection === 'desc' ? sorted.reverse() : sorted
  }, [sortDirection, sortKey])

  const handleSort = (key: SortKey) => {
    if (sortKey === key) {
      setSortDirection((prev) => (prev === 'asc' ? 'desc' : 'asc'))
      return
    }

    setSortKey(key)
    setSortDirection('asc')
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
            <TableHead>Genres</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-center">Remove</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedMovies.map((movie) => (
            <TableRow key={movie.id}>
              <TableCell>{movie.title}</TableCell>
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
