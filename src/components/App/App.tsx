import { useState } from "react";

import css from "./App.module.css";
import { toast } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";
import SearchBar from "../SearchBar/SearchBar";
import type { Movie } from "../../types/movie";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";
function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [error, setError] = useState(false);
  const [modal, setModal] = useState<Movie | null>(null);
  const handleSearch = async (query: string) => {
    setError(false);
    setIsLoading(true);
    setMovies([]);
    try {
      const data = await fetchMovies(query);
      if (data.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(data);
    } catch {
      setError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelect = (movie: Movie) => {
    setModal(movie);
  };
  const handleClose = () => {
    setModal(null);
  };
  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {isLoading && <Loader />}
      {error && <ErrorMessage />}
      {modal && <MovieModal movie={modal} onClose={handleClose} />}
    </div>
  );
}

export default App;
