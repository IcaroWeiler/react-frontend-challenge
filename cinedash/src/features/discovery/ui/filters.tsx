import { Input } from '#/shared/components/ui/input'
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxItem,
  ComboboxList,
} from '#/shared/components/ui/combobox'
import { genres } from '../models/genres/genres'
import { DatePicker } from '#/shared/components/ui/datepicker'
import type { Filter } from '../models/types/filter'

interface FiltersProps {
  filters: Partial<Filter>
  onFiltersChange: (filters: Partial<Filter>) => void
}

export const Filters = ({ filters, onFiltersChange }: FiltersProps) => {
  const ONLY_NUMBERS_REGEX = /^\d*$/

  const selectedGenres = (filters.with_genres ?? '').split(',').filter(Boolean)

  const handleGenreChange = (value: string[]) => {
    onFiltersChange({ ...filters, with_genres: value.join(',') })
  }

  const handleMinRatingChange = (value: string) => {
    onFiltersChange({ ...filters, 'vote_average.gte': value })
  }

  const handleDateChange =
    (key: 'release_date.gte' | 'release_date.lte') => (date?: Date) => {
      onFiltersChange({ ...filters, [key]: date })
    }

  return (
    <div className="flex gap-4 flex-wrap">
      <Combobox
        multiple
        value={selectedGenres}
        onValueChange={handleGenreChange}
      >
        <ComboboxChips className="min-w-56">
          {selectedGenres.map((genreId) => {
            const genre = genres.find((item) => item.id.toString() === genreId)

            return (
              <ComboboxChip key={genreId}>
                {genre?.name ?? genreId}
              </ComboboxChip>
            )
          })}
          <ComboboxChipsInput placeholder="Select genres" />
        </ComboboxChips>
        <ComboboxContent>
          <ComboboxList>
            {genres.map((genre) => (
              <ComboboxItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>

      <Input
        value={filters['vote_average.gte'] ?? ''}
        onChange={(e) => {
          const value = e.target.value

          if (ONLY_NUMBERS_REGEX.test(value)) {
            handleMinRatingChange(value)
          }
        }}
        className="max-w-33.75"
        placeholder="Minimum Rating"
        maxLength={2}
      />

      <DatePicker
        placeholder="Initial Date"
        value={filters['release_date.gte'] as Date | undefined}
        onChange={handleDateChange('release_date.gte')}
      />
      <DatePicker
        placeholder="Final Date"
        value={filters['release_date.lte'] as Date | undefined}
        onChange={handleDateChange('release_date.lte')}
      />
    </div>
  )
}
