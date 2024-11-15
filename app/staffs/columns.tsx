"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Staff = {
  id: number;
  name: string;
  role: string;
  department: string;
};

export const columns: ColumnDef<Staff>[] = [
  { accessorKey: "id", header: "Mã nhân viên" },
  {
    accessorKey: "name",
    header: "Họ tên",
  },
  {
    accessorKey: "role",
    header: "Vai trò",
  },
  {
    accessorKey: "department",
    header: "Bộ phận",
  },
];
