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

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

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
      // <>
      //   <button onClick={openMenu}>
      //     <i className="fas fa-bars nav_bars_icon"></i>{" "}
      //     <i className="fas fa-user-circle user_icon"></i>
      //     {/* <i class="fa-brands fa-airbnb"></i> */}
      //   </button>
      //   {showMenu && (
      //     <ul className="profile-dropdown">
      //         <LoginFormModal />
      //       <li>
      //       </li>
      //       <li>
      //         <SignupFormModal />
      //       </li>
      //       <li>
      //         <DemoUser />
      //       </li>
      //     </ul>
      //   )}
      // </>
      <>
        <LoginFormModal />
        <SignupFormModal />
        <DemoUser />
      </>
    );
  }

  return (
    <>
      {/* <ul>
        <li> */}
      <NavLink exact to="/">
        {/* <button> */}
        <img
          src="https://1000logos.net/wp-content/uploads/2017/08/Airbnb-logo.jpg"
          alt="airbnb-logo"
          id="airbnb_logo"
        ></img>
        {/* <i className="fa-solid fa-house"></i>
            Home */}
        {/* </button> */}
      </NavLink>
      <i className="fa-solid fa-earth-americas"></i>{" "}
      <NavLink to="/properties">
        <button type="button">Become a Host</button>
      </NavLink>
      {isLoaded && sessionLinks}
      {/* </li>
      </ul> */}
    </>
  );
}

export default Navigation;
