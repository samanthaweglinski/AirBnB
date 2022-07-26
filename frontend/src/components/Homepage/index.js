import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllProperties } from "../../store/property";
import "./Homepage.css";

const Homepage = () => {
  const dispatch = useDispatch();
  const allProps = useSelector((state) => state.properties.properties);
  // console.log("allProps:", allProps);

  useEffect(() => {
    dispatch(listAllProperties());
  }, [dispatch]);

  if (!allProps) return null;

  return (
    <>
      <div>
        <h2>Welcome to Propdnd</h2>
      </div>
      <div>
        {allProps.allProperties.map((ele) => (
          <Link to={`/properties/${ele.id}`}>
            <div key={ele.id}>
              <h3>{ele.name}</h3>
              <h4>
                {ele.city}, {ele.state}
              </h4>
              <img src={ele.previewImage} alt={ele.name}></img>
              <p>{ele.description}</p>
              <p> Price: ${ele.price}/night</p>
              <div className="property-rating">
                <i className="fa-solid fa-star"></i>
                <div className="rating-score">New, if no reviews</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default Homepage;
