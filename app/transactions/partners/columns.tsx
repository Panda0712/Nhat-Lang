/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
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
import { PartnerTransactionsSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  deletePartnerTransactions,
  updatePartnerTransactions,
} from "@/app/_lib/action";
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

export type PartnerTransactions = {
  id: number;
  movie_id: number;
  partner_id: number;
  contract_cost: number;
  contract_date: string;
  details: string;
};

type TableProps = {
  onTransactionDelete: (transactionId: number) => void;
  onTransactionUpdate: (transactionId: number, updatedData: any) => void;
};

export const columns = ({
  onTransactionDelete,
  onTransactionUpdate,
}: TableProps): ColumnDef<PartnerTransactions>[] => [
  {
    accessorKey: "id",
    header: "Mã giao dịch",
  },
  {
    accessorKey: "movie_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-lg">Mã phim</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "partner_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          <span className="text-lg">Mã đối tác</span>
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "contract_cost",
    header: "Chi phí",
  },
  {
    accessorKey: "contract_date",
    header: "Ngày giao dịch",
  },
  {
    accessorKey: "details",
    header: "Chi tiết",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const [isDialogOpen, setIsDialogOpen] = useState(false);
      const [isConfirmOpen, setIsConfirmOpen] = useState(false);
      const [isPending, startTransition] = useTransition();

      const form = useForm<z.infer<typeof PartnerTransactionsSchema>>({
        resolver: zodResolver(PartnerTransactionsSchema),
        defaultValues: {
          movie_id: row.original.movie_id,
          partner_id: row.original.partner_id,
          contract_cost: row.original.contract_cost,
          contract_date: row.original.contract_date,
          details: row.original.details,
        },
      });

      const handleUpdate = (
        values: z.infer<typeof PartnerTransactionsSchema>
      ) => {
        startTransition(async () => {
          try {
            await updatePartnerTransactions(values, row.original.id);
            onTransactionUpdate(row.original.id, {
              ...values,
              id: row.original.id,
            });

            toast.success("Giao dịch đối tác đã được cập nhật thành công!");
            setIsDialogOpen(false);
          } catch (error: any) {
            toast.error(error);
          }
        });
      };

      const handleDelete = async () => {
        try {
          await deletePartnerTransactions(row.original.id);
          toast.success("Giao dịch đối tác đã được xóa thành công!");
          setIsConfirmOpen(false);
          onTransactionDelete(row.original.id);
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
                Chỉnh sửa giao dịch
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => setIsConfirmOpen(true)}
                className="cursor-pointer"
              >
                Xóa giao dịch
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={isConfirmOpen} onOpenChange={setIsConfirmOpen}>
            <DialogContent className="sm:max-w-[425px] min-h-[150px]">
              <DialogHeader>
                <DialogTitle>Xác nhận xóa giao dịch đối tác</DialogTitle>
                <DialogDescription>
                  Bạn chắc chắn muốn xóa giao dịch chứ? Sau khi xóa không thể
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
                <DialogTitle>Chỉnh sửa giao dịch đối tác</DialogTitle>
                <DialogDescription>
                  Thay đổi thông tin giao dịch đối tác tại đây. Ấn lưu khi hoàn
                  thành.
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
                                field.onChange(
                                  value === "" ? null : Number(value)
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="partner_id"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mã đối tác</FormLabel>
                          <FormControl>
                            <Input
                              value={field.value ?? ""}
                              disabled={isPending}
                              type="number"
                              onChange={(e) => {
                                const value = e.target.value;
                                field.onChange(
                                  value === "" ? null : Number(value)
                                );
                              }}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="contract_date"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>
                            Ngày giao dịch (định dạng: yyyy-MM-dd)
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
                      name="contract_cost"
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
                                field.onChange(
                                  value === "" ? null : Number(value)
                                );
                              }}
                            />
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
