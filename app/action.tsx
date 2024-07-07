"use server";

import MovieCard, { MovieProp } from "@/components/MovieCard";

export async function fetchMovies(page: number, searchParams?: string | "") {
  console.log(searchParams);
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/${
        searchParams ? "search/movie" : "movie/popular"
      }?api_key=987ad6fe44b4a35d5d0d5b616b840702&language=en-US&page=${page}${
        searchParams ? `&query=${searchParams}` : ""
      }`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movies");
    }

    const data = await response.json();

    return data.results.map((item: MovieProp, index: number) => (
      <MovieCard key={item.id} movie={item} index={index} />
    ));
  } catch (error) {
    console.error("Error fetching movies:", error);
    return null;
  }
}

export async function fetchMovie(params: any) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=987ad6fe44b4a35d5d0d5b616b840702&language=en-US`
  );

  const data = await response.json();

  return data;
}
