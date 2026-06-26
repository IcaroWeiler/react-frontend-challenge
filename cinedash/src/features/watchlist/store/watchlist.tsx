import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { useAuthStore } from '#/features/auth/model/store/authStore'
import type { Movie } from '#/shared/models/types/movie'

interface WatchlistState {
  movies: Movie[]
  addMovie: (movie: Movie) => void
  removeMovie: (movieId: number) => void
  clearWatchlist: () => void
}

const getWatchlistStorageKey = () => {
  const token = useAuthStore.getState().token

  return token ? `watchlist-storage-${token}` : 'watchlist-storage-guest'
}

const watchlistStorage = {
  getItem: () => {
    const key = getWatchlistStorageKey()
    return localStorage.getItem(key)
  },
  setItem: (_name: string, value: string) => {
    localStorage.setItem(getWatchlistStorageKey(), value)
  },
  removeItem: () => {
    localStorage.removeItem(getWatchlistStorageKey())
  },
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
      storage: createJSONStorage(() => watchlistStorage),
      partialize: (state) => ({ movies: state.movies }),
    },
  ),
)

if (typeof window !== 'undefined') {
  let previousToken = useAuthStore.getState().token

  useAuthStore.subscribe((state) => {
    if (state.token === previousToken) {
      return
    }

    previousToken = state.token
    useWatchlistStore.setState((current) => ({
      ...current,
      movies: [],
    }))
    void useWatchlistStore.persist.rehydrate()
  })
}
