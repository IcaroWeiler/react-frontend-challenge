import { WatchlistPage } from '#/pages/watchlist'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/app/watchlist')({
  component: WatchlistPage,
})
