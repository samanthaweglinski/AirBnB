import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ProfileButton from "./ProfileButton";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import DemoUser from "../DemoUser";
import "./Navigation.css";
import SearchBar from "../SearchBar/SearchBar";
import { listAllProperties } from "../../store/property";

function Navigation({ isLoaded }) {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [showMenu, setShowMenu] = useState(false);
  const allPropsObj = useSelector((state) => state.properties);
  const allProps = Object.values(allPropsObj); //changing to array to .map
  // const allProps = dispatch(listAllProperties())
  console.log({allProps})

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);


  useEffect(() => {
    dispatch(listAllProperties())
  }, [dispatch])

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
        <div className="search_bar">
          <SearchBar placeholder="Search for a Property..." data={allProps}/>
        </div>
        <div>
          <NavLink to="/properties" className="become_a_host">
              Become a Host
          </NavLink>
        </div>
        <div>{isLoaded && sessionLinks}</div>
      </div>
    </>
  );
}

export default Navigation;
