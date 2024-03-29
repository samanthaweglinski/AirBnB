import { csrfFetch } from "./csrf";

// Actions
const GET_ALL_PROPERTIES = "properties/GET_ALL_PROPERTIES";
const FIND_PROPERTY = "properties/FIND_PROPERTY";
const FIND_MY_PROPERTIES = "properties/FIND_MY_PROPERTIES";
const UPDATE_PROPERTY = "properties/UPDATE_PROPERTY";
const CREATE_PROPERTY = "properties/CREATE_PROPERTY";
const DELETE_PROPERTY = "properties/DELETE_PROPERTY";

const getAllProperties = (properties) => ({
  type: GET_ALL_PROPERTIES,
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
  property,
});

const deleteProperty = (property) => ({
  type: DELETE_PROPERTY,
  property,
});

// Thunks
// Get all properties
export const listAllProperties = () => async (dispatch) => {
  const response = await csrfFetch(`/api/properties`);
  if (response.ok) {
    const propertiesObj = await response.json();
    // console.log('propertiesObj:', propertiesObj.allProperties)
    dispatch(getAllProperties(propertiesObj.allProperties));
    return response;
  }
};

// Find all users properties
export const getCurrentUserProperties = () => async (dispatch) => {
  const response = await csrfFetch(`/api/users/currentUser/properties`);
  if (response.ok) {
    const propertiesObj = await response.json();
    dispatch(findMyProperties(propertiesObj));
    return response
  }
  // return response;
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
  const {
    id,
    ownerId,
    address,
    city,
    state,
    country,
    lat,
    lng,
    name,
    description,
    price,
    previewImage,
  } = data;
  const response = await csrfFetch(`/api/properties/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id,
      ownerId,
      address,
      city,
      state,
      country,
      lat,
      lng,
      name,
      description,
      price,
      previewImage,
    }),
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
  if (response.ok) {
    const deletedRoom = await response.json();
    dispatch(deleteProperty(propertyId));
    return deletedRoom;
  }
};

// Store/State Changes MAKING EDITS
const initialState = {};
const propertyReducer = (state = initialState, action) => {
  let newState;
  switch (action.type) {
    case GET_ALL_PROPERTIES: {
      newState = {};
      action.properties.forEach(
        (property) => (newState[property.id] = property)
      );
      return newState;
    }
    case FIND_PROPERTY: {
      newState = {};
      newState[action.property.id] = action.property;
      return newState;
    }
    case FIND_MY_PROPERTIES: {
      newState = {};
      action.currentUserProperties.forEach(property => newState[property.id] = property);
      let allProperties = {...newState};
      return allProperties;
    }
    case CREATE_PROPERTY: {
      newState = { ...state };
      newState[action.property.id] = action.property;
      return newState;
    }
    case UPDATE_PROPERTY: {
      newState = { ...state };
      newState[action.property.id] = action.property;
      return newState;
    }
    case DELETE_PROPERTY: {
      newState = { ...state };
      delete newState[action.propertyId];
      return newState;
    }
    default:
      return state;
  }
};

export default propertyReducer;
