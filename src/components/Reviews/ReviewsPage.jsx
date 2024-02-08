import { fetchMovieReviews } from "../../api/api";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ReviewsPage = () => {
  const [reviewsDetails, setReviewsDetails] = useState(null);
  const { movieId } = useParams();
  useEffect(() => {
    fetchMovieReviews(movieId)
      .then((response) => setReviewsDetails(response))
      .catch((err) => console.error(err));
  }, [movieId]);
  return (
    <div>
      {reviewsDetails && reviewsDetails.results && reviewsDetails.results.length > 0 ? (
        <div>
          {reviewsDetails.results.map((review) => (
            <ul key={review.id}>
              <li>Author: {review.author}</li>
              <p>{review.content}</p>
              <hr />
            </ul>
          ))}
        </div>
      ) : (
        <ul>We dont have any reviews for this movie.</ul>
      )}
    </div>
  );
};

export default ReviewsPage;
