import { useEffect, useState } from "react";
import { createBooking } from "../../store/booking";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import LoginFormModal from "../LoginFormModal";
import { format } from "date-fns";
import "./CreateBookingForm.css"

const BookingForm = ({ property, star, review }) => {
  let { propertyId } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();
  const sessionUser = useSelector((state) => state.session.user);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [today, setToday] = useState(
    new Date(
      new Date(new Date().getTime() + 24 * 60 * 60 * 1000) -
        new Date().getTimezoneOffset()
    )
  );

  const [tomorrow, setTomorrow] = useState(
    new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
  );

  const [startDate, setStartDate] = useState(format(today, "yyy-MM-dd"));

  const [endDate, setEndDate] = useState(
    format(new Date(today).getTime() + 120 * 60 * 60 * 1000, "yyy-MM-dd")
  );

  const [timeDifference, setTimeDifference] = useState(
    new Date(endDate).getTime() - new Date(startDate).getTime()
  );

  const [daysCount, setDaysCount] = useState(
    timeDifference / (1000 * 3600 * 24)
  );

  const [subTotal, setSubTotal] = useState(property.price * daysCount);

  const [cleaningFee, setCleaningFee] = useState(Math.ceil(property.price / 5));

  const [serviceFee, setServiceFee] = useState(Math.ceil(subTotal / 4));

  const [total, setTotal] = useState(subTotal - cleaningFee + serviceFee);

  const getDate = (today) => {
    let result;
    let month =
      today.getMonth() + 1 < 10
        ? `0${today.getMonth() + 1}`
        : today.getMonth() + 1;
    let day = today.getDate() < 10 ? `0${today.getDate()}` : today.getDate();
    result = `${today.getFullYear()}-${month}-${day}`;
    return result;
  };

  useEffect(() => {
    let updatedStart = new Date(startDate);
    let updatedEnd = new Date(endDate);
    if (updatedStart.getTime() >= updatedEnd.getTime()) {
      setEndDate(
        format(
          new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000),
          "yyy-MM-dd"
        )
      );
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    } else {
      setTomorrow(
        new Date(new Date(updatedStart).getTime() + 48 * 60 * 60 * 1000)
      );
    }
    setErrors(errors);
  }, [startDate]);

  useEffect(() => {
    setTimeDifference(
      new Date(endDate).getTime() - new Date(startDate).getTime()
    );
    setDaysCount(timeDifference / (1000 * 3600 * 24));
    setSubTotal(property.price * daysCount);
    setServiceFee(subTotal / 4);
    setTotal(subTotal - cleaningFee + serviceFee);
  }, [startDate, endDate, timeDifference, daysCount, subTotal, serviceFee, property.price, cleaningFee]);

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)
    try {
      const booking = await dispatch(createBooking(property.id, { startDate, endDate }))
      history.push(`/currentUser/bookings`)
    } catch (error) {
      const errors = await error.json()
      const newErrors = [];
      for (let error in errors.errors) {
        newErrors.push(errors.errors[error])
      }
      setErrors(newErrors)
    }
  }
  const showLogin = (e) => {
    e.preventDefault()
    setShowLoginModal(true)
  }

  var formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",

    // These options are needed to round to whole numbers.
    //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
  });

  return (
    <div className="form-container">
      <form className="booking-form" onSubmit={handleSubmit}>
        {showLoginModal && (
          <LoginFormModal
            setShowLoginModal={setShowLoginModal}
            showLoginModal={showLoginModal}
          />
        )}
        <div className="booking-content-wrapper">
          <span className="price-wrapper">
            <strong>${property.price}</strong> night
          </span>
        </div>
        <div className="booking-input-wrapper">
          <div className="checkin-wrapper">
            <div className="checkin">CHECK-IN</div>
            <input
              type="date"
              id="start"
              name="trip-start"
              value={startDate}
              className="checkin"
              min={format(today, "yyyy-MM-dd")}
              onChange={(e) => setStartDate(e.target.value)}
            ></input>
          </div>
          <div className="checkout-wrapper">
            <div className="checkout">CHECK-OUT</div>
            <input
              type="date"
              id="end"
              name="trip-start"
              value={endDate}
              className="checkout"
              min={format(tomorrow, "yyyy-MM-dd")}
              onChange={(e) => setEndDate(e.target.value)}
            ></input>
          </div>
        </div>
        <div className="booking-errors-container">
          {errors && errors.length > 0 && (
            <ul className="errors-list">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          )}
        </div>
        <p className="no-charge">You won't be charged yet</p>
        <div className="adjusted-pricing-container">
          <div className="adjusted-pricing initial">
            <u>
              {formatter.format(property.price)} x {daysCount}{" "}
              {daysCount === 1 ? "night" : "nights"}
            </u>
            <span>{formatter.format(subTotal)}</span>
          </div>
          <div className="adjusted-pricing">
            <u>Cleaning Fee</u>
            <span>{formatter.format(cleaningFee)}</span>
          </div>
          <div className="adjusted-pricing last">
            <u>Service fee</u>
            <span>{formatter.format(serviceFee)}</span>
          </div>
          <div className="adjusted-pricing total">
            <span>Total before taxes</span>
            <span>{formatter.format(total)}</span>
          </div>
          <div className="reserve-button">
          {sessionUser ? (
          <button
            className="button-23"
            onClick={handleSubmit}
            type="submit"
          >
            Reserve
          </button>
        ) : (
          <button onClick={showLogin} className="button-23">
            Login to reserve a date
          </button>
        )}
          </div>
        </div>
      </form>
    </div>
  );

};

export default BookingForm;
