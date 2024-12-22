import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Navigate, useParams } from "react-router-dom";
import PhotosUploader from "../../components/photosUploader/PhotosUploader";
import Perks from "../../components/perks/Perks";
import AccountNav from "../../routes/accountNav/AccountNav";
import "./placesFormPage.scss";
import { AuthContext } from "../../context/auth-context";

export default function PlacesFormPage() {
  const apiUrl = process.env.REACT_APP_BACKEND_URI;
  const auth = useContext(AuthContext);
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [cancellationPolicy, setCancellationPolicy] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [slots, setSlots] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);

  const formatDateForInput = (isoString) => {
    if (!isoString) return "";
    return isoString.split("T")[0];
  };

  useEffect(() => {
    if (!id) return;
    const config = {
      headers: {
        "Content-type": "application/json",
      },
    };
    axios.get(`${apiUrl}/api/trip/getTrip/${id}`, config).then((response) => {
      const { data } = response;
      setTitle(data.trip.title);
      setLocation(data.trip.location);
      setAddedPhotos(data.trip.photos);
      setDescription(data.trip.description);
      setPerks(data.trip.perks);
      setCancellationPolicy(data.trip.cancellationPolicy);
      setStartDate(formatDateForInput(data.trip.startDate));
      setEndDate(formatDateForInput(data.trip.endDate));
      setSlots(data.trip.slots);
      setPrice(data.trip.price);
    });
  }, [id]);

  function renderHeader(text, description) {
    return (
      <div className="places-form__section">
        <h2 className="places-form__header">{text}</h2>
        <p className="places-form__description">{description}</p>
      </div>
    );
  }

  async function saveTrip(ev) {
    ev.preventDefault();
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + auth.token,
      },
    };
    const placeData = {
      title,
      location,
      photos: addedPhotos,
      description,
      perks,
      cancellationPolicy,
      startDate,
      endDate,
      slots,
      price,
    };

    console.log(placeData);

    try {
      if (id) {
        const response = await axios.put(
          `${apiUrl}/api/trip/update/${id}`,
          placeData,
          config
        );
        if (response.data.success) {
          alert("Trip updated successfully!");
          setRedirect(true);
        }
      } else {
        const response = await axios.post(
          `${apiUrl}/api/trip/createTrip`,
          placeData,
          config
        );
        if (response.data.success) {
          alert("Trip created successfully!");
          setRedirect(true);
        }
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Something went wrong";
      alert(errorMessage);
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }

  return (
    <div className="places-form__container">
      <AccountNav />
      <form onSubmit={saveTrip}>
        {renderHeader(
          "Title",
          "Title for your place. should be short and catchy as in advertisement"
        )}
        <input
          type="text"
          className="places-form__input"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="title, for example: My lovely apt"
        />

        {renderHeader("Location", "Location to this place")}
        <input
          type="text"
          className="places-form__input"
          value={location}
          onChange={(ev) => setLocation(ev.target.value)}
          placeholder="location"
        />

        {renderHeader("Photos", "more = better")}
        <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />

        {renderHeader("Description", "description of the trip")}
        <textarea
          className="places-form__input places-form__input--textarea"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
        />

        {renderHeader("Cancellation Policy", "Rules for cancellation")}
        <textarea
          className="places-form__input places-form__input--textarea"
          value={cancellationPolicy}
          onChange={(ev) => setCancellationPolicy(ev.target.value)}
        />

        {renderHeader(
          "Start & End Dates",
          "add start and end dates, remember to be on time for trip"
        )}
        <div className="places-form__grid">
          <div className="places-form__dates-grid">
            <div className="places-form__date-input-group">
              <h3>Start Date</h3>
              <input
                type="date"
                className="places-form__input places-form__input--date"
                value={startDate}
                onChange={(ev) => setStartDate(ev.target.value)}
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="places-form__date-input-group">
              <h3>End Date</h3>
              <input
                type="date"
                className="places-form__input places-form__input--date"
                value={endDate}
                onChange={(ev) => setEndDate(ev.target.value)}
                min={startDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
          <div>
            <h3>Slots</h3>
            <input
              type="number"
              className="places-form__input"
              value={slots}
              onChange={(ev) => setSlots(ev.target.value)}
            />
          </div>
          <div>
            <h3>Price per person</h3>
            <input
              type="number"
              className="places-form__input"
              value={price}
              onChange={(ev) => setPrice(ev.target.value)}
            />
          </div>
        </div>
        <div className="save-button-form">
          <button className="places-form__button">Save</button>
        </div>
      </form>
    </div>
  );
}
