import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import { createNewProperty } from "../../store/property";
import * as sessionActions from "../../store/session";
import "./PropertyForm.css";

const PropertyForm = ({ property }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.session.user);
  const [address, setAddress] = useState(property?.address ?? "");
  const [city, setCity] = useState(property?.city ?? "");
  const [state, setState] = useState(property?.state ?? "");
  const [country, setCountry] = useState(property?.country ?? "");
  const [previewImage, setPreviewImage] = useState("");
  const [lat, setLat] = useState(property?.lat ?? "");
  const [lng, setLng] = useState(property?.lng ?? "");
  const [name, setName] = useState(property?.name ?? "");
  const [description, setDescription] = useState(property?.description ?? "");
  const [price, setPrice] = useState(property?.price ?? "");
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(sessionActions.setShowLoginModal(true));
    }
  });

  if (submitSuccess) {
    return <Redirect to="/" />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
      previewImage: previewImage,
    };
    return dispatch(createNewProperty(data))
      .then(async (res) => {
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <div className="form_container">
      <form className="create_property" onSubmit={handleSubmit}>
        <h4 className="form_requirements">Please fill out all of the following fields below:</h4>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <label>
        <span>Address:</span>
          <input
            type="text"
            value={address}
            // placeholder="5 Pope Street"
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </label>
        <label>
        <span>City:</span>
          <input
            type="text"
            value={city}
            // placeholder="San Francisco"
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </label>
        <label>
        <span>State:</span>
          <input
            type="text"
            value={state}
            // placeholder="California"
            onChange={(e) => setState(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Country:</span>
          <input
            type="text"
            value={country}
            // placeholder="Ex: United States of America"
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Latitude:</span>
          <input
            type="text"
            value={lat}
            // placeholder="32.53789"
            onChange={(e) => setLat(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Longitude:</span>
          <input
            type="text"
            value={lng}
            // placeholder="93.32468"
            onChange={(e) => setLng(e.target.value)}
            required
          />
        </label>
        <label>
        <span> Name: </span>
          <input
            type="text"
            value={name}
            // placeholder="Charming Victorian"
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Description:</span>
          <input
            type="text"
            value={description}
            // placeholder="Enjoy the views from the garden!"
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Price per night:</span>
          <input
            type="text"
            value={price}
            // placeholder="250"
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </label>
        <label>
        <span>Image Url:</span>
          <input
            type="text"
            value={previewImage}
            placeholder="img-url"
            onChange={(e) => setPreviewImage(e.target.value)}
            required
          />
        </label>
        <button type="submit" className="create_property_button">Submit Property</button>
      </form>
    </div>
  );
};

export default PropertyForm;
