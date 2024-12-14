/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";

import * as z from "zod";

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
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { CustomerTransactionsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomerTransactions } from "@/app/_lib/action";
import toast from "react-hot-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onDataChange: (newData: TData[]) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onDataChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<z.infer<typeof CustomerTransactionsSchema>>({
    resolver: zodResolver(CustomerTransactionsSchema),
    defaultValues: {
      movie_id: undefined,
      customer_id: undefined,
      transaction_date: "",
      details: "",
      transaction_cost: undefined,
    },
  });

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
  });

  const handleCreateTransaction = (
    values: z.infer<typeof CustomerTransactionsSchema>
  ) => {
    startTransition(async () => {
      try {
        const { customerTransaction } = await insertCustomerTransactions(
          values
        );
        onDataChange([customerTransaction[0], ...data]);

        toast.success("Giao dịch khách hàng đã được thêm thành công");
        setIsModalOpen(false);
        form.reset();
      } catch (error: any) {
        toast.error(error.message);
      }
    });
  };

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Lọc phim"
          value={
            (table.getColumn("movie_id")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("movie_id")?.setFilterValue(event.target.value)
          }
          className="max-w-[250px] placeholder:text-[#dcdcdc]"
        />
        <div className="w-4"></div>
        <Input
          placeholder="Lọc ngày giao dịch"
          value={
            (table.getColumn("transaction_date")?.getFilterValue() as string) ??
            ""
          }
          onChange={(event) =>
            table
              .getColumn("transaction_date")
              ?.setFilterValue(event.target.value)
          }
          className="max-w-[250px] placeholder:text-[#dcdcdc]"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mx-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Thêm giao dịch mới
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto text-black">
              Cột
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
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow className="table-row" key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-lg text-white" key={header.id}>
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
                  className="table-row"
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="text-base" key={cell.id}>
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
                  Không có kết quả.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-white font-medium">
          Trang {table.getState().pagination.pageIndex + 1} /{" "}
          {table.getPageCount()} | Tổng{" "}
          {table.getFilteredRowModel().rows.length} Kết quả
        </div>
        <Button
          className="text-black"
          variant="outline"
          size="lg"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Trước
        </Button>
        <Button
          className="text-black"
          variant="outline"
          size="lg"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Sau
        </Button>
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="sm:max-w-[525px]">
          <DialogHeader>
            <DialogTitle>Thêm giao dịch khách hàng mới</DialogTitle>
            <DialogDescription>
              Nhập giao dịch khách hàng mới tại đây. Ấn lưu khi hoàn thành.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateTransaction)}
              className="space-x-6 max-h-[400px] overflow-auto"
            >
              <div className="space-y-4 mb-16">
                <FormField
                  control={form.control}
                  name="movie_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã phim</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value ?? ""}
                          disabled={isPending}
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="customer_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mã khách hàng</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value ?? ""}
                          disabled={isPending}
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transaction_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Ngày giao dịch (định dạng YYYY-MM-dd)
                      </FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chi tiết</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="transaction_cost"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chi phí</FormLabel>
                      <FormControl>
                        <Input
                          value={field.value ?? ""}
                          disabled={isPending}
                          type="number"
                          onChange={(e) => {
                            const value = e.target.value;
                            field.onChange(value === "" ? null : Number(value));
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <DialogFooter>
                <Button
                  className="absolute right-12 bottom-4"
                  disabled={isPending}
                  type="submit"
                >
                  Thêm giao dịch
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
