import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { getUserBookings, deleteBooking } from "../../store/booking";

function UsersBookings() {
  const dispatch = useDispatch();
  const history = useHistory();
  const userBookingsObj = useSelector((state) => state.bookings);
  const userBookings = Object.values(userBookingsObj);
  const [isLoaded, setIsloaded] = useState(false);

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
    return <p>Oh no! No reviews yet.</p>;
  }

  return (
    isLoaded && (
      <div>
        <h2 className="my_bookings_title">My Reviews</h2>
        {userBookings.map((booking) => (
          <div key={booking.id} className="individual_booking">
            <div>Property Id: {booking.propertyId}</div>
            <div>{booking.startDate}</div>
            <div>{booking.endDate}</div>
            <button onClick={removeBooking(booking.id)} className="button-23">
              Delete Review
            </button>
          </div>
        ))}
      </div>
    )
  );
}

export default UsersBookings
