import { createColumnHelper } from '@tanstack/react-table'
import type { Movie } from '../models/types/movie'
import { getGenreNameById } from '../models/genres/genres'

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
]
