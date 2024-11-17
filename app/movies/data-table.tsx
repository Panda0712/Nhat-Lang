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

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { CreateMovieSchema, MovieSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { insertMovie } from "../_lib/action";
import { formatDateTime } from "../_lib/helpers";

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
  const [selectedThumbFile, setSelectedThumbFile] = React.useState<File | null>(
    null
  );
  const [selectedPosterFile, setSelectedPosterFile] =
    React.useState<File | null>(null);

  const form = useForm<z.infer<typeof CreateMovieSchema>>({
    resolver: zodResolver(CreateMovieSchema),
    defaultValues: {
      name: "",
      slug: "",
      original_name: "",
      thumb_url: undefined,
      poster_url: undefined,
      description: "",
      total_episodes: undefined,
      current_episode: "",
      time: "",
      quality: "",
      language: "",
      director: "",
      casts: "",
      category: "",
      group: "",
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

  const handleFileThumbChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File phải là định dạng hình ảnh!");
        return;
      }

      setSelectedThumbFile(file);
      form.setValue("thumb_url", file);
    }
  };

  const handleFilePosterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        toast.error("File phải là định dạng hình ảnh!");
        return;
      }

      setSelectedPosterFile(file);
      form.setValue("poster_url", file);
    }
  };

  const handleCreateMovie = (values: z.infer<typeof MovieSchema>) => {
    startTransition(async () => {
      try {
        const updateData = {
          ...values,
          thumb_url: selectedThumbFile
            ? {
                file: selectedThumbFile,
                name: selectedThumbFile.name,
                type: selectedThumbFile.type,
                size: selectedThumbFile.size,
              }
            : values.thumb_url,
          poster_url: selectedPosterFile
            ? {
                file: selectedPosterFile,
                name: selectedPosterFile.name,
                type: selectedPosterFile.type,
                size: selectedPosterFile.size,
              }
            : values.poster_url,
        };

        const currentTime = formatDateTime(new Date());
        updateData.created = currentTime;
        updateData.modified = currentTime;

        const { movie } = await insertMovie(updateData);
        onDataChange([movie[0], ...data]);

        toast.success("Phim đã được thêm thành công");
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
          placeholder="Lọc năm"
          value={(table.getColumn("created")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("created")?.setFilterValue(event.target.value)
          }
          className="max-w-[150px] text-white placeholder:text-[#dcdcdc]"
        />
        <div className="w-4"></div>
        <Input
          placeholder="Lọc định dạng"
          value={
            (table.getColumn("category")?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn("category")?.setFilterValue(event.target.value)
          }
          className="max-w-[290px] text-white placeholder:text-[#dcdcdc]"
        />
        <Button
          onClick={() => setIsModalOpen(true)}
          className="mx-4 bg-blue-600 hover:bg-blue-700 text-white"
        >
          Thêm phim mới
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
      <div className="rounded-md text-white border">
        <Table>
          <TableHeader className="text-white">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="table-row">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="text-white text-lg " key={header.id}>
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
                  className="table-row"
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
                  className="h-24 text-xl text-white text-center"
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
            <DialogTitle>Thêm phim mới</DialogTitle>
            <DialogDescription>
              Nhập thông tin phim mới tại đây. Ấn lưu khi hoàn thành.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleCreateMovie)}
              className="space-x-6 max-h-[400px] overflow-auto"
            >
              <div className="space-y-4 mb-16">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="original_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tên gốc</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Từ khóa</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="thumb_url"
                  render={() => (
                    <FormItem>
                      <FormLabel>Ảnh phim</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={handleFileThumbChange}
                          disabled={isPending}
                          accept="image/*"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="poster_url"
                  render={() => (
                    <FormItem>
                      <FormLabel>Ảnh poster</FormLabel>
                      <FormControl>
                        <Input
                          type="file"
                          onChange={handleFilePosterChange}
                          disabled={isPending}
                          accept="image/*"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nội dung</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          disabled={isPending}
                          className="min-h-[100px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="total_episodes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số tập</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          disabled={isPending}
                          type="number"
                          onChange={(e) =>
                            field.onChange(
                              e.target.value
                                ? Number(e.target.value)
                                : undefined
                            )
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="current_episode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Trạng thái</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="time"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thời gian</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="quality"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Chất lượng</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="language"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Ngôn ngữ</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="director"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đạo diễn</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="casts"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Diễn viên</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Danh mục</FormLabel>
                      <FormControl>
                        <Input {...field} disabled={isPending} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="group"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thể loại</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          value={field.value || ""}
                          disabled={isPending}
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
                  Thêm phim
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
