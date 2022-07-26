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

const findMyProperties = (properties) => ({
  type: FIND_MY_PROPERTIES,
  properties,
});

const editProperty = (updatedProperty) => ({
  type: UPDATE_PROPERTY,
  updatedProperty,
});

const createProperty = () => ({
  type: CREATE_PROPERTY,
});

const deleteProperty = () => ({
  type: DELETE_PROPERTY,
});

// Thunks
export const listAllProperties = () => async (dispatch) => {
  const response = await csrfFetch(`/api/properties`)
  // console.log('res:', response)
  if (response.ok) {
    const propertiesObj = await response.json()
    dispatch(listProperties(propertiesObj))
  }
  return response
}

export const findPropertyById = (propertyId) => async (dispatch) => {
  const response = await csrfFetch(`/api/properties/${propertyId}`)
  if (response.ok) {
    const property = await response.json()
    dispatch(findProperty(property))
  }
  return response
}

export const updateProperty = (propertyData) => async (dispatch) => {
  const { id, address, city, state, country, lat, lng, name, description, price, previewImage, ownerId } = propertyData
  const response = await csrfFetch(`/api/properties/${id}`, {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ id, address, city, state, country, lat, lng, name, description, price, previewImage, ownerId })
  })
  if (response.ok) {
    const updatedProperty = await response.json()
    dispatch(editProperty(updatedProperty))
    return updatedProperty
  }
}

// Store/State Changes
const initialState = {}

const propertyReducer = (state = initialState, action) => {
  const newState = { ...state }
  switch (action.type) {
    case LIST_PROPERTIES: {
      // for (let prop in action.properties) newState[prop.id] = prop
      // return
      return {
        ...state,
        properties: action.properties
      }
    }
    case FIND_PROPERTY: {
      newState[action.property.id] = action.property
      return newState
    }
    case UPDATE_PROPERTY: {
      newState[action.updatedProperty.id] = action.updatedProperty
      return newState
    }
    default:
      return newState
  }
}

export default propertyReducer
