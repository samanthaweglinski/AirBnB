import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getPropertyReviews } from "../../store/review";

function StarReviews({ property }) {
  const dispatch = useDispatch();
  const [avgRating, setAvgRating] = useState(null)


  useEffect(() => {
    async function fetchData() {
      //no property id
      if (!property?.id) return
      //get reviews
      const response = await dispatch(getPropertyReviews(property?.id));
      // console.log('response:', response)
      //if property has no reviews
      if (!response?.length) {
        return setAvgRating('New')
      }
      // get average and set
      const sum = response.reduce((acc, review) => (review?.stars ?? 0) + acc, 0)
      setAvgRating(sum/response.length)
    }
    fetchData();
  }, [dispatch, property?.id]);

  return (
    <>
      <>
        <i className="fa-solid fa-star"></i>
        <span className="avg-rating">
          {avgRating}
        </span>
      </>
    </>
  );
}

export default StarReviews;
