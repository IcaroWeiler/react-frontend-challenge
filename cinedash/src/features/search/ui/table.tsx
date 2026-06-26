import { Skeleton } from '#/shared/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/shared/components/ui/table'
import { useQuery } from '@tanstack/react-query'
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { fetchTmdbSearchMovies } from '../api/movies'
import type { SearchFilter } from '../models/types/filter'
import { columns } from './columns'
import { DataTablePagination } from '#/features/discovery/ui/pagination'
import { toast } from 'sonner'

interface SearchTableProps {
  filters: Partial<SearchFilter>
}

const responsiveColumnClasses: Record<string, string> = {
  title: 'whitespace-normal',
  release_date: 'hidden sm:table-cell',
  vote_average: 'hidden sm:table-cell',
  add_to_watchlist: 'w-16',
}

export function SearchTable({ filters }: SearchTableProps) {
  const navigate = useNavigate()
  const query = (filters.query ?? '').trim()
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  useEffect(() => {
    setPagination((prev) => ({ ...prev, pageIndex: 0 }))
  }, [query])

  const { data, isLoading, isError, error } = useQuery({
    enabled: query.length > 0,
    queryKey: [
      'search-movies',
      pagination.pageIndex,
      pagination.pageSize,
      query,
    ],
    queryFn: () =>
      fetchTmdbSearchMovies({
        page: pagination.pageIndex + 1,
        query,
        include_adult: false,
      }),
  })

  useEffect(() => {
    if (!isError || !query.length) {
      return
    }

    const message =
      error instanceof Error
        ? `Unable to search movies: ${error.message}`
        : 'Unable to search movies.'

    toast.error(message)
  }, [isError, error, query])

  const table = useReactTable({
    data: data?.results ?? [],
    columns,
    manualPagination: true,
    pageCount: data?.total_pages ?? -1,
    state: {
      pagination,
    },
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
  })

  const getColumnClassName = (columnId: string) =>
    responsiveColumnClasses[columnId] ?? ''

  const hasResults = (data?.results?.length ?? 0) > 0

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className={getColumnClassName(header.column.id)}
                >
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: pagination.pageSize }).map((_, index) => (
              <TableRow key={`search-skeleton-${index}`}>
                {table.getAllLeafColumns().map((column, columnIndex) => (
                  <TableCell
                    key={`${index}-${columnIndex}`}
                    className={getColumnClassName(column.id)}
                  >
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                className="cursor-pointer"
                onClick={() =>
                  navigate({
                    to: '/app/movie/$movieId',
                    params: { movieId: String(row.original.id) },
                  })
                }
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className={getColumnClassName(cell.column.id)}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                {query.length ? 'No results.' : 'Type a movie title to search.'}
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        {hasResults ? (
          <DataTablePagination table={table} isLoading={isLoading} />
        ) : null}
      </Table>
    </div>
  )
}
