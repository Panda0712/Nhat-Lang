"use client";

import { ColumnDef } from "@tanstack/react-table";
import { extractYear } from "../_lib/helpers";
import Image from "next/image";

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

export const columns: ColumnDef<Movie>[] = [
  { accessorKey: "id", header: "Mã phim" },
  {
    accessorKey: "name",
    header: "Tên",
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
          <p className="text-[#38bdf8] text-base">{row.original.name}</p>
          <p className="max-w-[350px] text-sm">{row.original.original_name}</p>
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
];
