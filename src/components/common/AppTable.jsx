/* eslint-disable react/prop-types */
import * as React from "react";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import AppPagination from "@/components/common/AppPagination";
import AppHead from "@/components/common/AppHead";
import { useNavigate } from "react-router-dom";

export function AppTable({
  data,
  columns,
  pageTitle,
  addButton,
  queryData,
  setQueryData,
  filters,
  isDateVisible,
  isFilterVisible,
  isSearchVisible,
  isRecurring = false,
  showModal,
  rowClickable = false,
  getData = () => {},
  totalPage,
  isLoading,
}) {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [globalFilter, setGlobalFilter] = React.useState("");

  const navigate = useNavigate();

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
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      globalFilter,
    },
  });

  const handleRowClick = (id) => {
    navigate(`/orders/message/${id}`);
  };

  return (
    <div className="w-full">
      <AppHead
        pageTitle={pageTitle}
        addButton={addButton}
        queryData={queryData}
        showModal={showModal}
        setQueryData={setQueryData}
        filters={filters}
        isDateVisible={isDateVisible}
        isFilterVisible={isFilterVisible}
        table={table}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
        isSearchVisible={isSearchVisible}
        isRecurring={isRecurring}
        getData={getData}
      />
      <div className="rounded-md border w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="bg-secondary hover:bg-secondary text-nowrap"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id}>
                    <div className="text-black">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </div>
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : (
              <>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                      onClick={() => {
                        if (rowClickable) {
                          handleRowClick(row.original.id);
                        }
                      }}
                      className="hover:bg-gray-100 cursor-pointer"
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
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </>
            )}
          </TableBody>
        </Table>
        <div className="flex items-center gap-5 justify-center lg:justify-end text-nowrap lg:px-5 border-t py-5">
          <div>
            <AppPagination
              queryData={queryData}
              setQueryData={setQueryData}
              totalPage={totalPage}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
