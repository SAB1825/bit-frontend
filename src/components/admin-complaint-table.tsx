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
import { Badge } from "@/components/ui/badge"
import { fetchAllComplaints } from "@/lib/queries"

interface Complaint {
  _id: string
  complaintId: string
  title: string
  description: string
  status: "pending" | "in-progress" | "resolved"
  availableDate: string
  availableTime: string
  createdAt: string
  user: {
    username: string
    email: string
  }
  imageUrl?: string
}



export function AdminComplaintsTable() {
  const router = useRouter()
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = React.useState({})

  const columns: ColumnDef<Complaint>[] = React.useMemo(
    () => [
      {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
          <div className="max-w-[200px] truncate font-medium">
            {row.getValue("title")}
          </div>
        ),
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => {
          const status = row.getValue("status") as string
          return (
            <Badge
              variant={
                status === "resolved"
                  ? "success"
                  : status === "in-progress"
                  ? "warning"
                  : "default"
              }
            >
              {status}
            </Badge>
          )
        },
      },
      {
        accessorKey: "availableDate",
        header: "Available Date",
        cell: ({ row }) => format(new Date(row.getValue("availableDate")), "PPP"),
      },
      {
        accessorKey: "availableTime",
        header: "Available Time",
      },
      {
        accessorKey: "user.email",
        header: "Created By",
      },
      {
        accessorKey: "createdAt",
        header: "Created At",
        cell: ({ row }) => format(new Date(row.getValue("createdAt")), "PPP"),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => {
          const complaint = row.original
          return (
            <Button
              variant="ghost"
              onClick={() => router.push(`/admin/complaints/${complaint.complaintId}`)}
            >
              View
            </Button>
          )
        },
      },
    ],
    [router]
  )

  const { data: complaints = [], isLoading, error } = useQuery({
    queryKey: ['complaints'],
    queryFn: fetchAllComplaints,
  })

  const table = useReactTable({
    data: complaints,
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
    return <div>Error loading complaints</div>
  }

  return (
    <div className="w-full ">
      <div className="flex items-center py-4 gap-2">
        <Input
          placeholder="Search complaints..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="max-w-sm bg-white shadow-md"
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
      <div className=" border bg-white rounded-lg  shadow-md">
        <Table>
          <TableHeader className="bg-gray-100" >
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="text-white">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="text-black ">
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
                  No complaints found.
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