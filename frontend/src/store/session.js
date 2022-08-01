import { csrfFetch } from "./csrf";

const SET_USER = "session/setUser";
const REMOVE_USER = "session/removeUser";
const SET_SHOW_LOGIN_MODAL = "/session/setShowLoginModal";
const SET_SHOW_SIGNUP_MODAL = "/session/setShowSignupModal";

const setUser = (user) => {
  return {
    type: SET_USER,
    payload: user,
  };
};

const removeUser = () => {
  return {
    type: REMOVE_USER,
  };
};

export const setShowLoginModal = (payload) => {
  return {
    type: SET_SHOW_LOGIN_MODAL,
    payload,
  };
};

export const setShowSignupModal = (payload) => {
  return {
    type: SET_SHOW_SIGNUP_MODAL,
    payload,
  };
};

// login thunk
export const login = (user) => async (dispatch) => {
  const { credential, password } = user;
  const response = await csrfFetch("/api/session", {
    method: "POST",
    body: JSON.stringify({
      credential,
      password,
    }),
  });
  const data = await response.json();
  // console.log(data)
  dispatch(setUser(data));
  return response;
};

// restoreUser thunk
export const restoreUser = () => async (dispatch) => {
  const response = await csrfFetch("/api/session");
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// signup thunk
export const signup = (user) => async (dispatch) => {
  const { firstName, lastName, username, email, password } = user;
  const response = await csrfFetch("/api/users", {
    method: "POST",
    body: JSON.stringify({
      firstName,
      lastName,
      username,
      email,
      password,
    }),
  });
  const data = await response.json();
  dispatch(setUser(data.user));
  return response;
};

// logout thunk
export const logout = () => async (dispatch) => {
  const response = await csrfFetch("/api/session", {
    method: "DELETE",
  });
  dispatch(removeUser());
  return response;
};

// Everything in my redux state tree can be accessed by any component wow
const initialState = { user: null, showLoginModal: false };

const sessionReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case SET_USER:
      newState = Object.assign({}, state);
      newState.user = action.payload;
      return newState;
    case REMOVE_USER:
      newState = Object.assign({}, state);
      newState.user = null;
      return newState;
    case SET_SHOW_LOGIN_MODAL:
      newState = Object.assign({}, state); // cloning state object so we dont mutate
      newState.showLoginModal = action.payload; // setting equal to payload when we fire action
      return newState;
    case SET_SHOW_SIGNUP_MODAL:
      newState = Object.assign({}, state); // cloning state object so we dont mutate
      newState.showSignupModal = action.payload; // setting equal to payload when we fire action
      return newState;
    default:
      return state;
  }
};

export default sessionReducer;
