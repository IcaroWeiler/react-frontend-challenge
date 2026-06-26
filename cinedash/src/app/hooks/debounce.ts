import { useEffect, useState } from 'react'

interface UseDebounceOptions {
  delay?: number
}

interface UseDebounceResult<T> {
  debouncedValue: T
  isDebouncing: boolean
  queryEnabled: boolean
}

export function useDebounce<T>(
  value: T,
  { delay = 400 }: UseDebounceOptions = {},
): UseDebounceResult<T> {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    if (delay <= 0) {
      setDebouncedValue(value)
      return
    }

    const timeoutId = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [value, delay])

  const isDebouncing = !Object.is(value, debouncedValue)

  return {
    debouncedValue,
    isDebouncing,
    queryEnabled: !isDebouncing,
  }
}
