import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyReviews } from "../../store/review";
import "./UsersReviews";
import "./PropertyReviews.css";

function PropertyReviews({ property }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  // console.log("reviews:", reviews);

  useEffect(() => {
    dispatch(getPropertyReviews(property.id));
  }, [dispatch, property.id]);

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div className="reviews_div">
      {reviews && (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="ind-review">
              <div className="review-list-rating">
                <div className="star-info">
                  <i className="fa-solid fa-star"></i>
                  <p>{review.stars} out of 5 stars</p>
                </div>
                <div className="review-content">Message: "{review.review}"</div>
              </div>
              <div></div>
              <br></br>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PropertyReviews;
