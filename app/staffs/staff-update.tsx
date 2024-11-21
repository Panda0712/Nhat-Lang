/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { DataTable } from "./data-table";
import { columns, Staff } from "./columns";
import { redirect } from "next/navigation";
import { getUserByEmail } from "../_lib/action";
import { createClient } from "@/utils/supabase/client";

type StaffClientWrapperProps = {
  initialStaffs: Staff[];
};

export function StaffClientWrapper({ initialStaffs }: StaffClientWrapperProps) {
  const [staffs, setStaffs] = useState<Staff[]>(initialStaffs);
  const [userData, setUserData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();

        const userData = await getUserByEmail(user?.email ?? "");
        setUserData(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
        redirect("/login");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (isLoading) {
    return <div>Đang tải...</div>;
  }

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
