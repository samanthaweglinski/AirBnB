import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findPropertyById, deletePropertyById } from "../../store/property";
import "./PropertyDetails.css";
import "../Reviews/PropertyReviews.css"
import PropertyReviews from "../Reviews/PropertyReviews";
import StarReviews from "../Reviews/StarReviews";

const PropertyDetails = ({ passedPropId, hideButtons }) => {
  let { propertyId } = useParams();
  if (!propertyId) {
    propertyId = passedPropId;
  }
  propertyId = Number(propertyId);
  const dispatch = useDispatch();
  const history = useHistory();
  const prop = useSelector((state) => state.properties[propertyId]);
  const sessionUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(findPropertyById(propertyId));
  }, [dispatch, propertyId]);

  const removeProperty = (propertyId) => async (e) => {
    e.preventDefault();
    await dispatch(deletePropertyById(propertyId));
    // await dispatch(findPropertyById(propertyId))
    history.push("/currentUser/properties");
  };

  return (
    <div className="property_details">
      <div className="detail_border" key={prop?.id}>
        <h3 className="property_name">{prop?.name}</h3>
        <div className="avg_rating">
          <StarReviews property={prop} />
        </div>
        <br></br>
        <h4 className="specific_property_location">
          {prop?.city}, {prop?.state}
        </h4>
        <div>
          {sessionUser ? (
            <>
              {!hideButtons && sessionUser?.id === prop?.ownerId && (
                <div>
                  <NavLink to={`/properties/${propertyId}/edit`}>
                    <button>Edit</button>
                  </NavLink>
                  <button onClick={removeProperty(prop.id)}>Delete</button>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <br></br>
        <div className="specific_property_info">
          <img
            src={prop?.previewImage}
            alt="property_preview_image"
            className="specific_property_image"
          ></img>
          <br></br>
          <p className="specific_property_description">{prop?.description}</p>
          <p className="specific_property_price">
            {" "}
            Price: ${prop?.price}/night
          </p>
        </div>
        <div className="property_review_details">
          <div className="avg_rating_component_and_reviews">
            <div className="star_reviews_avg">
              Review Average:
              <StarReviews property={prop} />
            </div>
            <div className="create_review_button">
              <NavLink to={`/properties/${propertyId}/createReview`}>
                <button>Create Review</button>
              </NavLink>
            </div>
          </div>
          <div>
            <PropertyReviews property={prop} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
