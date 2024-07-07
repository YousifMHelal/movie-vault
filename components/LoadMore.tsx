"use client";

import Image from "next/image";
import { useInView } from "react-intersection-observer";
import { useEffect, useState } from "react";
import { fetchMovies } from "../app/action";
import MovieCard, { MovieProp } from "./MovieCard";

let page = 2;

function LoadMore() {
  const { ref, inView } = useInView();

  const [data, setData] = useState<MovieProp[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (inView) {
      setIsLoading(true);
      const delay = 500;

      const timeoutId = setTimeout(() => {
        const fetchData = async () => {
          const res = await fetchMovies(page);
          setData((prevData) => [...prevData, ...res]);
        };
        fetchData();
        page++;

        setIsLoading(false);
      }, delay);

      return () => clearTimeout(timeoutId);
    }
  }, [inView, data, isLoading]);

  return (
    <>
      <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
        {data.map((item: MovieProp, index: number) => (
          <MovieCard key={item.id} movie={item} index={index} />
        ))}
      </section>
      <section className="flex justify-center items-center w-full">
        <div ref={ref}>
          {inView && isLoading && (
            <Image
              src="/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          )}
        </div>
      </section>
    </>
  );
}

export default LoadMore;
