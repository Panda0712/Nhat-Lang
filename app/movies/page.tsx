import { getMovies } from "../_lib/action";
import { MovieClientWrapper } from "./movie-update";

export default async function MoviePage() {
  const { movies } = await getMovies();

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách phim
      </h1>
      <MovieClientWrapper initialMovies={movies} />
    </div>
  );
}
