"use client";

import { ColumnDef } from "@tanstack/react-table";

export type Customer = {
  id: number;
  name: string;
  type: string;
  contact_info: string;
};

export const columns: ColumnDef<Customer>[] = [
  { accessorKey: "id", header: "Mã khách hàng" },
  {
    accessorKey: "name",
    header: "Tên khách hàng",
  },
  {
    accessorKey: "type",
    header: "Loại khách hàng",
  },
  {
    accessorKey: "contact_info",
    header: "Thông tin giao dịch",
  },
];
