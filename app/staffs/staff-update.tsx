/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Staff } from "./columns";

type StaffClientWrapperProps = {
  initialStaffs: Staff[];
  userData: any;
};

export function StaffClientWrapper({
  initialStaffs,
  userData,
}: StaffClientWrapperProps) {
  const [staffs, setStaffs] = useState<Staff[]>(initialStaffs);

  const handleStaffDelete = (staffId: number) => {
    setStaffs((prevStaffs) =>
      prevStaffs.filter((staff) => staff.id !== staffId)
    );
  };

  const handleStaffUpdate = (staffId: number, updatedData: Staff) => {
    setStaffs(
      staffs.map((staff) => (staff.id === staffId ? updatedData : staff))
    );
  };

  const handleDataChange = (newData: Staff[]) => {
    setStaffs(newData);
  };

  return (
    <DataTable
      columns={columns({
        onStaffDelete: handleStaffDelete,
        onStaffUpdate: handleStaffUpdate,
        userRole: userData?.role || "USER",
      })}
      data={staffs}
      onDataChange={handleDataChange}
    />
  );
}
