import { getMovies } from "../_lib/action";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default async function MoviePage() {
  const { movies } = await getMovies();

  return (
    <div className="container text-white mx-auto max-w-[80%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-normal text-center uppercase">
        Danh sách phim
      </h1>
      <DataTable columns={columns} data={movies} />
    </div>
  );
}
