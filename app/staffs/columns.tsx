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
import { StaffSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteStaffById, updateStaff } from "../_lib/action";
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

export type Staff = {
  id: number;
  name: string;
  role: string;
  department: string;
};

type TableProps = {
  onStaffDelete: (staffId: number) => void;
  onStaffUpdate: (staffId: number, updatedData: any) => void;
};

export const columns = ({
  onStaffDelete,
  onStaffUpdate,
}: TableProps): ColumnDef<Staff>[] => [
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
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "department",
    header: "Bộ phận",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof StaffSchema>>({
        resolver: zodResolver(StaffSchema),
        defaultValues: {
          name: row.original.name,
          role: row.original.role,
          department: row.original.department,
        },
      });

      const handleUpdate = (values: z.infer<typeof StaffSchema>) => {
        startTransition(async () => {
          try {
            await updateStaff(values, row.original.id);
            onStaffUpdate(row.original.id, {
              ...values,
              id: row.original.id,
            });

            toast.success("Nhân viên đã được cập nhật thành công!");
            setIsDialogOpen(false);
          } catch (error: any) {
            toast.error(error);
          }
        });
      };

      const handleDelete = async () => {
        try {
          await deleteStaffById(row.original.id);
          toast.success("Nhân viên đã được xóa thành công!");
          setIsConfirmOpen(false);
          onStaffDelete(row.original.id);
        } catch (error: any) {
          toast.error(error.message);
        }
      };

      return (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="h-8 w-8 p-0 border-none outline-none">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={() => setIsDialogOpen(true)}
                className="cursor-pointer"
              >
                Chỉnh sửa nhân viên
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsConfirmOpen(true)}
                className="cursor-pointer"
              >
                Xóa nhân viên
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[425px] min-h-[150px]">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa nhân viên</DialogTitle>
                <DialogDescription>
                  Bạn chắc chắn muốn xóa nhân viên chứ? Sau khi xóa không thể
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
                <DialogTitle>Chỉnh sửa nhân viên</DialogTitle>
                <DialogDescription>
                  Thay đổi thông tin nhân viên tại đây. Ấn lưu khi hoàn thành.
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
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Vai trò</FormLabel>
                          <FormControl>
                            <Input {...field} disabled={isPending} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="department"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Bộ phận</FormLabel>
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
