import { Link, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import BookingWidget from "../../components/bookingWidget/bookingWidget";
import PlaceGallery from "../../components/placeGallery/PlaceGallery";
import { MapPin, ShoppingCart } from "lucide-react";
import "./tripDescPage.scss";
import AddressLink from "../../components/addressLink/AddressLink";
import { AuthContext } from "../../context/auth-context";

export default function PlacePage() {
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [trip, setTrip] = useState(null);
  const [addingToCart, setAddingToCart] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;

      try {
        const tripResponse = await axios.get(
          `http://localhost:3002/api/trip/getTrip/${id}`
        );
        setTrip(tripResponse.data.trip);

        if (auth.isLoggedIn) {
          const cartConfig = {
            headers: {
              Authorization: "Bearer " + auth.token,
            },
          };
          const cartResponse = await axios.get(
            "http://localhost:3002/api/cart/getCart",
            cartConfig
          );
          console.log(cartResponse.data);
          const isItemInCart = cartResponse.data.some(
            (item) => item.trip._id === tripResponse.data.trip._id
          );
          setIsInCart(isItemInCart);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Error loading trip details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, auth.isLoggedIn, auth.token]);

  const addToCart = async () => {
    try {
      setAddingToCart(true);
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + auth.token,
        },
      };

      const response = await axios.post(
        `http://localhost:3002/api/cart/add`,
        {
          tripId: trip._id,
        },
        config
      );

      setIsInCart(true);
      alert("Trip added to cart successfully!");
    } catch (error) {
      alert("Failed to add trip to cart: " + error.message);
    } finally {
      setAddingToCart(false);
    }
  };

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

  if (loading) return <div className="loading">Loading...</div>;
  if (!trip) return "";

  return (
    <div className="place-page">
      <div className="place-header">
        <div className="header-content">
          <h1>{trip.title}</h1>
          <div className="header-actions">
            <div className="location">
              <AddressLink>{trip.location}</AddressLink>
            </div>
            {auth.isLoggedIn && !isInCart && (
              <button
                onClick={addToCart}
                disabled={addingToCart}
                className="add-to-cart-btn"
              >
                <ShoppingCart size={20} />
                <span>{addingToCart ? "Adding..." : "Add to Cart"}</span>
              </button>
            )}
            {auth.isLoggedIn && isInCart && (
              <button disabled className="add-to-cart-btn in-cart">
                <ShoppingCart size={20} />
                <span>Already In Cart</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <PlaceGallery place={trip} />

      <div className="place-content">
        <div className="place-info">
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
        <BookingWidget place={trip} />
      </div>

      <div className="extra-info">
        <h2>Cancellation Policy</h2>
        <p>{trip.cancellationPolicy}</p>
      </div>
    </div>
  );
}
