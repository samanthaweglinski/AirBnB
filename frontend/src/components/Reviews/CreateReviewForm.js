import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { createNewReview } from "../../store/review";
import "./CreateReviewForm.css";

const ReviewForm = () => {
  const dispatch = useDispatch()
  let { propertyId } = useParams()
  propertyId = Number(propertyId)
  const [reviewMessage, setReviewMessage] = useState("");
  const [stars, setStars] = useState("");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  if (submitSuccess) {
    return <Redirect to={`/properties/${propertyId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      review: reviewMessage,
      stars: stars,
    };
    return dispatch(createNewReview(data, propertyId))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        Message:
        <input
          type="text"
          placeholder="Review Message"
          value={reviewMessage}
          onChange={(e) => setReviewMessage(e.target.value)}
          required
        />
      </label>
      <label>
        Stars:
        <input
          type="number"
          placeholder="Rating"
          value={stars}
          onChange={(e) => setStars(e.target.value)}
          required
        />
      </label>
      <button type="submit">Create Review</button>
    </form>
  );
};

export default ReviewForm;
