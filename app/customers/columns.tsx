/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as z from "zod";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { CustomerSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteCustomerById, updateCustomer } from "../_lib/action";
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

export type Customer = {
  id: number;
  name: string;
  type: string;
  contact_info: string;
};

type TableProps = {
  onCustomerDelete: (customerId: number) => void;
  onCustomerUpdate: (customerId: number, updatedData: any) => void;
};

export const columns = ({
  onCustomerDelete,
  onCustomerUpdate,
}: TableProps): ColumnDef<Customer>[] => [
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
    header: "Loại khách hàng",
  },
  {
    accessorKey: "contact_info",
    header: "Thông tin giao dịch",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof CustomerSchema>>({
        resolver: zodResolver(CustomerSchema),
        defaultValues: {
          name: row.original.name,
          type: row.original.type,
          contact_info: row.original.contact_info,
        },
      });

      const handleUpdate = (values: z.infer<typeof CustomerSchema>) => {
        startTransition(async () => {
          try {
            await updateCustomer(values, row.original.id);
            onCustomerUpdate(row.original.id, {
              ...values,
              id: row.original.id,
            });

            toast.success("Khách hàng đã được cập nhật thành công!");
            setIsDialogOpen(false);
          } catch (error: any) {
            toast.error(error);
          }
        });
      };

      const handleDelete = async () => {
        try {
          await deleteCustomerById(row.original.id);
          toast.success("Khách hàng đã được xóa thành công!");
          setIsConfirmOpen(false);
          onCustomerDelete(row.original.id);
        } catch (error: any) {
          toast.error(error.message);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer"
              >
                Chỉnh sửa khách hàng
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsConfirmOpen(true)}
                className="cursor-pointer"
              >
                Xóa khách hàng
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[425px] min-h-[150px]">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa khách hàng</DialogTitle>
                <DialogDescription>
                  Bạn chắc chắn muốn xóa khách hàng chứ? Sau khi xóa không thể
                  hồi phục.
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
                      name="contact_info"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Thông tin giao dịch</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} />
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
