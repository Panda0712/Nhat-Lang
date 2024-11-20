import { createClient } from "@/utils/supabase/server";
import { getMovies, getUserByEmail } from "../_lib/action";
import { MovieClientWrapper } from "./movie-update";
import { redirect } from "next/navigation";
import MovieCustomer from "./movie-customer";

export default async function MoviePage() {
  const { movies } = await getMovies();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  const userData = await getUserByEmail(user?.email ?? "");

  return (
    <div className="container text-white mx-auto max-w-[90%] pt-8 pb-20">
      <h1 className="sm:text-2xl text-base mb-12 mx-auto font-semibold text-center uppercase">
        Danh sách phim
      </h1>
      {userData?.role !== "ADMIN" ? (
        <MovieCustomer initialMovies={movies} />
      ) : (
        <MovieClientWrapper initialMovies={movies} />
      )}
    </div>
  );
}
