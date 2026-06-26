export interface MovieVideo {
  id: string
  key: string
  name: string
  site: string
  size: number
  type: string
  official: boolean
}

export interface Movie {
  id: number
  title: string
  release_date: string
  vote_average: number
  genre_ids?: number[]
  poster_path?: string
  overview?: string
  runtime?: number
  genres?: Array<{ id: number; name: string }>
  videos?: MovieVideo[]
}
