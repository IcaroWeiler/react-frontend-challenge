import { Input } from '#/shared/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '#/shared/components/ui/select'
import { useEffect, useState } from 'react'
import { genres } from '../models/genres/genres'
import { DatePicker } from '#/shared/components/ui/datepicker'
import type { Filter } from '../models/types/filter'

export const Filters = () => {
  const [filter, setFilter] = useState<Partial<Filter>>({})

  const ONLY_NUMBERS_REGEX = /^\d*$/

  const handleGenreChange = (value: string) => {
    setFilter({ ...filter, with_genres: value })
  }

  const handleMinRatingChange = (value: string) => {
    setFilter({ ...filter, 'vote_average.gte': value })
  }

  useEffect(() => {
    console.log('Filter changed:', filter)
  }, [filter])

  return (
    <div className="flex gap-4">
      <Select onValueChange={handleGenreChange}>
        <SelectTrigger>
          <SelectValue placeholder="Select a genre" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Genres</SelectLabel>
            {genres.map((genre) => (
              <SelectItem key={genre.id} value={genre.id.toString()}>
                {genre.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>

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
