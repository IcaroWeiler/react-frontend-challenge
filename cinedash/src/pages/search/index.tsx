import type { SearchFilter } from '#/features/search/models/types/filter'
import { SearchFilters } from '#/features/search/ui/filters'
import { SearchTable } from '#/features/search/ui/table'
import { useState } from 'react'

export function SearchPage() {
  const [filters, setFilters] = useState<Partial<SearchFilter>>({
    query: '',
  })

  return (
    <div className="mx-auto flex max-w-7xl max-h-3xl flex-col gap-4 p-4">
      <SearchFilters filters={filters} onFiltersChange={setFilters} />
      <SearchTable filters={filters} />
    </div>
  )
}
