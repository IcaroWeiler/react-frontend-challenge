import { Button } from '#/shared/components/ui/button'
import type { Movie } from '#/shared/models/types/movie'
import { createColumnHelper } from '@tanstack/react-table'
import { Link } from '@tanstack/react-router'
import { toast } from 'sonner'
import { useWatchlistStore } from '#/features/watchlist/store/watchlist'

const columnHelper = createColumnHelper<Movie>()

export const columns = [
  columnHelper.accessor('title', {
    header: () => 'Title',
    cell: (info) => (
      <Link
        to="/app/movie/$movieId"
        params={{ movieId: String(info.row.original.id) }}
        className="font-medium text-accent hover:underline"
      >
        {info.getValue()}
      </Link>
    ),
  }),
  columnHelper.accessor((row) => row.release_date, {
    id: 'release_date',
    cell: (info) => <i>{info.getValue() || '-'}</i>,
    header: () => 'Release Date',
  }),
  columnHelper.accessor('vote_average', {
    header: () => 'Average Rating',
    cell: (info) => info.renderValue()?.toFixed(2) ?? '-',
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
            onClick={(event) => {
              event.stopPropagation()
              addMovie(movie)
              toast.success(`${movie.title} added to watchlist`)
            }}
          >
            +
          </Button>
        </div>
      )
    },
  }),
]
