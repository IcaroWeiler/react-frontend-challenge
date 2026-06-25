import { WatchlistTable } from '#/features/watchlist/ui/table'

export function WatchlistPage() {
  return (
    <div className="flex flex-col max-w-7xl max-h-3xl mx-auto gap-4 p-4">
      <WatchlistTable></WatchlistTable>
    </div>
  )
}
