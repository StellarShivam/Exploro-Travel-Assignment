import React, { useEffect, useState } from "react";
import "./main.scss";
import { Link } from "react-router-dom";

import {
  HiOutlineClipboardCheck,
  HiOutlineLocationMarker,
} from "react-icons/hi";

import Aos from "aos";
import "aos/dist/aos.css";
import axios from "axios";

const Main = () => {
  const [allTrips, setAllTrips] = useState([]);

  useEffect(() => {
    const fetchAllTrips = async () => {
      try {
        const { data } = await axios.get(
          `http://localhost:3002/api/trip/getAllTrips`
        );
        setAllTrips(data.trips);
      } catch (e) {
        console.log(e);
      }
    };

    fetchAllTrips();
  }, []);

  useEffect(() => {
    Aos.init({ duration: 2000 });
  }, []);

  const truncateDescription = (text, maxLength = 100) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + "...";
  };

  return (
    <section id="trips" className="main container section">
      <div className="secTitle">
        <h3 data-aos="fade-right" className="title">
          Our Upcoming Trips
        </h3>
      </div>
      <div className="secContent grid">
        {allTrips.map(
          ({ _id, photos, title, location, perks, price, description }) => {
            return (
              <div key={_id} data-aos="fade-up" className="singleDestination">
                <div className="imageDiv">
                  <img src={photos[0]} alt={title} />
                </div>
                <div className="cardInfo">
                  <h4 className="destTitle">{title}</h4>
                  <span className="continent flex">
                    <HiOutlineLocationMarker className="icon" />
                    <span className="name">{location}</span>
                  </span>

                  <div className="fees flex">
                    <div className="grade">
                      <span>
                        {perks[0]}
                        <small>+1</small>
                      </span>
                    </div>
                    <div className="price">
                      <h5>₹{price}</h5>
                    </div>
                  </div>
                  <div className="desc">
                    <p>{truncateDescription(description)}</p>
                  </div>
                  <Link to={`/trip/${_id}`}>
                    <button className="btn flex">
                      DETAILS <HiOutlineClipboardCheck className="icon" />
                    </button>
                  </Link>
                </div>
              </div>
            );
          }
        )}
      </div>
    </section>
  );
};

export default Main;
