"use client";

import React, { useMemo } from "react";
import { Movie } from "./columns";
import { useRouter, useSearchParams } from "next/navigation";
import { HISTORY_PAGE_SIZE } from "../_lib/constants";
import {
  ChevronLeft,
  ChevronRight,
  Clock,
  Film,
  Languages,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type MovieClientWrapperProps = {
  initialMovies: Movie[];
};

const MovieCustomer = ({ initialMovies }: MovieClientWrapperProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = searchParams?.get("page")
    ? parseInt(searchParams.get("page") || "1")
    : 1;

  const paginatedMovies = useMemo(() => {
    const start = (currentPage - 1) * HISTORY_PAGE_SIZE;
    const end = start + HISTORY_PAGE_SIZE;
    return initialMovies.slice(start, end);
  }, [initialMovies, currentPage]);

  const pageCount = Math.ceil(initialMovies.length / HISTORY_PAGE_SIZE);

  const handlePageChange = (page: number) => {
    router.push(`?page=${page}`);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const delta = 1;
    const left = currentPage - delta;
    const right = currentPage + delta;

    for (let i = 1; i <= pageCount; i++) {
      if (i === 1 || i === pageCount || (i >= left && i <= right)) {
        pageNumbers.push(i);
      } else if (i === left - 1 || i === right + 1) {
        pageNumbers.push(-1);
      }
    }

    return pageNumbers;
  };

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-4 mt-20 gap-6">
        {paginatedMovies.map((movie) => (
          <Link key={movie.id} href={`/movies/${movie.id}`}>
            <div className="bg-[#272343] text-white rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105">
              <div className="relative text-white">
                <div className="relative w-full h-64">
                  <Image
                    src={movie.thumb_url || movie.poster_url}
                    alt={movie.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute top-2 right-2 bg-black/50 text-white px-2 py-1 rounded">
                  {movie.quality}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2 min-h-[70px] line-clamp-2">
                  {movie.name}
                </h3>
                <div className="flex items-center text-sm text-white mb-2">
                  <Film size={16} className="mr-2" />
                  <span>
                    {movie.category} | {movie.group}
                  </span>
                </div>
                <div className="flex items-center text-sm text-white mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>
                    {movie.time} | {movie.total_episodes} tập
                  </span>
                </div>
                <div className="flex items-center text-sm text-white">
                  <Languages size={16} className="mr-2" />
                  <span>{movie.language}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center items-center mt-12 space-x-2">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="text-black" />
        </button>

        {renderPageNumbers().map((page, index) =>
          page === -1 ? (
            <span key={`ellipsis-${index}`} className="px-2">
              ...
            </span>
          ) : (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-10 h-10 rounded-full ${
                currentPage === page
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {page}
            </button>
          )
        )}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === pageCount}
          className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight className="text-black" />
        </button>
      </div>
    </div>
  );
};

export default MovieCustomer;
