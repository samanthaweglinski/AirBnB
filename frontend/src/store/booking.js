import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_BOOKINGS = "bookings/GET_ALL_BOOKINGS";
// const FIND_BOOKING = "bookings/GET_PROPERTY_BOOKINGS";
const FIND_MY_BOOKINGS = "bookings/FIND_MY_BOOKINGS";
const CREATE_BOOKING = "bookings/CREATE_BOOKING";
const UPDATE_BOOKING = "bookings/UPDATE_BOOKING";
const DELETE_BOOKING = "bookings/DELETE_BOOKING";

const getAllBookingsAction = (bookings) => ({
  type: GET_ALL_BOOKINGS,
  bookings,
});

// const findBookingAction = (bookings) => ({
//   type: FIND_BOOKING,
//   bookings
// })

const findMyBookingsAction = (payload) => ({
  type: FIND_MY_BOOKINGS,
  payload,
});

const createBookingAction = (booking) => ({
  type: CREATE_BOOKING,
  booking,
});

const editBookingAction = (booking) => ({
  typ: UPDATE_BOOKING,
  booking,
});

const deleteBookingAction = (bookingId) => ({
  type: DELETE_BOOKING,
  bookingId,
});

// Thunks

// Get all bookings
export const getAllBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings`);
  if (response.ok) {
    const bookings = await response.json();
    dispatch(getAllBookingsAction(bookings));
    const all = {};
    bookings.forEach((booking) => (all[booking.id] = booking));
    return { ...all };
  }
  return {};
};

// Find current user bookings
export const getUserBookings = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/currentUser/bookings`);
  if (response.ok) {
    const data = await response.json();
    dispatch(findMyBookingsAction(data));
  }
  return response;
};

// Create a booking
export const createBooking = (id, booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${id}`, {
    method: "POST",
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const newBooking = await response.json();
    dispatch(createBookingAction(newBooking));
    return newBooking;
  }
  return response;
};

// Edit a booking
export const editBooking = (booking) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${booking.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking),
  });
  if (response.ok) {
    const editedBooking = await response.json();
    dispatch(editBookingAction(editedBooking));
    return editedBooking;
  }
  return response;
};

// Delete a booking
export const deleteBooking = (bookingId) => async (dispatch) => {
  const response = await csrfFetch(`/api/bookings/${bookingId}`, {
    method: "DELETE",
  });
  const res = await response.json();
  dispatch(deleteBookingAction(bookingId));
  return res;
};

const initialState = {};
const bookingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FIND_MY_BOOKINGS: {
      let newState = {};
      newState = action.payload;
      return newState;
    }
    case DELETE_BOOKING: {
      const newState = { ...state };
      delete newState[action.id];
      return newState;
    }
    case CREATE_BOOKING: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }
    case GET_ALL_BOOKINGS: {
      const allBookings = {};
      action.bookings.forEach((booking) => (allBookings[booking.id] = booking));
      let bookings = { ...allBookings };
      return bookings;
    }
    case UPDATE_BOOKING: {
      const newState = { ...state };
      newState[action.booking.id] = action.booking;
      return newState;
    }
    default:
      return state;
  }
};

export default bookingsReducer;
