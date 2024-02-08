import { useState, useEffect } from "react";
import MovieList from "../components/MovieList/MovieList";
import { fetchTrendingMovies } from "../api/api";
const HomePages = () => {
  const [responseData, setResponseData] = useState(null);

  useEffect(() => {
    fetchTrendingMovies()
      .then((response) => {
        setResponseData(response);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div>
      <h1>Popular today</h1>
      {responseData ? <MovieList movies={responseData.results} /> : <p>Loading...</p>}
    </div>
  );
};

export default HomePages;
