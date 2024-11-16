"use client";

import { useState } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { Movie } from "./columns";

type MovieClientWrapperProps = {
  initialMovies: Movie[];
};

export function MovieClientWrapper({ initialMovies }: MovieClientWrapperProps) {
  const [movies, setMovies] = useState<Movie[]>(initialMovies);

  const handleMovieDelete = (movieId: number) => {
    setMovies((prevMovies) =>
      prevMovies.filter((movie) => movie.id !== movieId)
    );
  };

  return (
    <DataTable
      columns={columns({ onMovieDelete: handleMovieDelete })}
      data={movies}
    />
  );
}
