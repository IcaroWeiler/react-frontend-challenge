// @vitest-environment jsdom
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { act } from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { SearchFilters } from '#/features/search/ui/filters'
import { SearchTable } from '#/features/search/ui/table'
import { fetchTmdbSearchMovies } from '#/features/search/api/movies'

vi.mock('#/features/search/api/movies', () => ({
  fetchTmdbSearchMovies: vi.fn(),
}))

vi.mock('@tanstack/react-router', async () => {
  const actual = await vi.importActual<typeof import('@tanstack/react-router')>(
    '@tanstack/react-router',
  )

  return {
    ...actual,
    useNavigate: () => vi.fn(),
    Link: ({ children, ...props }: { children: ReactNode }) => (
      <a {...props}>{children}</a>
    ),
  }
})

function renderWithQuery(ui: ReactNode) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return render(
    <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>,
  )
}

describe('search feature e2e', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    vi.useRealTimers()
  })

  it('shows empty state and hides pagination when query is empty', () => {
    renderWithQuery(<SearchTable filters={{ query: '' }} />)

    expect(screen.getByText('Type a movie title to search.')).toBeTruthy()
    expect(screen.queryByText(/Page\s+\d+\s+of/i)).toBeNull()
  })

  it('fetches search results and renders table rows with pagination', async () => {
    vi.mocked(fetchTmdbSearchMovies).mockResolvedValue({
      page: 1,
      total_pages: 2,
      total_results: 20,
      results: [
        {
          id: 27205,
          title: 'Inception',
          release_date: '2010-07-16',
          vote_average: 8.4,
        },
      ],
    })

    renderWithQuery(<SearchTable filters={{ query: 'inception' }} />)

    expect(await screen.findByText('Inception')).toBeTruthy()

    await waitFor(() => {
      expect(fetchTmdbSearchMovies).toHaveBeenCalledWith({
        page: 1,
        query: 'inception',
        include_adult: false,
      })
    })

    expect(screen.getByText(/Page\s+1\s+of\s+2/i)).toBeTruthy()
  })

  it('debounces title input before notifying parent filters', () => {
    vi.useFakeTimers()
    const onFiltersChange = vi.fn()

    render(
      <SearchFilters
        filters={{ query: '' }}
        onFiltersChange={onFiltersChange}
      />,
    )

    fireEvent.change(screen.getByPlaceholderText('Search movie title'), {
      target: { value: 'matrix' },
    })

    act(() => {
      vi.advanceTimersByTime(399)
    })
    expect(onFiltersChange).not.toHaveBeenCalled()

    act(() => {
      vi.advanceTimersByTime(1)
    })

    expect(onFiltersChange).toHaveBeenCalledWith({ query: 'matrix' })

    vi.useRealTimers()
  })
})
