import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Img from "./CastStyled";
import { fetchMovieCast } from "../../api/api";

const CastPage = () => {
  const [castDetails, setCastDetails] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    fetchMovieCast(movieId)
      .then((response) => setCastDetails(response))
      .catch((err) => console.error(err));
  }, [movieId]);

  return (
    <div>
      {castDetails && castDetails.cast && castDetails.cast.length > 0 ? (
        <div>
          {castDetails.cast.map((actor) => (
            <ul key={actor.id}>
              <div>
                {actor.profile_path ? (
                  <Img src={`https://image.tmdb.org/t/p/original${actor.profile_path}`} alt="" />
                ) : (
                  <Img src={`https://global.discourse-cdn.com/turtlehead/original/2X/c/c830d1dee245de3c851f0f88b6c57c83c69f3ace.png`} alt="" />
                )}
              </div>

              <li>Actor: {actor.name}</li>
              <p>Character: {actor.character}</p>
              <hr />
            </ul>
          ))}
        </div>
      ) : (
        <p>there are no cast.</p>
      )}
    </div>
  );
};

export default CastPage;
