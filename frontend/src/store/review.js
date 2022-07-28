import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
// const FIND_MY_REVIEWS = "properties/FIND_MY_REVIEWS";
// const FIND_PROPERTY_REVIEWS = "properties/FIND_PROPERTY_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
const DELETE_REVIEW = "reviews/DELETE_REVIEW";

const getAllReviews = (payload) => {
  return {
    type: GET_REVIEWS,
    payload,
  };
};

// const findMyReviews = (currentUserReviews) => ({
//   type: FIND_MY_REVIEWS,
//   currentUserReviews,
// });

// const findPropertyReviews = (propertyReviews) => ({
//   type: FIND_PROPERTY_REVIEWS,
//   propertyReviews,
// });

// const createAReview = (payload) => {
//   return {
//     type: CREATE_REVIEW,
//     payload,
//   };
// };

// const deleteAReview = (payload) => {
//   return {
//     type: DELETE_REVIEW,
//     payload,
//   };
// };

export const getPropertyReviews = (propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/reviews/${propertyId}`);
  if (response.ok) {
    const data = await response.json();
    dispatch(getAllReviews(data));
  }
  return response;
};

// export const getUserReviews = () => async (dispatch) => {
//   const response = await csrfFetch(`/api/users/currentUser/reviews`);
//   if (response.ok) {
//     const data = await response.json();
//     dispatch(getAllReviews(data.Reviews));
//   }
//   return response;
// };

const initialState = {};

const reviewsReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
      case GET_REVIEWS:
          newState = Object.assign({}, state);
          action.payload.map(review => newState[review.id] = review);
          return newState;
      case CREATE_REVIEW:
          newState = Object.assign({}, state);
          newState[action.payload.id] = action.payload;
          return newState;
      case DELETE_REVIEW:
          newState = Object.assign({}, state);
          delete newState[action.id];
          return newState;
      default:
          return state;
  }
};

export default reviewsReducer;
