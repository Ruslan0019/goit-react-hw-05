import { Link, useLocation } from "react-router-dom";

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul>
      {movies.map((movie) => (
        <Link
          key={movie.id}
          to={`/movies/${movie.id}`}
          state={{ from: location.pathname }}
          style={{
            display: "block",
            marginBottom: 20,
          }}
        >
          {movie.title || movie.name}
        </Link>
      ))}
    </ul>
  );
};

export default MovieList;
