import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserReviews, deleteReview } from "../../store/review";
import "./UsersReviews.css";

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
    await dispatch(deleteReview(reviewId));
    await dispatch(getUserReviews());
    // console.log(`is this hitting`)
    history.push("/currentUser/reviews");
  };

  if (userReviews.length === 0) {
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    isLoaded && (
      <div>
        <h2 className="my_reviews_title">My Reviews</h2>
        {userReviews.map((review) => (
          <div key={review.id} className="ind_review">
            <div className="ind_review_info">
              <div className="review-list-rating">
                <div className="star_info">
                  <i className="fa-solid fa-star"></i>
                  <p className="star_rating">{review.stars} out of 5 stars</p>
                </div>
              </div>
              <div className="review_content">{review.review}</div>
              <button
                onClick={removeReview(review.id)}
                className="button-23"
              >
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    )
  );
}

export default UsersReviews;
