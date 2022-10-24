import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserBookings, deleteBooking } from "../../store/booking";
import "./UsersBookings.css";

function UsersBookings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userBookingsObj = useSelector((state) => state.bookings);
  const userBookings = Object.values(userBookingsObj);
  const [isLoaded, setIsloaded] = useState(false);
  const properties = useSelector((state) => state.properties);

  useEffect(() => {
    dispatch(getUserBookings()).then(() => setIsloaded(true));
  }, [dispatch]);

  const removeBooking = (bookingId) => async (e) => {
    e.preventDefault();
    await dispatch(deleteBooking(bookingId));
    await dispatch(getUserBookings());
    history.push("/currentUser/bookings");
  };

  if (userBookings.length === 0) {
    return <p>Oh no! No bookings yet.</p>;
  }

  return (
    isLoaded && (
      <>
        <h2 className="my_bookings_title">My Bookings</h2>
        <div className="users_bookings_container">
          {userBookings.map((booking) => (
            <div key={booking.id} className="individual_booking">
              <div className="booking_property_picture">
                <img
                  src={properties[booking.propertyId].previewImage}
                  alt="previewimage"
                />
              </div>
              <div className="booking_text_and_button">
                <div className="booking_information">
                  <div className="booking_prop_info">
                    <div className="booking_property_name">
                      {properties[booking.propertyId].name}
                    </div>
                    <div className="booking_property_address">
                      {properties[booking.propertyId].address}
                    </div>
                  </div>
                  <div>
                    <div>Start Date: {booking.startDate}</div>
                    <div>End Date: {booking.endDate}</div>
                  </div>
                </div>
                <div>
                  <button
                    onClick={removeBooking(booking.id)}
                    className="delete-booking-button"
                  >
                    Delete Booking
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </>
    )
  );
}

export default UsersBookings;
