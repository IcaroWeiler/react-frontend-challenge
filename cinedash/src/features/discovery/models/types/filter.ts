export interface Filter {
  with_genres: string
  'release_date.gte': Date
  'release_date.lte': Date
  'vote_average.gte': string
}
