"use client";

import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICRUD } from "@/hooks/useCrudHandler";

import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowLeft, ArrowRight } from "lucide-react";
import React from "react";
import { buildCommonColumns } from "../../core/use-cases/buildCommonColumns";

export interface IActionsConfig<I, O = void> {
  delete: ICRUD<I, O>;
  editLink: string;
}
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  actionsConfig: IActionsConfig<TData> | null;
}

export function WDataTable<TData, TValue>({
  data,
  columns,
  actionsConfig,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns: actionsConfig
      ? buildCommonColumns(columns, actionsConfig)
      : columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      pagination: {
        pageSize: 7,
      },
    },
    state: {
      sorting,
    },
  });

  // Handle page change onClick
  const handlePageChange = (newPageIndex) => {
    // setPageIndex(newPageIndex);
    table.setPageIndex(newPageIndex);
  };

  return (
    <>
      <div className="rounded-md border w-full">
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
                            header.getContext()
                          )}
                    </TableHead>
                  );
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
                  Sin resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {/* Previous Button */}
        <Button
          size="sm"
          variant="ghost"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <ArrowLeft />
          <span className="ml-2">Anterior</span>
        </Button>

        {/* Page Number Buttons */}
        {[
          ...Array(
            Math.ceil(data.length / table.getState().pagination.pageSize)
          ).keys(),
        ].map((page) => (
          <Button
            size="sm"
            key={page}
            disabled={page === table.getState().pagination.pageIndex}
            variant={
              page === table.getState().pagination.pageIndex
                ? "default"
                : "ghost"
            }
            onClick={() => handlePageChange(page)}
          >
            {page + 1}
          </Button>
        ))}

        {/* Next Button */}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <span className="mr-2">Siguiente</span>

          <ArrowRight />
        </Button>
      </div>
    </>
  );
}
