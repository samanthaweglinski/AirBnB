import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getCurrentUserProperties } from "../../store/property";
import PropertyDetails from "./PropertyDetails";
import "./Properties.css";

const UsersProperties = () => {
  const dispatch = useDispatch();
  const prop = useSelector((state) => state.properties?.currentUserProperties);
  const currentUser = useSelector((state) => state.session?.user);

  useEffect(() => {
    dispatch(getCurrentUserProperties());
  }, [dispatch, currentUser]);

  return (
    <div>
      <h2>My Properties</h2>
      {prop?.map((ele) => (
        <Link to={`/properties/${ele.id}`} key={ele.id}>
          <PropertyDetails hideButtons key={ele.id} passedPropId={ele.id} />
        </Link>
      ))}
    </div>
  );
};

export default UsersProperties;
