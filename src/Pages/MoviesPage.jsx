import { useState, useEffect, useCallback } from "react";
import { useLocation, useSearchParams } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { fetchMovies } from "../api/api";

const Movies = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useCallback(
    async (query) => {
      const results = await fetchMovies(query);
      setMovies(results);

      searchParams.set("query", query);

      setSearchParams(searchParams);
    },
    [searchParams]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromURL = queryParams.get("query") || "";
    setSearchQuery(queryFromURL);

    if (queryFromURL) {
      handleSearch(queryFromURL);
    }
  }, [location.search, handleSearch]);

  useEffect(() => {
    setSearchParams(searchParams);
  }, [searchParams, setSearchParams]);

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchQuery);
    }
  };

  return (
    <div>
      <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} onKeyPress={handleKeyPress} />
      <button onClick={() => handleSearch(searchQuery)}>Search</button>

      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default Movies;
