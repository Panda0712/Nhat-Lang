"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Customer } from "./columns";

type CustomerClientWrapperProps = {
  initialCustomers: Customer[];
};

export function CustomerClientWrapper({
  initialCustomers,
}: CustomerClientWrapperProps) {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);

  const handleCustomerDelete = (customerId: number) => {
    setCustomers((prevCustomers) =>
      prevCustomers.filter((customer) => customer.id !== customerId)
    );
  };

  const handleCustomerUpdate = (customerId: number, updatedData: Customer) => {
    setCustomers(
      customers.map((customer) =>
        customer.id === customerId ? updatedData : customer
      )
    );
  };

  const handleDataChange = (newData: Customer[]) => {
    setCustomers(newData);
  };

  return (
    <DataTable
      columns={columns({
        onCustomerDelete: handleCustomerDelete,
        onCustomerUpdate: handleCustomerUpdate,
      })}
      data={customers}
      onDataChange={handleDataChange}
    />
  );
}
