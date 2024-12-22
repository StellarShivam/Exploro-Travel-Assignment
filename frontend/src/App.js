import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./routes/layout/Layout";
import "./App.css";
import LandingPage from "./routes/landingPage/LandingPage";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import ProfilePage from "./pages/profilePage/ProfilePage";
import PlacesPage from "./pages/placesPage/PlacesPage";
import BookingsPage from "./pages/bookingsPage/BookingsPage";
import BookingPage from "./pages/bookingPage/BookingPage";
import PlacesFormPage from "./pages/placesFormPage/PlacesFormPage";
import PlacePage from "./pages/tripDescPage/tripDescPage";
import TripBookingsPage from "./pages/tripBookingsPage/TripBookingsPage";
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<ProfilePage />} />
        <Route path="/account/places" element={<PlacesPage />} />
        <Route path="/account/places/new" element={<PlacesFormPage />} />
        <Route path="/account/places/:id" element={<PlacesFormPage />} />
        <Route
          path="/account/place/bookings/:id"
          element={<TripBookingsPage />}
        />
        <Route path="/account/bookings" element={<BookingsPage />} />
        <Route path="/account/bookings/:id" element={<BookingPage />} />
        <Route path="/trip/:id" element={<PlacePage />} />
      </Route>
    </Routes>
  );
};

export default App;
