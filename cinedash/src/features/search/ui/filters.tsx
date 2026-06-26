import { useDebounce } from '#/app/hooks/debounce'
import { Input } from '#/shared/components/ui/input'
import { useEffect, useState } from 'react'
import type { SearchFilter } from '../models/types/filter'

interface SearchFiltersProps {
  filters: Partial<SearchFilter>
  onFiltersChange: (filters: Partial<SearchFilter>) => void
}

export function SearchFilters({
  filters,
  onFiltersChange,
}: SearchFiltersProps) {
  const [titleInput, setTitleInput] = useState(filters.query ?? '')
  const { debouncedValue: debouncedTitle } = useDebounce(titleInput, {
    delay: 400,
  })

  useEffect(() => {
    setTitleInput(filters.query ?? '')
  }, [filters.query])

  useEffect(() => {
    if ((filters.query ?? '') === debouncedTitle) {
      return
    }

    onFiltersChange({ ...filters, query: debouncedTitle })
  }, [debouncedTitle, filters, onFiltersChange])

  return (
    <div className="flex flex-wrap gap-4">
      <Input
        value={titleInput}
        onChange={(event) => setTitleInput(event.target.value)}
        className="w-full max-w-md"
        placeholder="Search movie title"
      />
    </div>
  )
}
