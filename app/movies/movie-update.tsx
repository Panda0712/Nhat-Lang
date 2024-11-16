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

  const handleMovieUpdate = (movieId: number, updatedData: Movie) => {
    setMovies(
      movies.map((movie) => (movie.id === movieId ? updatedData : movie))
    );
  };

  const handleDataChange = (newData: Movie[]) => {
    setMovies(newData);
  };

  return (
    <DataTable
      columns={columns({
        onMovieDelete: handleMovieDelete,
        onMovieUpdate: handleMovieUpdate,
      })}
      data={movies}
      onDataChange={handleDataChange}
    />
  );
}
