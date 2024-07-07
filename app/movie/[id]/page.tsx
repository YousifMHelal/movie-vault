"use client";

import { fetchMovie } from "@/app/action";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  original_language: string;
  genres: [{ id: number; name: string }];
  homepage: string;
  overview: string;
  belongs_to_collection: { id: string; name: string };
}

const MovieDetails = () => {
  const params = useParams();
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMovie(params);
      setMovie(res);
    };
    fetchData();
  }, [params]);

  if (!movie) return <div>Loading...</div>;

  return (
    <>
      <div className="h-screen flex items-center justify-center">
        <div className="w-full rounded relative grid grid-cols-2">
          <div className="relative w-[400px] h-[450px]">
            <Image
              src={`https://image.tmdb.org/t/p/w500` + movie.poster_path}
              alt={movie.title}
              fill
              className="rounded-xl"
            />
          </div>
          <div className="py-4 flex flex-col gap-3">
            <div className="flex justify-between items-center gap-1">
              <h2 className="font-bold text-white text-2xl line-clamp-1 w-full">
                {movie.title}
              </h2>
              <div className="py-1 px-2 bg-[#161921] rounded-sm w-max">
                <p className="text-white text-xs font-bold capitalize w-max">
                  {movie.release_date}
                </p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              {movie.genres.map((genre) => (
                <p
                  className="py-1 px-2 text-sm bg-[#161921] rounded-sm w-max"
                  key={genre.id}>
                  {genre.name}
                </p>
              ))}
            </div>
            <div>
              <p className="w-10/12 text-justify my-4 text-[#999]">
                {movie.overview}
              </p>
            </div>
            <div className="flex gap-4 items-center">
              <div className="flex gap-2 items-center">
                <Image
                  src="/episodes.svg"
                  alt="episodes"
                  width={20}
                  height={20}
                  className="object-contain"
                />
                <p className="text-base text-white font-bold uppercase">
                  {movie.original_language}
                </p>
              </div>
              <div className="flex gap-2 items-center">
                <Image
                  src="/star.svg"
                  alt="star"
                  width={18}
                  height={18}
                  className="object-contain"
                />
                <p className="text-base font-bold text-[#FFAD49]">
                  {movie.vote_average + " | " + movie.vote_count}
                </p>
              </div>
            </div>
            {movie.belongs_to_collection && (
              <div className="py-1 px-5 my-2 bg-[#161921] rounded-sm w-max">
                {movie.belongs_to_collection?.name}
              </div>
            )}

            <Link
              href={movie.homepage}
              className="underline text-base text-[#999] hover:text-white transition delay-75">
              More Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
