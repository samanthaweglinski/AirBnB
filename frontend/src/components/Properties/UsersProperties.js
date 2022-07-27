import React, { useEffect } from "react";
// import { useParams, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  // deletePropertyById,
  // editAProperty,
  getCurrentUserProperties,
} from "../../store/property";
import Property from "./index";
import "./Properties.css";

const UsersProperties = () => {
  const dispatch = useDispatch();
  // const history = useHistory();
  const prop = useSelector((state) => state.properties?.currentUserProperties);
  const currentUser = useSelector((state) => state.session?.user)
  console.log("prop:", prop);
  // const sessionUser = useSelector((state) => state.session.user);

  // let avgReviewRating = prop[propertyId]?.avgStarRating;
  // avgReviewRating = Math.round(avgReviewRating * 100) / 100;

  // const wholeNumbers = [1, 2, 3, 4, 5];
  // if (wholeNumbers.includes(avgReviewRating))
  //   avgReviewRating = avgReviewRating.toString() + ".0";

  // const handleEdit = (e) => {
  //   e.preventDefault();
  //   dispatch(editAProperty(propertyId));
  //   history.push(`/properties/${propertyId}/edit`);
  // };

  // const removeProperty = (e) => {
  //   e.preventDefault();
  //   dispatch(deletePropertyById(propertyId));
  //   history.push("/");
  // };

  useEffect(() => {
    dispatch(getCurrentUserProperties());
  }, [dispatch, currentUser]);

  return (
    <div>
      {prop?.map((ele) => <Property key={ele.id} passedPropId={ele.id} />)}
    </div>
  );
};

export default UsersProperties;
