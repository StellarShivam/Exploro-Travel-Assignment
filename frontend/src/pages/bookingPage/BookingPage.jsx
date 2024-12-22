import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import AddressLink from "../../components/addressLink/AddressLink";
import PlaceGallery from "../../components/placeGallery/PlaceGallery";
import BookingDates from "../../components/bookingDates/BookingDates";
import "./bookingPage.scss";
import { AuthContext } from "../../context/auth-context";

export default function BookingPage() {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const auth = useContext(AuthContext);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + auth.token,
          },
        };

        const response = await axios.get(
          `http://localhost:3002/api/booking/getBooking/${id}`,
          config
        );
        setBooking(response.data.data);
      } catch (err) {
        alert(err);
      }
    };

    fetchBooking();
  }, [id]);

  if (!booking) {
    return "";
  }

  return (
    <div className="booking-page">
      <h1>{booking.trip.title}</h1>
      <AddressLink>{booking.trip.location}</AddressLink>
      <div className="booking-info">
        <div className="info-content">
          <h2>Your booking information:</h2>
          <BookingDates booking={booking} />
        </div>
        <div className="price-card">
          <div className="price-label">Total price</div>
          <div className="price-amount">₹{booking.totalPrice}</div>
        </div>
      </div>
      <PlaceGallery place={booking.trip} />
    </div>
  );
}
