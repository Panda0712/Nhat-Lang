/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as z from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { ArrowUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PartnerSchema } from "@/schemas";
import { deletePartnerById, updatePartner } from "../_lib/action";
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
import { Input } from "@/components/ui/input";

export type Partner = {
  id: number;
  name: string;
  type: string;
  thumb_image: string;
};

type TableProps = {
  onPartnerDelete: (partnerId: number) => void;
  onPartnerUpdate: (partnerId: number, updatedData: any) => void;
};

export const columns = ({
  onPartnerDelete,
  onPartnerUpdate,
}: TableProps): ColumnDef<Partner>[] => [
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
  },
  {
    accessorKey: "type",
    header: "Loại đối tác",
  },
  {
    accessorKey: "thumb_image",
    header: "Logo",
    cell: ({ row }) => (
      <div className="w-20 h-20 relative">
        <Image
          src={row.original.thumb_image}
          alt="Hình ảnh đối tác"
          fill
          className="rounded-md"
        />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const [isPending, startTransition] = useTransition();
      const [selectedFile, setSelectedFile] = useState<File | null>(null);

      const form = useForm<z.infer<typeof PartnerSchema>>({
        resolver: zodResolver(PartnerSchema),
        defaultValues: {
          name: row.original.name,
          type: row.original.type,
          thumb_image: undefined,
        },
      });

      const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
          if (!file.type.startsWith("image/")) {
            toast.error("File phải là định dạng hình ảnh!");
            return;
          }

          setSelectedFile(file);
          form.setValue("thumb_image", file);
        }
      };

      const handleUpdate = (values: z.infer<typeof PartnerSchema>) => {
        startTransition(async () => {
          try {
            const updateData = {
              name: values.name,
              type: values.type,
              thumb_image: selectedFile
                ? {
                    file: selectedFile,
                    name: selectedFile.name,
                    type: selectedFile.type,
                    size: selectedFile.size,
                  }
                : row.original.thumb_image,
            };

            await updatePartner(updateData, row.original.id);
            onPartnerUpdate(row.original.id, {
              ...values,
              id: row.original.id,
              thumb_image: selectedFile
                ? URL.createObjectURL(selectedFile)
                : row.original.thumb_image,
            });
            toast.success("Đối tác đã được cập nhật thành công!");
            setIsDialogOpen(false);
          } catch (error: any) {
            toast.error(error.message);
          }
        });
      };

      const handleDelete = async () => {
        try {
          await deletePartnerById(row.original.id);
          toast.success("Đối tác đã được xóa thành công!");
          setIsConfirmOpen(false);
          onPartnerDelete(row.original.id);
        } catch (error: any) {
          toast.error(error.message);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer"
              >
                Chỉnh sửa đối tác
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsConfirmOpen(true)}
                className="cursor-pointer"
              >
                Xóa đối tác
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[425px] min-h-[150px]">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa đối tác</DialogTitle>
                <DialogDescription>
                  Bạn chắc chắn muốn xóa đối tác chứ? Sau khi xóa không thể hồi
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
                <DialogTitle>Chỉnh sửa đối tác</DialogTitle>
                <DialogDescription>
                  Thay đổi thông tin đối tác tại đây. Ấn lưu khi hoàn thành.
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
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Loại</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="thumb_image"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logo</FormLabel>
                          <div className="space-y-2">
                            <FormControl>
                              <Input
                                type="text"
                                value={row.original.thumb_image}
                                disabled
                                className="mb-2"
                              />
                            </FormControl>
                            <FormControl>
                              <Input
                                type="file"
                                onChange={handleFileChange}
                                disabled={isPending}
                                accept="image/*"
                              />
                            </FormControl>
                          </div>
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
