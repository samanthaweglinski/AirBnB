import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/review";
import "./UsersReviews";

function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);
  const [isLoaded, setIsloaded] = useState(false);

  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsloaded(true));
  }, [dispatch]);

  const removeReview = (reviewId) => async (e) => {
    e.preventDefault();
    await dispatch(deleteReview(reviewId))
    await dispatch(getUserReviews())
    console.log(`is this hitting`)
    history.push("/currentUser/reviews");
  };

  if (userReviews.length === 0) {
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    isLoaded && (
      <div>
        <h2>My Reviews</h2>
        {userReviews.map((review) => (
          <div key={review.id} className="ind-review">
            <div className="review-list-rating">
              <i className="fa-solid fa-star"></i>
              <p>{review.stars}</p>
            </div>
            <div className="review-content">{review.review}</div>
            <button onClick={removeReview(review.id)}>Delete Review</button>
          </div>
        ))}
      </div>
    )
  );
}

export default UsersReviews;
