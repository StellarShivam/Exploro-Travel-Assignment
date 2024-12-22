import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceGallery from "../../components/placeGallery/PlaceGallery";
import AddressLink from "../../components/addressLink/AddressLink";
import "./tripBookingsPage.scss";
import AccountNav from "../../routes/accountNav/AccountNav";
import { AuthContext } from "../../context/auth-context";

export default function TripBookingsPage() {
  const apiUrl = process.env.REACT_APP_BACKEND_URI;
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [bookings, setBookings] = useState([]);
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth.token}`,
          },
        };

        const tripResponse = await axios.get(
          `${apiUrl}/api/trip/getTrip/${id}`,
          config
        );
        setTrip(tripResponse.data.trip);

        const bookingsResponse = await axios.get(
          `${apiUrl}/api/booking/getTripBookings/${id}`,
          config
        );
        setBookings(bookingsResponse.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, auth.token]);

  const formatDateWithOrdinal = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const ordinal = getOrdinalSuffix(day);
    const month = date.toLocaleString("en-US", { month: "long" });
    const year = date.getFullYear();
    return `${day}${ordinal} ${month}, ${year}`;
  };

  const getOrdinalSuffix = (day) => {
    if (day > 3 && day < 21) return "th";
    switch (day % 10) {
      case 1:
        return "st";
      case 2:
        return "nd";
      case 3:
        return "rd";
      default:
        return "th";
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (!trip) {
    return <div className="error">Trip not found</div>;
  }

  return (
    <div className="trip-bookings-page">
      <AccountNav />
      <div className="place-header">
        <h1>{trip.title}</h1>
        <AddressLink>{trip.location}</AddressLink>
      </div>

      <PlaceGallery place={trip} />
      <div className="trip-content">
        <div className="trip-info">
          <div className="description-section">
            <h2>Description</h2>
            <p>{trip.description}</p>
          </div>
          <div className="check-details">
            <div className="check-item">
              <span>Start Date:</span> {formatDateWithOrdinal(trip.startDate)}
            </div>
            <div className="check-item">
              <span>End Date:</span> {formatDateWithOrdinal(trip.endDate)}
            </div>
            <div className="check-item">
              <span>Slots Available:</span> {trip.slots}
            </div>
          </div>
        </div>
      </div>

      <div className="bookings-section">
        <h2>Trip Bookings</h2>
        {bookings.length > 0 ? (
          <div className="bookings-grid">
            {bookings.map((booking) => (
              <div key={booking._id} className="booking-card">
                <div className="booking-header">
                  <h3>{booking.name}</h3>
                  <span className="booking-date">
                    Booked on: {formatDateWithOrdinal(booking.bookingDate)}
                  </span>
                </div>
                <div className="booking-details">
                  <div className="detail-item">
                    <span className="label">Phone:</span>
                    <span className="value">{booking.phone}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Slots Booked:</span>
                    <span className="value">{booking.noOfPeople}</span>
                  </div>
                  <div className="detail-item">
                    <span className="label">Name:</span>
                    <span className="value">{booking.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-bookings">
            <p>No bookings found for this trip.</p>
          </div>
        )}
      </div>

      <div className="extra-info">
        <h2>Cancellation Policy</h2>
        <p>{trip.cancellationPolicy}</p>
      </div>
    </div>
  );
}
