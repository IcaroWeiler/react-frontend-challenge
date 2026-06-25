import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Movie } from '#/features/discovery/models/types/movie'

interface WatchlistState {
  movies: Movie[]
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  clearWatchlist: () => void
}

export const useWatchlistStore = create<WatchlistState>()(
  persist(
    (set) => ({
      movies: [],
      addMovie: (movie) =>
        set((state) => ({
          movies: state.movies.some((item) => item.id === movie.id)
            ? state.movies
            : [...state.movies, movie],
        })),
      removeMovie: (movieId) =>
        set((state) => ({
          movies: state.movies.filter((movie) => movie.id !== movieId),
        })),
      clearWatchlist: () => set({ movies: [] }),
    }),
    {
      name: 'watchlist-storage',
    },
  ),
)
