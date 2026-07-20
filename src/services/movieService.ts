import axios from "axios";

import type { Movie } from "../types/movie";

const TMDB_TOKEN = import.meta.env.VITE_TMDB_TOKEN;

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesResponse>(
    "https://api.themoviedb.org/3/search/movie",
    {
      params: {
        query,
        language: "uk-UA",
        page: 1,
      },
      headers: {
        Authorization: `Bearer ${TMDB_TOKEN}`,
      },
    },
  );
  return response.data.results;
};
