"use client"

import * as React from "react"
import { useRouter } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"
import { format } from "date-fns"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { fetchAllGuests } from "@/lib/queries"
import { Guest } from "@/types/guests"




export function AdminGuestsTable() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Guest>[] = React.useMemo(
    () => [
      {
        accessorKey: "guestId",
        header: "Guest ID",
        cell: ({ row }) => (
          <div className="font-medium">
            {row.getValue("guestId")}
          </div>
        ),
      },
      {
        accessorKey: "count",
        header: "Guest Count",
      },
      {
        accessorKey: "phoneNo",
        header: "Phone Number",
      },
      {
        accessorKey: "user.email",
        header: "Booked By",
      },
      
      {
        accessorKey: "checkIn",
        header: "Check In",
        cell: ({ row }) => format(new Date(row.getValue("checkIn")), "PPP"),
      },
      {
        accessorKey: "checkOut",
        header: "Check Out",
        cell: ({ row }) => format(new Date(row.getValue("checkOut")), "PPP"),
      },
      {
        accessorKey: "createdAt",
        header: "Booking Date",
        cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPP"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const guest = row.original
          return (
            <Button
              variant="ghost"
              onClick={() => router.push(`/admin/guests/${guest.guestId}`)}
            >
              View Details
            </Button>
          )
        },
      },
    ],
    [router]
  )

  const { data: guests = [], isLoading, error } = useQuery({
    queryKey: ['guests-list'],
    queryFn: fetchAllGuests,
    refetchOnWindowFocus: true,
    refetchOnMount: true,
    staleTime: 1000, 
  });
  console.log("Guest Table",guests)
  const table = useReactTable({
    data: guests,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error) {
    return <div>Error loading guest records</div>
  }

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search by Guest ID..."
          value={(table.getColumn("guestId")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("guestId")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white shadow-md text-black"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border bg-white shadow-md">
        <Table>
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No guest records found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}