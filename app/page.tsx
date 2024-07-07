"use client";

import Hero from "@/components/Hero";
import MovieCard, { MovieProp } from "@/components/MovieCard";
import { useEffect, useState, Suspense } from "react";
import { fetchMovies } from "./action";
import LoadMore from "@/components/LoadMore";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

const Page = () => {
  const [data, setData] = useState([]);

  const searchParams = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetchMovies(1, search!);
      setData(res);
    };
    fetchData();
  }, [search]);

  return (
    <section>
      {search ? (
        <div className="flex items-center justify-center text-white font-bold text-xl">
          Searching for: {search}
        </div>
      ) : (
        <Hero />
      )}
      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <h2 className="text-3xl text-white font-bold">Explore Movie</h2>

        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {data.map((item: MovieProp, index: number) => (
            <MovieCard key={item.id} movie={item} index={index} />
          ))}
        </section>
        <LoadMore />
      </main>
    </section>
  );
};

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          <Image
            src="/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      }>
      <Page />
    </Suspense>
  );
}
