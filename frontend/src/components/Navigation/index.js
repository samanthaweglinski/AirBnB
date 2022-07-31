import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = <ProfileButton user={sessionUser} />;
  } else {
    sessionLinks = (
      <>
        <div className="home_buttons">
          <span className="login">
            <LoginFormModal />
          </span>
          <span className="signup">
            <SignupFormModal />
          </span>
          <span className="demo_user">
            <DemoUser />
          </span>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="navigation_bar">
        <div>
          <NavLink
            exact
            to="/"
            className="nav_link home_link"
            id="propdnd_logo"
          >
            <span
              className="iconify"
              data-icon="fa-brands:airbnb"
              data-width="40"
            ></span>
            <span className="propdnd_logo">propdnd</span>
          </NavLink>
        </div>
        <div>
          <NavLink to="/properties" className="become_a_host">
            <button type="button">
              Become a Host
            </button>
          </NavLink>
        </div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
