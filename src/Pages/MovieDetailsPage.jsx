import { Link, Outlet, useParams, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { fetchMovieDetails } from "../api/api";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const TMDbURL = "https://image.tmdb.org/t/p/original";

  useEffect(() => {
    fetchMovieDetails(movieId)
      .then((response) => setMovieDetails(response))
      .catch((err) => console.error(err));
  }, [movieId]);

  const { poster_path, title, vote_average, overview, genres } = movieDetails;
  const { state } = useLocation();
  const backLinkRef = useRef(state?.from || "/");

  return (
    <div>
      <Link to={backLinkRef.current}>Go back</Link>

      <div>
        <div>
          {poster_path ? (
            <img style={{ width: 300 }} src={`${TMDbURL}${poster_path}`} alt="" />
          ) : (
            <img style={{ width: 300 }} src={`https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg`} alt="" />
          )}
        </div>
        <div>
          <h1>{title}</h1>
          <p>IMDB {vote_average && vote_average.toFixed(1)} </p>
          <h2>Overview</h2>
          <p>{overview}</p>
          <h2>Genres</h2>
          {genres && genres.map((genre) => <p key={genre.id}>{genre.name}</p>)}
        </div>
      </div>
      <div>Additional information</div>

      <nav>
        <ul>
          <li>
            <Link to={`/movies/${movieId}/reviews`}>Reviews</Link>
          </li>
          <li>
            <Link to={`/movies/${movieId}/cast`}>Cast</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetails;
