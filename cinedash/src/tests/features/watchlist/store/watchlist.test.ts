// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from 'vitest'
import { useAuthStore } from '#/features/auth/model/store/authStore'
import { useWatchlistStore } from '#/features/watchlist/store/watchlist'
import type { Movie } from '#/shared/models/types/movie'

const movieA: Movie = {
  id: 11,
  title: 'Movie A',
  release_date: '2020-01-01',
  vote_average: 7.5,
}

const movieB: Movie = {
  id: 22,
  title: 'Movie B',
  release_date: '2021-01-01',
  vote_average: 8.1,
}

const createPersistedState = (movies: Movie[]) =>
  JSON.stringify({
    state: { movies },
    version: 0,
  })

describe('watchlist store', () => {
  beforeEach(async () => {
    localStorage.clear()
    useAuthStore.setState({ token: '' })
    useWatchlistStore.setState({ movies: [] })
    await useWatchlistStore.persist.rehydrate()
  })

  it('adds and removes movies from the active watchlist', () => {
    useWatchlistStore.getState().addMovie(movieA)
    useWatchlistStore.getState().addMovie(movieA)
    useWatchlistStore.getState().addMovie(movieB)

    expect(useWatchlistStore.getState().movies).toEqual([movieA, movieB])

    useWatchlistStore.getState().removeMovie(movieA.id)

    expect(useWatchlistStore.getState().movies).toEqual([movieB])
  })

  it('stores and restores watchlist data per auth token', async () => {
    useAuthStore.getState().login('token-a')
    useWatchlistStore.getState().addMovie(movieA)

    expect(
      JSON.parse(localStorage.getItem('watchlist-storage-token-a') ?? 'null'),
    ).toEqual({
      state: { movies: [movieA] },
      version: 0,
    })

    localStorage.setItem(
      'watchlist-storage-token-b',
      createPersistedState([movieB]),
    )

    useAuthStore.getState().login('token-b')
    await useWatchlistStore.persist.rehydrate()

    expect(useWatchlistStore.getState().movies).toEqual([movieB])
  })
})
