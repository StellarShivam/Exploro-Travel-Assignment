import { Link } from "react-router-dom";
import AccountNav from "../../routes/accountNav/AccountNav";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import PlaceImg from "../../components/placeImg/PlaceImg";
import { Trash2, CalendarDays } from "lucide-react";
import "./placesPage.scss";
import { AuthContext } from "../../context/auth-context";

export default function PlacesPage() {
  const auth = useContext(AuthContext);
  const [trips, setTrips] = useState([]);

  const fetchTrips = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };
    try {
      const { data } = await axios.get(
        "http://localhost:3002/api/trip/getMyTrips",
        config
      );
      setTrips(data.trips);
    } catch (error) {
      console.error("Failed to fetch trips:", error);
    }
  };

  useEffect(() => {
    fetchTrips();
  }, []);

  const truncateDescription = (text, maxLength = 300) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  const handleDelete = async (tripId, event) => {
    event.preventDefault(); // Prevent the link click
    event.stopPropagation(); // Prevent event bubbling

    if (!window.confirm("Are you sure you want to delete this trip?")) {
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };

    try {
      const response = await axios.delete(
        `http://localhost:3002/api/trip/deleteTrip/${tripId}`,
        config
      );

      if (response.data.success) {
        setTrips(trips.filter((trip) => trip._id !== tripId));
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Failed to delete the trip";
      alert(errorMessage);
    }
  };

  return (
    <div className="places-container">
      <AccountNav />
      <div className="text-center">
        <Link className="add-place-button" to={"/account/places/new"}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z"
              clipRule="evenodd"
            />
          </svg>
          Add new place
        </Link>
      </div>
      <div className="places-grid">
        {trips.length > 0 &&
          trips.map((trip) => (
            <Link
              key={trip._id}
              to={"/account/places/" + trip._id}
              className="place-link"
            >
              <div className="place-image">
                <PlaceImg place={trip} />
              </div>
              <div className="place-info">
                <h2>{trip.title}</h2>
                <p>{truncateDescription(trip.description)}</p>
              </div>
              <div className="button-group">
                <Link key={trip._id} to={`/account/place/bookings/${trip._id}`}>
                  <button
                    className="action-button bookings-button"
                    aria-label="Show bookings"
                  >
                    <CalendarDays size={20} />
                  </button>
                </Link>
                <button
                  className="action-button delete-button"
                  onClick={(e) => handleDelete(trip._id, e)}
                  aria-label="Delete trip"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
}
