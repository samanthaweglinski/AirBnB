import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserProperties } from "../../store/property";
import PropertyDetails from "./PropertyDetails";
import "./Properties.css";

const UsersProperties = () => {
  const dispatch = useDispatch();
  const userPropertiesObj = useSelector((state) => state.properties);
  const userProperties = Object.values(userPropertiesObj); //changing to array to .map
  const [loaded, setLoaded] = useState(false);
  // console.log("prop:", userProperties);

  useEffect(() => {
    dispatch(getCurrentUserProperties()).then(() => setLoaded(true));
  }, [dispatch]);

  return (
    <div>
      <h2>My Properties</h2>
      {/* {loaded &&
        userProperties.map((ele) => (
          <Link to={`/properties/${ele.id}`} key={ele.id}>
            <PropertyDetails hideButtons key={ele.id} passedPropId={ele.id} />
          </Link>
        ))} */}
      {userProperties.map((ele) => (
          <Link to={`/properties/${ele.id}`} key={ele.id}>
            <div key={ele.id}>
              {/* <h3>{ele.name}</h3> */}
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
  );
};

export default UsersProperties;
