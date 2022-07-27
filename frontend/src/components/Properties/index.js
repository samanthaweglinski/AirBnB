import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findPropertyById, deletePropertyById } from "../../store/property";
import "./Properties.css";

const PropertyDetails = () => {
  let { propertyId } = useParams();
  propertyId = Number(propertyId);
  const dispatch = useDispatch();
  const history = useHistory();
  const prop = useSelector((state) => state.properties);
  const sessionUser = useSelector((state) => state.session.user);

  let avgReviewRating = prop[propertyId]?.avgStarRating;
  avgReviewRating = Math.round(avgReviewRating * 100) / 100;

  const wholeNumbers = [1, 2, 3, 4, 5];
  if (wholeNumbers.includes(avgReviewRating))
    avgReviewRating = avgReviewRating.toString() + ".0";

  // const handleEdit = (e) => {
  //   e.preventDefault()
  //   setPage(2)
  // }

  const removeProperty = (e) => {
    e.preventDefault();
    dispatch(deletePropertyById(propertyId));
    history.push("/");
  };

  useEffect(() => {
    dispatch(findPropertyById(propertyId));
  }, [dispatch, propertyId]);

  // if (!prop) return null

  return (
    <div>
      <div key={prop[propertyId]?.id}>
        <h3>{prop[propertyId]?.name}</h3>
        <h4>
          {prop[propertyId]?.city}, {prop[propertyId]?.state}
        </h4>
        {/* <div>{prop[propertyId].images[0].url}</div> */}
        <img
          src={prop[propertyId]?.previewImage}
          alt="property_preview_image"
        ></img>
        <p>{prop[propertyId]?.description}</p>
        <p> Price: ${prop[propertyId]?.price}/night</p>
        <div>
          <i className="fa-solid fa-star"></i>
          {avgReviewRating}
        </div>
        <div>{`${prop[propertyId]?.numReviews} reviews`}</div>
        <div>
          {sessionUser ? (
            <>
              {sessionUser?.id === prop[propertyId]?.id && (
                <div>
                  {/* <button onClick={handleEdit} className="edit-listing-button">Edit</button> */}
                  <button onClick={removeProperty}>Delete</button>
                </div>
              )}
            </>
          ) : (
            <>Is it hitting this</>
          )}
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
