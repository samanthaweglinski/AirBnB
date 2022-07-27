import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";
import { editAProperty } from "../../store/property";

const EditProperty = () => {
  const dispatch = useDispatch();
  let { spotId: propertyId } = useParams();
  propertyId = Number(propertyId);
  const property = useSelector((state) => state.properties);
  const [address, setAddress] = useState(property.address);
  const [city, setCity] = useState(property.city);
  const [state, setState] = useState(property.state);
  const [country, setCountry] = useState(property.country);
  const [lat, setLat] = useState(property.lat);
  const [lng, setLng] = useState(property.lng);
  const [name, setName] = useState(property.name);
  const [description, setDescription] = useState(property.description);
  const [price, setPrice] = useState(property.price);
  const [previewImage, setPreviewImage] = useState(
    "https://images.adsttc.com/media/images/5ecd/d4ac/b357/65c6/7300/009d/large_jpg/02C.jpg?1590547607"
  );
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const updateAddress = (e) => setAddress(e.target.value);
  const updateCity = (e) => setCity(e.target.value);
  const updateState = (e) => setState(e.target.value);
  const updateCountry = (e) => setCountry(e.target.value);
  const updateLat = (e) => setLat(e.target.value);
  const updateLng = (e) => setLng(e.target.value);
  const updateName = (e) => setName(e.target.value);
  const updateDescription = (e) => setDescription(e.target.value);
  const updatePrice = (e) => setPrice(e.target.value);
  // const updatePreviewImage = (e) => setPreviewImage(e.target.value);

  if (submitSuccess) {
    return <Redirect to={`/properties/${propertyId}`} />;
  }
  // const spotId = spot.id;
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    let data = {
      address: address,
      city: city,
      state: state,
      country: country,
      previewImage: previewImage,
      lat: lat,
      lng: lng,
      name: name,
      description: description,
      price: price,
    };

    return dispatch(editAProperty(data, property.id))
      .then(async (res) => {
        console.log("Success");
        setSubmitSuccess(true);
      })
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) setErrors(data.errors);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <ul>
        {errors.map((error, idx) => (
          <li key={idx}>{error}</li>
        ))}
      </ul>
      <label>
        <input
          type="text"
          placeholder="Spot name"
          value={name}
          onChange={updateName}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={updateAddress}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={updateCity}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="State"
          value={state}
          onChange={updateState}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={updateCountry}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Latitude"
          value={lat}
          onChange={updateLat}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Longitude"
          value={lng}
          onChange={updateLng}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={updateDescription}
        />
      </label>
      <label>
        <input
          type="text"
          value={price}
          placeholder="Price"
          onChange={updatePrice}
        />
        <label>
          <input
            type="text"
            placeholder="img-url"
            value={previewImage}
            onChange={setPreviewImage}
          />
        </label>
      </label>
      <button type="submit">Edit Property</button>
    </form>
  );
};

export default EditProperty;
