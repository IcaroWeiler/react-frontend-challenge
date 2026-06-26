'use client'

import * as React from 'react'
import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from './popover'
import { Button } from './button'
import { Calendar } from './calendar'

interface DatePickerProps {
  placeholder?: string
  value?: Date
  onChange?: (date?: Date) => void
}

export function DatePicker({
  placeholder = 'Pick a date',
  value,
  onChange,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value,
  )

  React.useEffect(() => {
    setInternalDate(value)
  }, [value])

  const selectedDate = value ?? internalDate

  const handleSelect = (date?: Date) => {
    if (onChange) {
      onChange(date)
      return
    }

    setInternalDate(date)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          data-empty={!selectedDate}
          className="w-[280px] justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        >
          <CalendarIcon />
          {selectedDate ? (
            format(selectedDate, 'PPP')
          ) : (
            <span>{placeholder}</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={selectedDate}
          onSelect={handleSelect}
        />
      </PopoverContent>
    </Popover>
  )
}
