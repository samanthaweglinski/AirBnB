import { csrfFetch } from "./csrf";

// Actions
const LIST_PROPERTIES = "properties/LIST_PROPERTIES";
const FIND_PROPERTY = "properties/FIND_PROPERTY";
const FIND_MY_PROPERTIES = "properties/FIND_MY_PROPERTIES";
const UPDATE_PROPERTY = "properties/UPDATE_PROPERTY";
const CREATE_PROPERTY = "properties/CREATE_PROPERTY";
const DELETE_PROPERTY = "properties/DELETE_PROPERTY";

const listProperties = (properties) => ({
  type: LIST_PROPERTIES,
  properties,
});

const findProperty = (property) => ({
  type: FIND_PROPERTY,
  property,
});

const findMyProperties = (currentUserProperties) => ({
  type: FIND_MY_PROPERTIES,
  currentUserProperties,
});

const editProperty = (property) => ({
  type: UPDATE_PROPERTY,
  property,
});

const createProperty = (property) => ({
  type: CREATE_PROPERTY,
  newProperty: property,
});

const deleteProperty = (property) => ({
  type: DELETE_PROPERTY,
  property,
});

// Thunks
// Get all properties
export const listAllProperties = () => async (dispatch) => {
  const response = await csrfFetch(`/api/properties`);
  // console.log('res:', response)
  if (response.ok) {
    const propertiesObj = await response.json();
    dispatch(listProperties(propertiesObj));
  }
  return response;
};

// Find all users properties
export const getCurrentUserProperties = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/currentUser/properties`);
  // console.log('res:', response)
  if (response.ok) {
    const propertiesObj = await response.json();
    dispatch(findMyProperties(propertiesObj));
  }
  return response;
};

// Get property details by ID
export const findPropertyById = (propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/properties/${propertyId}`);
  if (response.ok) {
    const property = await response.json();
    dispatch(findProperty(property));
    return property;
  }
};

// Create property
export const createNewProperty = (data) => async (dispatch) => {
  // console.log(data);
  const response = await csrfFetch("/api/properties", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // console.log(response);
  if (response.ok) {
    const prop = await response.json();
    dispatch(createProperty(prop));
    return prop;
  }
};

// Edit property
export const editAProperty = (data) => async (dispatch) => {
  const { id, ownerId, address, city, state, country, lat, lng, name, description, price } = data;
  const response = await csrfFetch(`/api/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, ownerId, address, city, state, country, lat, lng, name, description, price }),
  });

  if (response.ok) {
    const updatedProp = await response.json();
    dispatch(editProperty(updatedProp));
    return updatedProp;
  }
};

// Delete property
export const deletePropertyById = (propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/properties/${propertyId}`, {
    method: "DELETE",
    body: JSON.stringify({
      propertyId: propertyId,
    }),
  });
  const deletedRoom = await response.json();
  dispatch(deleteProperty(propertyId));
  return deletedRoom;
};

// Store/State Changes
const initialState = {};

const propertyReducer = (state = initialState, action) => {
  const newState = { ...state };
  switch (action.type) {
    case LIST_PROPERTIES: {
      return {
        ...state,
        properties: action.properties,
      };
    }
    case FIND_PROPERTY: {
      newState[action.property.id] = action.property;
      return newState;
    }
    case FIND_MY_PROPERTIES: {
      return {
        ...state,
        currentUserProperties: action.currentUserProperties,
      };
    }
    case CREATE_PROPERTY: {
      // newState[action.property.id] = action.property;
      return newState;
    }
    case UPDATE_PROPERTY: {
      // newState[action.property.id] = action.property;
      return newState;
    }
    case DELETE_PROPERTY: {
      delete newState[action.propertyId];
      return newState;
    }
    default:
      return newState;
  }
};

export default propertyReducer;
