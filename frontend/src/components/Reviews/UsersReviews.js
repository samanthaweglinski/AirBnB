import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserReviews } from "../../store/review";
import "./UsersReviews";

function UsersReviews() {
  const dispatch = useDispatch();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);

  useEffect(() => {
    dispatch(getUserReviews());
  }, [dispatch]);

  if (userReviews.length === 0) {
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    <div>
      <h2>My Reviews</h2>
      {userReviews.map((review) => (
        <div key={review.id} className="ind-review">
          <div className="review-list-rating">
            <i className="fa-solid fa-star"></i>
            <p>{review.stars}</p>
          </div>
          <div className="review-content">{review.review}</div>
        </div>
      ))}
    </div>
  );
}

export default UsersReviews;
