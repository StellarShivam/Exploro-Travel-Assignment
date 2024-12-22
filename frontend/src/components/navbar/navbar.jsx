import React, { useContext, useState, useEffect } from "react";
import "./navbar.scss";
import { Link } from "react-router-dom";
import { MdOutlineTravelExplore } from "react-icons/md";
import { AiFillCloseCircle } from "react-icons/ai";
import { TbGridDots } from "react-icons/tb";
import { AuthContext } from "../../context/auth-context";

const Navbar = () => {
  const auth = useContext(AuthContext);
  const [active, setActive] = useState("navBar");
  const [activeLink, setActiveLink] = useState("home");

  const showNav = () => {
    setActive("navBar activeNavbar");
  };

  const removeNav = () => {
    setActive("navBar");
  };

  const scrollToSection = (sectionId, linkName) => (e) => {
    e.preventDefault();

    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setActiveLink(linkName);
      removeNav();
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "trips", "contact"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      if (currentSection) {
        setActiveLink(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="navBarSection">
      <header className="header flex">
        <div className="logoDiv">
          <Link
            to="/"
            className="logo flex"
            onClick={() => setActiveLink("home")}
          >
            <h1>
              <MdOutlineTravelExplore className="icon" /> Travel.
            </h1>
          </Link>
        </div>

        <div className={active}>
          <ul className="navLists flex">
            <li className="navItem">
              <Link
                to="/"
                className={`navLink ${activeLink === "home" ? "active" : ""}`}
                onClick={() => {
                  setActiveLink("home");
                  removeNav();
                }}
              >
                Home
              </Link>
            </li>
            <li className="navItem">
              <a
                href="#trips"
                className={`navLink ${activeLink === "trips" ? "active" : ""}`}
                onClick={scrollToSection("trips", "trips")}
              >
                Trips
              </a>
            </li>
            <li className="navItem">
              <a
                href="#contact"
                className={`navLink ${
                  activeLink === "contact" ? "active" : ""
                }`}
                onClick={scrollToSection("contact", "contact")}
              >
                Contact
              </a>
            </li>
            {!auth.isLoggedIn && (
              <Link to="/login">
                <button className="btn">
                  <a href="#">SIGN IN</a>
                </button>
              </Link>
            )}
            {auth.isLoggedIn && (
              <Link to="/account">
                <li className="navItem">
                  <a href="#" className="navLink">
                    Profile
                  </a>
                </li>
              </Link>
            )}
          </ul>

          <div onClick={removeNav} className="closeNavbar">
            <AiFillCloseCircle className="icon" />
          </div>
        </div>
        <div onClick={showNav} className="toggleNavbar">
          <TbGridDots className="icon" />
        </div>
      </header>
    </section>
  );
};

export default Navbar;
