import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyReviews } from "../../store/review";
import "./UsersReviews";

function PropertyReviews({ property }) {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => Object.values(state.reviews));
  // console.log("reviews:", reviews);

  useEffect(() => {
    dispatch(getPropertyReviews());
  }, [dispatch]);

  if (reviews.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div>
      {reviews && (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="ind-review">
              <div className="review-list-rating">
                <div>Rating: </div>
                  <i className="fa-solid fa-star"></i>
                  <p>{review.stars}</p>
              </div>
              <div>
                <div>Message: </div>
                <div className="review-content">{review.review}</div>
              </div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PropertyReviews;
