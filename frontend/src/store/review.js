import { csrfFetch } from "./csrf";

const GET_REVIEWS = "reviews/GET_REVIEWS";
// const FIND_MY_REVIEWS = "properties/FIND_MY_REVIEWS";
const FIND_PROPERTY_REVIEWS = "properties/FIND_PROPERTY_REVIEWS";
const CREATE_REVIEW = "reviews/CREATE_REVIEW";
// const DELETE_REVIEW = "reviews/DELETE_REVIEW";

// const getAllReviews = (reviews) => {
//   return {
//     type: GET_REVIEWS,
//     reviews,
//   };
// };

// const findMyReviews = (payload) => ({
//   type: FIND_MY_REVIEWS,
//   payload,
// });

const findPropertyReviews = (payload) => {
  return {
    type: FIND_PROPERTY_REVIEWS,
    payload,
  };
};

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
  // console.log(propertyId)
  if (response.ok) {
    const data = await response.json();
    dispatch(findPropertyReviews(data));
    // console.log(response)
    return response;
  }
  return response;
};

// export const findPropertyById = (propertyId) => async (dispatch) => {
//   const response = await csrfFetch(`/api/properties/${propertyId}`);
//   if (response.ok) {
//     const property = await response.json();
//     dispatch(findProperty(property));
//     return property;
//   }
// };

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
  // let newState;
  console.log("random string");
  switch (action.type) {
    case GET_REVIEWS: {
      const newState = {};
      action.reviews.forEach((review) => (newState[review.id] = review));
      return { ...newState };
    }
    case FIND_PROPERTY_REVIEWS: {
      const newState = {};
      action.payload.forEach((review) => (newState[review.id] = review));
      return newState;
    }
    case CREATE_REVIEW: {
      let newState = {}
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    }
    // case DELETE_REVIEW:
    //   newState = Object.assign({}, state);
    //   delete newState[action.id];
    //   return newState;
    default:
      return state;
  }
};

export default reviewsReducer;
