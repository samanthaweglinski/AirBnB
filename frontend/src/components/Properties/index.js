import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { listAllProperties, findPropertyById } from "../../store/property";
import "./Properties.css";

const PropertyDetails = () => {
  let { propertyId } = useParams();
  propertyId = Number(propertyId);

  const dispatch = useDispatch();
  const prop = useSelector((state) => state.properties);
  // console.log(prop[propertyId].name)

  useEffect(() => {
    dispatch(findPropertyById(propertyId));
  }, [dispatch]);

  // if (!prop) return null

  return (
    <div>
      <div key={prop[propertyId]?.id}>
        <h3>{prop[propertyId]?.name}</h3>
        <h4>
          {prop[propertyId]?.city}, {prop[propertyId]?.state}
        </h4>
        {/* <div>{prop[propertyId].images[0].url}</div> */}
        <img src={prop[propertyId]?.previewImage}></img>
        <p>{prop[propertyId]?.description}</p>
        <p> Price: ${prop[propertyId]?.price}/night</p>
      </div>
    </div>
  );
};

export default PropertyDetails;
