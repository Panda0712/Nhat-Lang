"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns, Partner } from "./columns";

type PartnerClientWrapperProps = {
  initialPartners: Partner[];
};

export function PartnerClientWrapper({
  initialPartners,
}: PartnerClientWrapperProps) {
  const [partners, setPartners] = useState<Partner[]>(initialPartners);

  const handlePartnerDelete = (partnerId: number) => {
    setPartners((prevPartners) =>
      prevPartners.filter((partner) => partner.id !== partnerId)
    );
  };

  const handlePartnerUpdate = (partnerId: number, updatedData: Partner) => {
    setPartners(
      partners.map((partner) =>
        partner.id === partnerId ? updatedData : partner
      )
    );
  };

  const handleDataChange = (newData: Partner[]) => {
    setPartners(newData);
  };

  return (
    <DataTable
      columns={columns({
        onPartnerDelete: handlePartnerDelete,
        onPartnerUpdate: handlePartnerUpdate,
      })}
      data={partners}
      onDataChange={handleDataChange}
    />
  );
}
