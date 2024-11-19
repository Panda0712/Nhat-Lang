"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, PartnerTransactions } from "./columns";

type TransactionsClientWrapperProps = {
  initialTransactions: PartnerTransactions[];
};

export function TransactionClientWrapper({
  initialTransactions,
}: TransactionsClientWrapperProps) {
  const [transactions, setTransactions] =
    useState<PartnerTransactions[]>(initialTransactions);

  const handleTransactionDelete = (transactionId: number) => {
    setTransactions((prevTransactions) =>
      prevTransactions.filter((transaction) => transaction.id !== transactionId)
    );
  };

  const handleTransactionUpdate = (
    transactionId: number,
    updatedData: PartnerTransactions
  ) => {
    setTransactions(
      transactions.map((transaction) =>
        transaction.id === transactionId ? updatedData : transaction
      )
    );
  };

  const handleDataChange = (newData: PartnerTransactions[]) => {
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
