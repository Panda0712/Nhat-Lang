"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, CustomerTransactions } from "./columns";

type TransactionsClientWrapperProps = {
  initialTransactions: CustomerTransactions[];
};

export function TransactionClientWrapper({
  initialTransactions,
}: TransactionsClientWrapperProps) {
  const [transactions, setTransactions] =
    useState<CustomerTransactions[]>(initialTransactions);

  const handleTransactionDelete = (transactionId: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  const handleTransactionUpdate = (
    transactionId: number,
    updatedData: CustomerTransactions
  ) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === transactionId ? updatedData : transaction
      )
    );
  };

  const handleDataChange = (newData: CustomerTransactions[]) => {
    setTransactions(newData);
  };

  return (
    <DataTable
      columns={columns({
        onTransactionDelete: handleTransactionDelete,
        onTransactionUpdate: handleTransactionUpdate,
      })}
      data={transactions}
      onDataChange={handleDataChange}
    />
  );
}
