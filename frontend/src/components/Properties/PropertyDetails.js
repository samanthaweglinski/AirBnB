import React, { useEffect } from "react";
import { useParams, useHistory, NavLink, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { findPropertyById, deletePropertyById } from "../../store/property";
import "./Properties.css";
import PropertyReviews from "../Reviews/PropertyReviews";

const PropertyDetails = ({ passedPropId, hideButtons }) => {
  let { propertyId } = useParams();
  if (!propertyId) {
    propertyId = passedPropId;
  }
  propertyId = Number(propertyId);
  const dispatch = useDispatch();
  const history = useHistory();
  const prop = useSelector((state) => state.properties[propertyId]);
  // console.log('Prop:', prop)
  const sessionUser = useSelector((state) => state.session.user);

  const removeProperty = (e) => {
    e.preventDefault();
    dispatch(deletePropertyById(propertyId));
    history.push("/currentUser/properties");
  };

  useEffect(() => {
    dispatch(findPropertyById(propertyId));
  }, [dispatch, propertyId]);

  return (
    <div>
      <div key={prop?.id}>
        <h3>{prop?.name}</h3>
        <h4>
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
                  <button onClick={removeProperty}>Delete</button>
                </div>
              )}
            </>
          ) : (
            <></>
          )}
        </div>
        <br></br>
        <img
          src={prop?.previewImage}
          alt="property_preview_image"
        ></img>
        <p>{prop?.description}</p>
        <p> Price: ${prop?.price}/night</p>
        <div className="property_review_details">
          <div className="avg_rating_component_and_reviews">
            <div className="star_reviews_avg">
              <i className="fa-solid fa-star"></i>
              Average rating component
            </div>
            <div className="total_reviews">{`${prop?.numReviews} reviews`}</div>
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
