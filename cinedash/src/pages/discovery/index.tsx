import { useState } from 'react'
import { Filters } from '#/features/discovery/ui/filters'
import { MoviesTable } from '#/features/discovery/ui/table'
import type { Filter } from '#/features/discovery/models/types/filter'

export function DiscoveryPage() {
  const [filters, setFilters] = useState<Partial<Filter>>({})

  return (
    <div className="flex flex-col max-w-7xl max-h-3xl mx-auto gap-4 p-4">
      <Filters filters={filters} onFiltersChange={setFilters} />
      <MoviesTable filters={filters} />
    </div>
  )
}
