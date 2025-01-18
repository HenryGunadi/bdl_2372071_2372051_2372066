"use client";

import * as React from "react";
import { ColumnDef, ColumnFiltersState, SortingState, VisibilityState, flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable } from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Input } from "../ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { Category, Inventory, Items, PO, Receipt } from "../../types/types";
import { deleteInventory } from "../../utils/inventoryUtils";

export const columns = (toggleDelete: (id: string) => void, toggleUpdate: (id: string) => void, toggleDetail: (id: string) => void): ColumnDef<PO>[] => [
  {
    accessorKey: "id",
    header: "PO ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "supplier_id",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Supplier ID
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => <div className="uppercase">{row.getValue("supplier_id")}</div>,
  },
  {
    accessorKey: "total_amount_due",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total_amount_due"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => <div className="capitalize">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => <div className="capitalize">{row.getValue("status")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const po = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(po.id)}>Copy PO ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toggleDetail(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              View purchase order details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                const status = row.getValue("status");
                if (status === "accepted") {
                  alert("Status has been accepted");
                  return;
                }
                toggleUpdate(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              Accept Order
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toggleDelete(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              Delete Order
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const itemColumns = (toggleModal: (id: string) => void, toggleDetail: (id: string) => void, toggleDeleteModal: (idL: string) => void): ColumnDef<Items>[] => [
  {
    accessorKey: "id",
    header: "Item ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "nama",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "buy_price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Buy Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("buy_price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Price
          <ArrowUpDown />
        </Button>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => <div className="capitalize">{row.getValue("category_name")}</div>,
  },
  {
    accessorKey: "supplier_name",
    header: "Supplier",
    cell: ({ row }) => <div className="capitalize">{row.getValue("supplier_name")}</div>,
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.getValue("image_url");

      return <img src={`assets/db/${row.getValue("image_url")}`} className="w-16 h-16" alt="" />;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const po = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(po.id)}>Copy Item ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toggleDetail(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              View item details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toggleModal(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              Update item
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toggleDeleteModal(row.getValue("id"));
              }}
              className="hover:cursor-pointer"
            >
              Delete item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const receiptColumns = (toggleDetail: (itemID: string) => void, toggleDelete: (id: string) => void): ColumnDef<Receipt>[] => [
  {
    accessorKey: "receipt_id",
    header: "Receipt ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("receipt_id")}</div>,
  },
  {
    accessorKey: "payment_method",
    header: "Payment Method",
    cell: ({ row }) => <div className="capitalize">{row.getValue("payment_method")}</div>,
  },
  {
    accessorKey: "tax_id",
    header: "tax_id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("tax_id")}</div>,
  },
  {
    accessorKey: "total_amount",
    header: "Total Amount",
    cell: ({ row }) => <div className="capitalize">{row.getValue("total_amount")}</div>,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const receipt = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(receipt.receipt_id))}>Copy Inventory ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toggleDetail(row.getValue("receipt_id"));
              }}
              className="hover:cursor-pointer"
            >
              View receipt details
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toggleDelete(row.getValue("receipt_id"));
              }}
              className="hover:cursor-pointer"
            >
              Delete receipt
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const categoryColumn = (toggleEditModal: (itemID: number) => void, toggleDeleteModal: (id: number) => void): ColumnDef<Category>[] => [
  {
    accessorKey: "id",
    header: "Item ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "category_name",
    header: "Category",
    cell: ({ row }) => <div className="capitalize">{row.getValue("category_name")}</div>,
  },
  {
    accessorKey: "created_at",
    header: "Created",
    cell: ({ row }) => {
      let date: Date = row.getValue("created_at"); // Example input
      if (!(date instanceof Date)) {
        date = new Date(date); // Convert to Date object if not already one
      }

      const formattedDate = date.toISOString().split("T")[0];

      return <div className="capitalize">{formattedDate}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(category.id))}>Copy Category ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                console.log("CATEGORY FROM TABLE : ", category.id);

                toggleEditModal(category.id);
              }}
              className="hover:cursor-pointer"
            >
              Update category
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                toggleDeleteModal(category.id);
              }}
              className="hover:cursor-pointer"
            >
              Delete category
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const inventoryColumns = (toggleModal: (itemID: string) => void): ColumnDef<Inventory>[] => [
  {
    accessorKey: "item_id",
    header: "Item ID",
    cell: ({ row }) => <div className="capitalize">{row.getValue("item_id")}</div>,
  },
  {
    accessorKey: "nama",
    header: "Item Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nama")}</div>,
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
    cell: ({ row }) => <div className="capitalize">{row.getValue("quantity")}</div>,
  },
  {
    accessorKey: "image_url",
    header: "Image",
    cell: ({ row }) => <img src={`/assets/db/${row.getValue("image_url")}`} className="w-16 h-16" alt="" />,
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const inventory = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(String(inventory.id))}>Copy Inventory ID</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                toggleModal(inventory.item_id);
              }}
              className="hover:cursor-pointer"
            >
              Update item
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => {
                deleteInventory(inventory.item_id);
              }}
              className="hover:cursor-pointer"
            >
              Delete item
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  filter: string;
  placeholder?: string;
}

export function DataTable<TData, TValue>({ columns, data, filter, placeholder }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
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
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input placeholder={placeholder} value={(table.getColumn(filter)?.getFilterValue() as string) ?? ""} onChange={(event) => table.getColumn(filter)?.setFilterValue(event.target.value)} className="max-w-sm" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem key={column.id} className="capitalize" checked={column.getIsVisible()} onCheckedChange={(value) => column.toggleVisibility(!!value)}>
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return <TableHead key={header.id}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
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
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <div className="space-x-2">
            <div className="flex items-center justify-end space-x-2 py-4">
              <Button variant="outline" size="lg" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  console.log("HELLO");
                  table.nextPage();
                }}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
