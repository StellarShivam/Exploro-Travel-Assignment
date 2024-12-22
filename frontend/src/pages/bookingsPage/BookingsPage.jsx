import AccountNav from "../../routes/accountNav/AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../../components/placeImg/PlaceImg";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";
import BookingDates from "../../components/bookingDates/BookingDates";
import { AuthContext } from "../../context/auth-context";

import "./bookingsPage.scss";

export default function BookingsPage() {
  const apiUrl = process.env.REACT_APP_BACKEND_URI;
  const auth = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };

        const response = await axios.get(
          `${apiUrl}/api/booking/getMyBookings`,
          config
        );
        setBookings(response.data.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchBookings();
  }, []);

  return (
    <div className="bookings-container">
      <AccountNav />
      <div className="bookings-list">
        {bookings?.length > 0 &&
          bookings.map((booking) => (
            <Link
              to={`/account/bookings/${booking._id}`}
              className="booking-card"
              key={booking._id}
            >
              <div className="booking-image">
                <PlaceImg place={booking.trip} />
              </div>
              <div className="booking-details">
                <h2>{booking.trip.title}</h2>
                <div className="booking-info">
                  <BookingDates booking={booking} className="booking-dates" />
                  <div className="price-container">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z"
                      />
                    </svg>
                    <span className="price">
                      Total price: ₹{booking.totalPrice}
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}

        {bookings?.length == 0 && (
          <div className="profile-container">
            <div className="profile-content">
              <div className="user-info">No Bookings</div>
              <Link to="/">
                <button className="logout-button">Find Now</button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
