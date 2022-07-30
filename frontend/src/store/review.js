import { csrfFetch } from "./csrf";

const FIND_PROPERTY_REVIEWS = "properties/FIND_PROPERTY_REVIEWS";
const FIND_MY_REVIEWS = "properties/FIND_MY_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const findPropertyReviews = (payload) => {
  return {
    type: FIND_PROPERTY_REVIEWS,
    payload,
  };
};

const findMyReviews = (payload) => {
  return {
    type: FIND_MY_REVIEWS,
    payload,
  };
};

const createAReview = (payload) => {
  return {
    type: CREATE_REVIEW,
    payload,
  };
};

const deleteAReview = (payload) => {
  return {
    type: DELETE_REVIEW,
    payload,
  };
};

export const getPropertyReviews = (propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${propertyId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(findPropertyReviews(data));
    return data;
  }
};

export const getUserReviews = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/currentUser/reviews`);
  if (response.ok) {
    const data = await response.json();
    dispatch(findMyReviews(data));
  }
  return response;
};

export const createNewReview = (data, propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${propertyId}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (response.ok) {
    const review = await response.json();
    dispatch(createAReview(review));
    return review;
  }
};

export const deleteReview = (reviewId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${reviewId}`, {
    method: "DELETE",
  });
  const deletedReview = await response.json();
  dispatch(deleteAReview(reviewId));
  return deletedReview;
};

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case FIND_PROPERTY_REVIEWS: {
      newState = {};
      action.payload.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    case FIND_MY_REVIEWS: {
      newState = {};
      action.payload.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    case CREATE_REVIEW: {
      newState = { ...state };
      newState[action.payload.id] = action.payload;
      return newState;
    }
    case DELETE_REVIEW:
      newState = { ...state };
      delete newState[action.payload.propertyId];
      return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
