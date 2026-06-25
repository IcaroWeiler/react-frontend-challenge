import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from '@tanstack/react-table'
import { columns } from './columns'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '#/shared/components/ui/table'
import { DataTablePagination } from './pagination'
import { useQuery } from '@tanstack/react-query'
import { fetchTmdbDiscoverMovies } from '../api/movies'
import { useState } from 'react'
import type { Filter } from '../models/types/filter'
import { Skeleton } from '#/shared/components/ui/skeleton'

interface MoviesTableProps {
  filters: Partial<Filter>
}

export function MoviesTable({ filters }: MoviesTableProps) {
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  })

  const { data, isLoading } = useQuery({
    queryKey: [
      'movies',
      pagination.pageIndex,
      pagination.pageSize,
      filters.with_genres ?? '',
      filters['vote_average.gte'] ?? '',
      filters['release_date.gte']?.toISOString() ?? '',
      filters['release_date.lte']?.toISOString() ?? '',
    ],
    queryFn: () =>
      fetchTmdbDiscoverMovies({
        page: pagination.pageIndex + 1,
        with_genres: filters.with_genres || undefined,
        'vote_average.gte': filters['vote_average.gte'] || undefined,
        'release_date.gte': filters['release_date.gte'] || undefined,
        'release_date.lte': filters['release_date.lte'] || undefined,
      }),
  })

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

  return (
    <div className="p-2">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                )
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {isLoading ? (
            Array.from({ length: pagination.pageSize }).map((_, index) => (
              <TableRow key={`skeleton-${index}`}>
                {columns.map((_, columnIndex) => (
                  <TableCell key={`${index}-${columnIndex}`}>
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
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>

        <DataTablePagination table={table} isLoading={isLoading} />
      </Table>
    </div>
  )
}
