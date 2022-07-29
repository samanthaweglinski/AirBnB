import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPropertyReviews } from "../../store/review";
import "./UsersReviews";

function PropertyReviews() {
  const dispatch = useDispatch()
  let { propertyId } = useParams();
  propertyId = Number(propertyId);
  const prop = useSelector((state) => state)
  // console.log('prop:', prop)

  useEffect(() => {
    dispatch(getPropertyReviews(propertyId))
  }, [propertyId, dispatch])

  if (Object.values(prop).length === 0) {
    return null
  }

  return (
    <div>
      {/* <h2>My Properties</h2>
      {prop?.forEach((ele) => (
        <div>Pretend its rendering</div>
      ))} */}
      <h3>Reviews</h3>
    </div>
  );
}

export default PropertyReviews;
