import { describe, expect, it } from 'vitest'
import {
  mapMovieApiToMovie,
  type TmdbMovieDetailResponse,
} from '#/shared/models/mappers/mapper'

describe('mapMovieApiToMovie', () => {
  it('maps a tmdb response into the shared movie model including videos', () => {
    const payload: TmdbMovieDetailResponse = {
      id: 1,
      title: 'Inception',
      release_date: '2010-07-16',
      vote_average: 8.8,
      genre_ids: [28, 878],
      poster_path: '/poster.png',
      overview: 'A mind-bending thriller.',
      runtime: 148,
      genres: [
        { id: 28, name: 'Action' },
        { id: 878, name: 'Science Fiction' },
      ],
      videos: {
        results: [
          {
            id: 'video-1',
            key: 'abcd1234',
            name: 'Official Trailer',
            site: 'YouTube',
            size: 1080,
            type: 'Trailer',
            official: true,
          },
        ],
      },
      credits: {
        cast: [
          {
            id: 101,
            name: 'Actor One',
            character: 'Lead',
            profile_path: '/actor-one.png',
          },
        ],
      },
    }

    expect(mapMovieApiToMovie(payload)).toEqual({
      id: 1,
      title: 'Inception',
      release_date: '2010-07-16',
      vote_average: 8.8,
      genre_ids: [28, 878],
      poster_path: '/poster.png',
      overview: 'A mind-bending thriller.',
      runtime: 148,
      genres: [
        { id: 28, name: 'Action' },
        { id: 878, name: 'Science Fiction' },
      ],
      videos: [
        {
          id: 'video-1',
          key: 'abcd1234',
          name: 'Official Trailer',
          site: 'YouTube',
          size: 1080,
          type: 'Trailer',
          official: true,
        },
      ],
      cast: [
        {
          id: 101,
          name: 'Actor One',
          character: 'Lead',
          profile_path: '/actor-one.png',
        },
      ],
    })
  })

  it('derives genre ids and keeps videos optional when missing', () => {
    const payload: TmdbMovieDetailResponse = {
      id: 2,
      title: 'Interstellar',
      release_date: '2014-11-07',
      vote_average: 8.6,
      genres: [{ id: 12, name: 'Adventure' }],
      overview: 'A team travels beyond the stars.',
    }

    expect(mapMovieApiToMovie(payload)).toEqual({
      id: 2,
      title: 'Interstellar',
      release_date: '2014-11-07',
      vote_average: 8.6,
      genre_ids: [12],
      poster_path: undefined,
      overview: 'A team travels beyond the stars.',
      runtime: undefined,
      genres: [{ id: 12, name: 'Adventure' }],
      videos: undefined,
      cast: undefined,
    })
  })
})
