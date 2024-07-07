import Image from "next/image";
import Link from "next/link";

export interface MovieProp {
  id: string;
  title: string;
  poster_path: string;
  release_date: string;
  vote_count: number;
  vote_average: number;
  original_language: string;
}

interface Prop {
  movie: MovieProp;
  index: number;
}

function MovieCard({ movie }: Prop) {
  return (
    <Link
      href={`/movie/${movie.id}`}
      className="max-w-sm rounded relative w-full">
      <div className="relative w-full h-[37vh]">
        {movie.poster_path ? (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            fill
            className="rounded-xl"
          />
        ) : (
          <Image
            src="/no-poster.jpg"
            alt={movie.title}
            fill
            className="rounded-xl"
          />
        )}
      </div>
      <div className="py-4 flex flex-col gap-3">
        <div className="flex justify-between items-center gap-1">
          <h2 className="font-bold text-white text-xl line-clamp-1 w-full">
            {movie.title}
          </h2>
          <div className="py-1 px-2 bg-[#161921] rounded-sm w-max">
            <p className="text-white text-xs font-bold capitalize w-max">
              {movie.release_date}
            </p>
          </div>
        </div>
        <div className="flex gap-4 items-center">
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./episodes.svg"
              alt="episodes"
              width={20}
              height={20}
              className="object-contain"
            />
            <p className="text-base text-white font-bold uppercase">
              {movie.original_language}
            </p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <Image
              src="./star.svg"
              alt="star"
              width={18}
              height={18}
              className="object-contain"
            />
            <p className="text-base font-bold text-[#FFAD49]">
              {movie.vote_average || movie.vote_count}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default MovieCard;
