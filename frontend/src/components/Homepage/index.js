import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllProperties } from "../../store/property";
import "./Homepage.css";
import StarReviews from "../Reviews/StarReviews";

const Homepage = () => {
  const dispatch = useDispatch();
  const allPropsObj = useSelector((state) => state.properties);
  const allProps = Object.values(allPropsObj); //changing to array to .map

  useEffect(() => {
    dispatch(listAllProperties());
  }, [dispatch]);

  if (!allProps) return null;

  return (
    <>
      <div className="all_properties">
        {/* <h2>All Properties</h2> */}
        {allProps.map((ele) => (
          <Link
            to={`/properties/${ele.id}`}
            key={ele.id}
            className="single_property"
          >
            <div key={ele.id}>
              <div className="property_image">
                <img
                  src={ele.previewImage}
                  alt={ele.name}
                  className="property_image_display"
                ></img>
              </div>
              <div className="property_info">
                <h4 className="property_location">
                  {ele.city}, {ele.state}
                </h4>
                <p className="property_price"> Price: ${ele.price}/night</p>
                <div className="property_rating" id="star_review_score">
                  <StarReviews property={ele} />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;

