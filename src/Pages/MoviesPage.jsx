import { useState, useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";
import MovieList from "../components/MovieList/MovieList";
import { fetchMovies } from "../api/api";

const Movies = () => {
  const location = useLocation();

  const [searchQuery, setSearchQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const handleSearch = useCallback(
    async (query) => {
      const results = await fetchMovies(query);
      setMovies(results);

      const queryParams = new URLSearchParams(location.search);
      queryParams.set("query", query);

      window.history.pushState({}, "", `${window.location.pathname}?${queryParams.toString()}`);
    },
    [location.search]
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const queryFromURL = queryParams.get("query") || "";
    setSearchQuery(queryFromURL);

    if (queryFromURL) {
      handleSearch(queryFromURL);
    }
  }, [location.search, handleSearch]);

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
