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
import { useEffect, useState } from 'react'
import { genres } from '../models/genres/genres'
import { DatePicker } from '#/shared/components/ui/datepicker'
import type { Filter } from '../models/types/filter'

export const Filters = () => {
  const [filter, setFilter] = useState<Partial<Filter>>({})
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])

  const ONLY_NUMBERS_REGEX = /^\d*$/

  const handleGenreChange = (value: string[]) => {
    setSelectedGenres(value)
    setFilter((prev) => ({ ...prev, with_genres: value.join(',') }))
  }

  const handleMinRatingChange = (value: string) => {
    setFilter((prev) => ({ ...prev, 'vote_average.gte': value }))
  }

  useEffect(() => {
    console.log('Filter changed:', filter)
  }, [filter])

  return (
    <div className="flex gap-4">
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
        value={filter['vote_average.gte']}
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

      <DatePicker placeholder="Initial Date" />
      <DatePicker placeholder="Final Date" />
    </div>
  )
}
