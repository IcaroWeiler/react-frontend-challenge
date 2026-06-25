import { Filters } from '#/features/discovery/ui/filters'
import { MoviesTable } from '#/features/discovery/ui/table'

export function DiscoveryPage() {
  return (
    <div className="flex flex-col max-w-7xl max-h-3xl mx-auto gap-4 p-4">
      <Filters />
      <MoviesTable />
    </div>
  )
}
