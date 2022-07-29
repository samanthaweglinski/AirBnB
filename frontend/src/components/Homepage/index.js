import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllProperties } from "../../store/property";
import "./Homepage.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const allProps = useSelector((state) => state.properties.properties);

  useEffect(() => {
    dispatch(listAllProperties());
  }, [dispatch]);

  if (!allProps) return null;

  return (
    <>
      <div>
        <h2>All Properties</h2>
        {allProps.map((ele) => (
          <Link to={`/properties/${ele.id}`} key={ele.id}>
            <div key={ele.id}>
              <h3>{ele.name}</h3>
              <h4>
                {ele.city}, {ele.state}
              </h4>
              <img src={ele.previewImage} alt={ele.name}></img>
              <p>{ele.description}</p>
              <p> Price: ${ele.price}/night</p>
              <div className="property-rating" id="star_review_score">
                <i className="fa-solid fa-star"></i>
                Average rating component
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
