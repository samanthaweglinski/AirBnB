import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { Redirect, useHistory } from "react-router-dom";
import { createNewProperty } from "../../store/property";
// import LoginForm from "../LoginFormModal/LoginForm";
// import { Modal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./PropertyForm.css";

const PropertyForm = ({ property }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [address, setAddress] = useState(property?.address ?? "");
  const [city, setCity] = useState(property?.city ?? "");
  const [state, setState] = useState(property?.state ?? "");
  const [country, setCountry] = useState(property?.country ?? "");
  const [lat, setLat] = useState(property?.lat ?? "");
  const [lng, setLng] = useState(property?.lng ?? "");
  const [name, setName] = useState(property?.name ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [price, setPrice] = useState(property?.price ?? "");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (!user) {
      dispatch(sessionActions.setShowLoginModal(true));
    }
  });


  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(
      createNewProperty({
        address,
        city,
        state,
        country,
        lat,
        lng,
        name,
        description,
        price,
      })
    ).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
          Address
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
          City
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
          State
          <input
            type="text"
            value={state}
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
          Country
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
          Latitude
          <input
            type="text"
            value={lat}
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
          Longitude
          <input
            type="text"
            value={lng}
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
          Name
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
          Description
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
          Price
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <button type="submit">Submit Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
