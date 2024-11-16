/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";

import * as z from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

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
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
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
import { Textarea } from "@/components/ui/textarea";
import { MovieSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { deleteMovieById, updateMovie } from "../_lib/action";
import { extractYear, formatDateTime } from "../_lib/helpers";

export type Movie = {
  id: number;
  name: string;
  slug: string;
  original_name: string;
  thumb_url: string;
  poster_url: string;
  created: string;
  modified: string;
  description: string;
  total_episodes: number;
  current_episode: string;
  time: string;
  quality: string;
  language: string;
  director: string;
  casts: string;
  category: string;
  group: string;
};

type TableProps = {
  onMovieDelete: (movieId: number) => void;
  onMovieUpdate: (movieId: number, updatedData: any) => void;
};

export const columns = ({
  onMovieDelete,
  onMovieUpdate,
}: TableProps): ColumnDef<Movie>[] => [
  { accessorKey: "id", header: "Mã" },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-lg">Tên</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex items-center gap-x-3">
        <div className="relative w-[50px] h-[70px]">
          <Image
            src={`${row.original.thumb_url}`}
            fill
            alt={`${row.original.name} image`}
            className="rounded-sm"
          />
        </div>
        <div>
          <Link href={`/movies/${row.original.id}`}>
            <p className="text-[#38bdf8] text-base cursor-pointer transition-all hover:text-[#0ea5e9]">
              {row.original.name}
            </p>
            <p className="max-w-[350px] transition-all cursor-pointer text-sm">
              {row.original.original_name}
            </p>
          </Link>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "current_episode",
    header: "Tình trạng",
  },
  {
    accessorKey: "category",
    header: "Định dạng",
    cell: ({ row }) => (
      <div className="flex flex-col gap-y-2">
        <span>{row.original.category}</span>
        {row.original?.group && <span>{row.original.group}</span>}
      </div>
    ),
  },
  {
    accessorKey: "created",
    header: "Năm",
    cell: ({ row }) => <span>{extractYear(row.original.created)}</span>,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof MovieSchema>>({
        resolver: zodResolver(MovieSchema),
        defaultValues: {
          name: row.original.name,
          original_name: row.original.original_name,
          thumb_url: row.original.thumb_url,
          poster_url: row.original.poster_url,
          description: row.original.description,
          modified: row.original.modified,
          total_episodes: row.original.total_episodes,
          current_episode: row.original.current_episode,
          time: row.original.time,
          quality: row.original.quality,
          language: row.original.language,
          director: row.original.director || "",
          casts: row.original.casts || "",
          category: row.original.category,
          group: row.original.group || "",
        },
      });

      const handleUpdate = (values: z.infer<typeof MovieSchema>) => {
        startTransition(async () => {
          try {
            const updateTime = formatDateTime(new Date());
            values.modified = updateTime;
            await updateMovie(values, row.original.id);
            onMovieUpdate(row.original.id, {
              ...values,
              id: row.original.id,
              slug: row.original.slug,
              created: row.original.created,
              modified: updateTime,
            });

            toast.success("Phim đã được cập nhật thành công!");
            setIsDialogOpen(false);
          } catch (error: any) {
            toast.error(error);
          }
        });
      };

      const handleDelete = async () => {
        try {
          await deleteMovieById(row.original.id);
          toast.success("Phim đã được xóa thành công!");
          setIsConfirmOpen(false);
          onMovieDelete(row.original.id);
        } catch (error: any) {
          toast.error(error.message);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0 border-none outline-none">
                <span className="sr-only">Mở menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <Link href={`/movies/${row.original.id}`}>
                <DropdownMenuItem className="cursor-pointer">
                  Xem thông tin
                </DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer"
              >
                Chỉnh sửa phim
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsConfirmOpen(true)}
                className="cursor-pointer"
              >
                Xóa phim
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[425px] min-h-[150px]">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa phim</DialogTitle>
                <DialogDescription>
                  Bạn chắc chắn muốn xóa phim chứ? Sau khi xóa không thể hồi
                  phục.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <Button
                  className="bg-slate-400 button-row"
                  onClick={() => setIsConfirmOpen(false)}
                >
                  Đóng
                </Button>
                <Button
                  onClick={handleDelete}
                  type="submit"
                  className="button2-row bg-red-600"
                >
                  Xóa
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[525px]">
              <DialogHeader>
                <DialogTitle>Chỉnh sửa phim</DialogTitle>
                <DialogDescription>
                  Thay đổi thông tin phim tại đây. Ấn lưu khi hoàn thành.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdate)}
                  className="space-y-6 max-h-[400px] overflow-auto"
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
                      name="thumb_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ảnh phim</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="poster_url"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Ảnh poster</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} />
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
                              className="min-h-[100px]"
                              {...field}
                              disabled={isPending}
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
                            <Input {...field} disabled={isPending} />
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
                          <FormLabel>Thời lượng</FormLabel>
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
                      Lưu thông tin
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];
