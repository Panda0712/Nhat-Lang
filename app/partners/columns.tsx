"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

export type Partner = {
  id: number;
  name: string;
  type: string;
  thumb_image: string;
};

export const columns: ColumnDef<Partner>[] = [
  { accessorKey: "id", header: "Mã đối tác" },
  {
    accessorKey: "name",
    header: "Tên đối tác",
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
];
