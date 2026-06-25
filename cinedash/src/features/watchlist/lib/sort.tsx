import type { Movie } from '#/features/discovery/models/types/movie'
import { getGenreNameById } from '#/features/discovery/models/genres/genres'

export type SortKey = 'title' | 'genre' | 'rating'
export type SortDirection = 'asc' | 'desc'

export function sortMovies(
  movies: Movie[],
  sortKey: SortKey,
  sortDirection: SortDirection,
) {
  const sorted = [...movies]

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
}
