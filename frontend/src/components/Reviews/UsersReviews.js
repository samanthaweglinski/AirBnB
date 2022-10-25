import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, Link } from "react-router-dom";
import { listAllProperties } from "../../store/property";
import { getUserReviews, deleteReview } from "../../store/review";
import "./UsersReviews.css";

function UsersReviews() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userReviewsObj = useSelector((state) => state.reviews);
  const userReviews = Object.values(userReviewsObj);
  const [isLoaded, setIsloaded] = useState(false);
  const properties = useSelector((state) => state?.properties);

  useEffect(() => {
    dispatch(getUserReviews()).then(() => setIsloaded(true));
  }, [dispatch]);

  useEffect(() => {
    dispatch(listAllProperties);
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
        <div className="users-reviews-container">
        {userReviews.map((review) => (
          <Link
            to={`/properties/${properties[review?.propertyId]?.id}`}
            key={review.id}
            className="single_review"
          >
            <div key={review.id} className="ind_review">
              <div className="ind_review_info">
                {/* <div className="property-reviewed-name"> */}
                  <h3>
                {properties[review?.propertyId]?.name}
                  </h3>
                {/* </div> */}
                <div className="review-list-rating">
                  <div className="star_info">
                    <i className="fa-solid fa-star"></i>
                    <p className="star_rating">{review.stars} out of 5 stars</p>
                  </div>
                </div>
                <div className="review_content">{review.review}</div>
                <button onClick={removeReview(review.id)} className="button-23">
                  Delete Review
                </button>
              </div>
            </div>
          </Link>
        ))}
        </div>
      </div>
    )
  );
}

export default UsersReviews;
