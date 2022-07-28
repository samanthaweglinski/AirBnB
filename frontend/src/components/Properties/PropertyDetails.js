import React, { useEffect } from "react";
import { useParams, useHistory, NavLink } from "react-router-dom";
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
  const prop = useSelector((state) => state.properties);
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
      <div key={prop[propertyId]?.id}>
        <h3>{prop[propertyId]?.name}</h3>
        <h4>
          {prop[propertyId]?.city}, {prop[propertyId]?.state}
        </h4>
        <div>
          {sessionUser ? (
            <>
              {!hideButtons && sessionUser?.id === prop[propertyId]?.ownerId && (
                <div>
                  <NavLink to={`/properties/${propertyId}/edit`}>
                    <button>Edit</button>
                  </NavLink>
                  <button onClick={removeProperty}>Delete</button>
                </div>
              )}
            </>
          ) : (
            <>Cannot edit or delete</>
          )}
        </div>
        <br></br>
        <img
          src={prop[propertyId]?.previewImage}
          alt="property_preview_image"
        ></img>
        <p>{prop[propertyId]?.description}</p>
        <p> Price: ${prop[propertyId]?.price}/night</p>
        <div>
          <div>
            <div className="star_reviews_avg">
              <i className="fa-solid fa-star"></i>
                Average rating
            </div>
            <div className="total_reviews">{`${prop[propertyId]?.numReviews} reviews`}</div>
            <PropertyReviews />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
