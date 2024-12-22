import { useContext, useState, useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "../placesPage/PlacesPage.jsx";
import AccountNav from "../../routes/accountNav/AccountNav.jsx";
import "./profilePage.scss";
import { AuthContext } from "../../context/auth-context.js";

export default function ProfilePage() {
  const auth = useContext(AuthContext);
  const [redirect, setRedirect] = useState(null);
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  let { subpage } = useParams();

  if (subpage === undefined) {
    subpage = "profile";
  }

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const cartConfig = {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      };
      const cartResponse = await axios.get(
        "http://localhost:3002/api/cart/getCart",
        cartConfig
      );
      setTrips(cartResponse.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching trips:", error);
      setLoading(false);
    }
  };

  const removeFromCart = async (itemId) => {
    try {
      const cartConfig = {
        headers: {
          Authorization: "Bearer " + auth.token,
        },
      };
      await axios.delete(
        `http://localhost:3002/api/cart/item/${itemId}`,
        cartConfig
      );
      setTrips(trips.filter((trip) => trip._id !== itemId));
    } catch (error) {
      console.error("Error removing trip:", error);
    }
  };

  return (
    <div className="profile-container">
      <AccountNav />
      {subpage === "profile" && (
        <div className="profile-content">
          <div className="user-info">
            Logged in as {auth.name}({auth.role})
          </div>
          <div className="trips-section">
            <h2 className="trips-title">My Cart</h2>
            {loading ? (
              <div className="loading">Loading trips...</div>
            ) : trips.length > 0 ? (
              <div className="trips-grid">
                {trips.map((data) => (
                  <div key={data.trip._id} className="trip-card">
                    <div className="trip-image">
                      <img
                        src={data.trip.photos[0]}
                        alt={data.trip.title}
                        className="trip-thumbnail"
                      />
                    </div>
                    <div className="trip-details">
                      <h3>{data.trip.title}</h3>
                      <p className="trip-description">
                        {data.trip.description}
                      </p>
                      <div className="trip-info">
                        <span className="trip-duration">
                          {data.noOfPeople} slots
                        </span>
                        <span className="trip-price">₹{data.trip.price}</span>
                      </div>
                      <Link
                        to={`/trip/${data.trip._id}`}
                        className="book-button"
                      >
                        Book Trip
                      </Link>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(data._id)}
                      >
                        Remove from Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-trips">No trips in your cart yet</div>
            )}
          </div>
          <Link to="/" onClick={auth.logout}>
            <button className="logout-button">Logout</button>
          </Link>
        </div>
      )}
      {subpage === "places" && <PlacesPage />}
    </div>
  );
}
