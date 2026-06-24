import { fetchTmdbMovieChanges } from '#/features/discovery/api/movies'
import { QueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

export function DiscoveryPage() {
  const queryClient = new QueryClient()

  useEffect(() => {
    fetchTmdbMovieChanges().then((data) => {
      console.log('TMDB Movie Changes:', data)
    })
  }, [])

  return <div className="flex flex-col">discovery</div>
}
