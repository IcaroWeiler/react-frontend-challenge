import { createColumnHelper } from '@tanstack/react-table'
import type { Movie } from '../models/types/movie'
import { getGenreNameById } from '../models/genres/genres'
import { Button } from '#/shared/components/ui/button'
import { useWatchlistStore } from '#/features/watchlist/store/watchlist'

const columnHelper = createColumnHelper<Movie>()

export const columns = [
  columnHelper.accessor('title', {
    header: () => 'Title',
    cell: (info) => info.getValue(),
  }),
  columnHelper.accessor((row) => row.release_date, {
    id: 'release_date',
    cell: (info) => <i>{info.getValue()}</i>,
    header: () => 'Release Date',
  }),
  columnHelper.accessor('vote_average', {
    header: () => 'Average Rating',
    cell: (info) => info.renderValue()?.toFixed(2),
  }),

  columnHelper.accessor('genre_ids', {
    header: () => 'Genres',
    cell: (info) => {
      const genreIds = info.getValue()
      if (!genreIds) return null

      return genreIds
        .map((id) => getGenreNameById(id))
        .filter((v): v is string => !!v)
        .join(', ')
    },
  }),
  columnHelper.display({
    id: 'add_to_watchlist',
    header: () => 'Add to watchlist',
    cell: ({ row }) => {
      const movie = row.original
      const addMovie = useWatchlistStore((state) => state.addMovie)
      return (
        <div className="flex justify-center">
          <Button
            variant="outline"
            size="icon"
            className="size-8"
            aria-label={`Add ${movie.title} to watchlist`}
            onClick={() => addMovie(movie)}
          >
            +
          </Button>
        </div>
      )
    },
  }),
]
