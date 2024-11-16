"use client";

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

export type Partner = {
  id: number;
  name: string;
  type: string;
  thumb_image: string;
};

export const columns: ColumnDef<Partner>[] = [
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
          objectFit="cover"
          className="rounded-md"
        />
      </div>
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Chỉnh sửa thông tin</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Xóa đối</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
