"use server";

export async function fetchMovies(page: number, search?: string) {
  const endpoint = search
    ? `https://api.themoviedb.org/3/search/movie?api_key=987ad6fe44b4a35d5d0d5b616b840702&language=en-US&query=${search}`
    : `https://api.themoviedb.org/3/movie/popular?api_key=987ad6fe44b4a35d5d0d5b616b840702&language=en-US&page=${page}`;

  const res = await fetch(endpoint);
  const data = await res.json();
  return data.results;
}

export async function fetchMovie(params: any) {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/${params.id}?api_key=987ad6fe44b4a35d5d0d5b616b840702&language=en-US`
  );

  const data = await response.json();

  return data;
}
