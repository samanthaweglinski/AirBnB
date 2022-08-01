import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPropertyReviews } from "../../store/review";
import "./UsersReviews";
import "./PropertyReviews.css"

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
    <div className="reviews_div">
      {reviews && (
        <>
          {reviews.map((review) => (
            <div key={review.id} className="ind_review">
              <div className="review-list-rating">
                {/* <div>Rating: </div> */}
                <i className="fa-solid fa-star"></i>
                <p>Rating: {review.stars} star(s)</p>
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
