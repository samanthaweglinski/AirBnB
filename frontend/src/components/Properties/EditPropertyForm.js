import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Redirect, useHistory, useParams } from "react-router-dom";
import { editAProperty, findPropertyById } from "../../store/property";

const EditProperty = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  let { propertyId } = useParams();
  propertyId = Number(propertyId);
  const [errors, setErrors] = useState([]);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState({})

  const updateAddress = (e) => setSelectedProperty({...selectedProperty, address:e.target.value});
  const updateCity = (e) => setSelectedProperty({...selectedProperty, city:e.target.value});
  const updateState = (e) => setSelectedProperty({...selectedProperty, state:e.target.value});
  const updateCountry = (e) => setSelectedProperty({...selectedProperty, country:e.target.value});
  const updateLat = (e) => setSelectedProperty({...selectedProperty, lat:e.target.value});
  const updateLng = (e) => setSelectedProperty({...selectedProperty, lng:e.target.value});
  const updateName = (e) => setSelectedProperty({...selectedProperty, name:e.target.value});
  const updateDescription = (e) => setSelectedProperty({...selectedProperty, description:e.target.value});
  const updatePrice = (e) => setSelectedProperty({...selectedProperty, price:e.target.value});
  const updatePreviewImage = (e) => setSelectedProperty({...selectedProperty, previewImage:e.target.value});

  useEffect(() => {
    if (!propertyId) history.push("/");
    async function fetchData() {
      const response = await dispatch(findPropertyById(propertyId));
      console.log(response)
      setSelectedProperty(response)
    }
    fetchData();
  }, [dispatch, history, propertyId]);

  if (submitSuccess) {
    return <Redirect to={`/properties/${propertyId}`} />;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);

    return dispatch(editAProperty(selectedProperty, propertyId))
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
          placeholder="Property Name"
          value={selectedProperty.name}
          onChange={updateName}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Address"
          value={selectedProperty.address}
          onChange={updateAddress}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="City"
          value={selectedProperty.city}
          onChange={updateCity}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="State"
          value={selectedProperty.state}
          onChange={updateState}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Country"
          value={selectedProperty.country}
          onChange={updateCountry}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Latitude"
          value={selectedProperty.lat}
          onChange={updateLat}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Longitude"
          value={selectedProperty.lng}
          onChange={updateLng}
        />
      </label>
      <label>
        <input
          type="text"
          placeholder="Description"
          value={selectedProperty.description}
          onChange={updateDescription}
        />
      </label>
      <label>
        <input
          type="text"
          value={selectedProperty.price}
          placeholder="Price"
          onChange={updatePrice}
        />
        <label>
          <input
            type="text"
            placeholder="img-url"
            value={selectedProperty.previewImage}
            onChange={updatePreviewImage}
          />
        </label>
      </label>
      <button type="submit">Confirm Changes</button>
    </form>
  );
};

export default EditProperty;
