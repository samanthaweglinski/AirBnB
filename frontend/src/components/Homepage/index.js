import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllProperties } from "../../store/property";
import "./Homepage.css";
import StarReviews from "../Reviews/StarReviews";

const Homepage = () => {
  const dispatch = useDispatch();
  const allPropsObj = useSelector((state) => state.properties);
  const allProps = Object.values(allPropsObj) //changing to array to .map

  useEffect(() => {
    dispatch(listAllProperties());
  }, [dispatch]);

  if (!allProps) return null;

  return (
    <>
      <div className="allProperties">
        <h2>All Properties</h2>
        {allProps.map((ele) => (
          <Link to={`/properties/${ele.id}`} key={ele.id} className="singleProperty">
            <div key={ele.id}>
              {/* <h3>{ele.name}</h3> */}
              <h4>
                {ele.city}, {ele.state}
              </h4>
              <img src={ele.previewImage} alt={ele.name}></img>
              {/* <p>{ele.description}</p> */}
              <p className="propertyPrice"> Price: ${ele.price}/night</p>
              <div className="property-rating" id="star_review_score">
                <StarReviews property={ele}/>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
