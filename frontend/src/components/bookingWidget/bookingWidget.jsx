import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth-context";
import "./bookingWidget.scss";

export default function BookingWidget({ place }) {
  const [numberOfPeople, setNumberOfPeople] = useState(1);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [redirect, setRedirect] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("credit_card");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const auth = useContext(AuthContext);

  useEffect(() => {
    if (auth) {
      setName(auth.name);
    }
  }, [auth]);

  const getTodayDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const validateBookingDetails = () => {
    if (numberOfPeople < 1) {
      alert("Please select at least one slot");
      return false;
    }
    if (numberOfPeople > place.slots) {
      alert("Slots not available. Please Lower Down!");
      return false;
    }
    if (name === "" || phone === "") {
      alert("Please provide every details");
      return false;
    }
    return true;
  };

  const validatePaymentDetails = () => {
    if (!cardNumber || cardNumber.length < 16) {
      alert("Please enter a valid card number");
      return false;
    }
    if (!expiryDate) {
      alert("Please enter card expiry date");
      return false;
    }
    if (!cvv || cvv.length < 3) {
      alert("Please enter a valid CVV");
      return false;
    }
    return true;
  };

  async function bookThisPlace() {
    if (!validateBookingDetails()) return;
    setShowPayment(true);
  }

  async function processPayment() {
    if (!validatePaymentDetails()) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:3002/api/payment/makePayment",
        {
          tripId: place._id,
          numberOfPeople,
          totalPrice: numberOfPeople * place.price,
          name,
          phone,
          paymentMethod,
        },
        config
      );

      if (response.data.success) {
        const bookingId = response.data.data.booking._id;
        setRedirect(`/account/bookings/${bookingId}`);
      } else {
        alert("Payment failed. Please try again.");
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Payment failed. Please try again.";
      alert(errorMessage);

      if (error.response?.status === 400) {
        setShowPayment(false);
      }
    }
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <div className="booking-widget">
      <div className="price-header">Price: ₹{place.price} / per person</div>

      <div className="booking-form">
        {auth.isLoggedIn && place.slots != 0 && !showPayment && (
          <>
            <div className="input-group">
              <label>Number of People:</label>
              <input
                type="number"
                value={numberOfPeople}
                onChange={(ev) => setNumberOfPeople(ev.target.value)}
                min="1"
              />
            </div>

            <div className="additional-inputs">
              <div className="input-group">
                <label>Your full name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(ev) => setName(ev.target.value)}
                  placeholder="Enter your name"
                />
              </div>
              <div className="input-group">
                <label>Phone number:</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(ev) => setPhone(ev.target.value)}
                  placeholder="Enter your phone number"
                />
              </div>
            </div>

            <button onClick={bookThisPlace} className="book-button">
              Book this trip IN
              {<span> ₹{numberOfPeople * place.price}</span>}
            </button>
          </>
        )}

        {showPayment && (
          <div className="payment-section">
            <h3>Payment Details</h3>
            <div className="input-group">
              <label>Payment Method:</label>
              <select
                value={paymentMethod}
                onChange={(ev) => setPaymentMethod(ev.target.value)}
              >
                <option value="credit_card">Credit Card</option>
                <option value="debit_card">Debit Card</option>
              </select>
            </div>
            <div className="input-group">
              <label>Card Number:</label>
              <input
                type="text"
                value={cardNumber}
                onChange={(ev) => setCardNumber(ev.target.value)}
                placeholder="1234 5678 9012 3456"
                maxLength="16"
              />
            </div>
            <div className="payment-row">
              <div className="input-group">
                <label>Expiry Date:</label>
                <input
                  type="month"
                  value={expiryDate}
                  onChange={(ev) => setExpiryDate(ev.target.value)}
                />
              </div>
              <div className="input-group">
                <label>CVV:</label>
                <input
                  type="text"
                  value={cvv}
                  onChange={(ev) => setCvv(ev.target.value)}
                  placeholder="123"
                  maxLength="3"
                />
              </div>
            </div>
            <button onClick={processPayment} className="book-button">
              Make Payment
              {<span> ₹{numberOfPeople * place.price}</span>}
            </button>
          </div>
        )}

        {place.slots == 0 && <h4>No Slots Left</h4>}
        {!auth.isLoggedIn && place.slots != 0 && (
          <h4>Please LOGIN to Book Trip</h4>
        )}
      </div>
    </div>
  );
}
