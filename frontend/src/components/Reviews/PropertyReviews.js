import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPropertyReviews } from "../../store/review";
import "./UsersReviews";

function PropertyReviews() {
  const dispatch = useDispatch();
  let { propertyId } = useParams();
  propertyId = Number(propertyId);
  const prop = useSelector((state) => Object.values(state.reviews));
  // console.log("prop:", prop);

  useEffect(() => {
    dispatch(getPropertyReviews(propertyId));
  }, [propertyId, dispatch]);

  if (prop.length === 0) {
    return <p>No reviews yet</p>;
  }

  return (
    <div>
      {/* <h3>Reviews</h3>
      {prop.map((review) => (
        <div key={review.id} className="ind-review">
          <div className="review-list-rating">
            <i className="fa-solid fa-star"></i>
            {review.stars}
          </div>
          <div className="review-content">{review.review}</div>
        </div>
      ))} */}
      {prop && (
        <>
          {prop.map((review) => (
            <div key={review.id} className="ind-review">
              <div className="review-list-rating">
                <i className="fa-solid fa-star"></i>
                <p>{review.stars}</p>
              </div>
              <div className="review-content">{review.review}</div>
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default PropertyReviews;
