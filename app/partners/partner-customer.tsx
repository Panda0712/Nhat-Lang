"use client";

import React, { useMemo } from "react";
import { Partner } from "./columns";
import { useRouter, useSearchParams } from "next/navigation";
import { HISTORY_PAGE_SIZE } from "../_lib/constants";
import Image from "next/image";

type PartnerClientWrapperProps = {
  initialPartners: Partner[];
};

const PartnerCustomer: React.FC<PartnerClientWrapperProps> = ({
  initialPartners,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams?.get("page")
    ? parseInt(searchParams.get("page") || "1")
    : 1;

  const paginatedPartners = useMemo(() => {
    const start = (currentPage - 1) * HISTORY_PAGE_SIZE;
    const end = start + HISTORY_PAGE_SIZE;
    return initialPartners.slice(start, end);
  }, [initialPartners, currentPage]);

  const pageCount = Math.ceil(initialPartners.length / HISTORY_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {paginatedPartners.map((partner) => (
          <div
            key={partner.id}
            className="border rounded-lg p-4 flex flex-col items-center"
          >
            <div className="relative w-24 h-24">
              <Image
                src={partner.thumb_image.trimEnd()}
                fill
                alt={partner.name}
                className="object-cover mb-2"
              />
            </div>
            <h3 className="text-center font-bold">{partner.name}</h3>
            <p className="text-center text-gray-600">{partner.type}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12 space-x-2">
        {Array.from({ length: pageCount }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => handlePageChange(page)}
            className={`px-4 py-2 border rounded ${
              currentPage === page
                ? "bg-blue-500 border-none text-white"
                : "bg-white text-blue-500"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PartnerCustomer;
