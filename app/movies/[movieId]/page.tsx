import { getMovieById } from "@/app/_lib/action";
import { extractYear } from "@/app/_lib/helpers";
import Image from "next/image";
import React from "react";

const MovieDetailsPage = async ({
  params,
}: {
  params: { movieId: string };
}) => {
  const { movie } = await getMovieById(params.movieId);

  return (
    <div className="flex flex-col py-8 px-4 mb-16">
      <div className="flex justify-center items-center gap-x-6 sm:gap-x-10">
        <div className="w-[300px] h-[400px] relative">
          <Image
            src={movie[0].thumb_url}
            fill
            className="rounded-md"
            alt={`${movie[0].name} image`}
          />
        </div>

        <div className="text-white">
          <div className="border-b-[#94a3b8] pb-4 mb-3 border-b-2 border-opacity-15">
            <h3 className="text-center font-medium uppercase text-lg">
              {movie[0].name}
            </h3>
            <p className="text-center text-base">{movie[0].original_name}</p>
          </div>
          <div className="flex flex-col">
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Trạng thái: {movie[0].current_episode}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Số tập: {movie[0].total_episodes}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Thời lượng: {movie[0].time}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Chất lượng: {movie[0].quality}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Đạo diễn: {movie[0].director}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Diễn viên: {movie[0].casts}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Danh sách: {movie[0].category}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Thể loại: {movie[0].group}
            </span>
            <span className="border-b-2 pb-2 mb-1 border-b-[#94a3b8] border-opacity-15">
              Năm phát hành: {extractYear(movie[0].created)}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full h-[1px] mt-12 bg-[#dcdcdc] bg-opacity-15"></div>

      <div className="text-white mt-3">
        <h2 className="text-lg border-b-2 pb-3 mb-4 border-b-[#94a3b8] border-opacity-15">
          Nội dung phim
        </h2>
        <p className="max-w-[90%]">{movie[0].description}</p>
      </div>
    </div>
  );
};

export default MovieDetailsPage;
