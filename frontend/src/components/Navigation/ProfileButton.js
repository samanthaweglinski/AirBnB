import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory, Link } from "react-router-dom";
import * as sessionActions from "../../store/session";

function ProfileButton({ user }) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);
  const history = useHistory();

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

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // history.push("/");
  };

  const showUsersProperties = (e) => {};
  const showUsersReviews = (e) => {};
  const showUsersBookings = (e) => {};

  return (
    // <>
    //   <div className="actions_button">
    //     <button className="actions_menu" onClick={openMenu}>
    //       <i className="fas fa-bars nav_bars_icon"></i>
    //       <i className="fas fa-user-circle user_icon"></i>
    //     </button>
    //     {showMenu && (
    //       <div id="menu">
    //         <div className="profile_options">
    //           <NavLink to="/currentUser/properties">
    //             <button onClick={showUsersProperties}>My Properties</button>
    //           </NavLink>
    //           <NavLink to="/currentUser/reviews">
    //             <button onClick={showUsersReviews}>My Reviews</button>
    //           </NavLink>
    //           <NavLink to="/currentUser/bookings">
    //             <button onClick={showUsersBookings}>My Bookings</button>
    //           </NavLink>
    //           <button onClick={logout}>Log Out</button>
    //         </div>
    //         <p>Hello {user.username}!</p>
    //         <p>Email: {user.email}</p>
    //       </div>
    //     )}
    //   </div>
    // </>
    <>
      <div className="actions_button">
        {/* <button className="navBar" onClick={openMenu}>
          <i className="fas fa-bars nav_bars_icon"></i>
          <i className="fas fa-user-circle user_icon"></i>
        </button> */}
        <button className="actions_menu" onClick={openMenu}>
          <i className="fas fa-bars nav_bars_icon"></i>
          <i className="fas fa-user-circle user_icon"></i>
        </button>
        {showMenu && (
          <div id="menu" className="dropdown-options">
            <Link to="/currentUser/properties" id="dropdown">
              My Properties
            </Link>
            <Link to="/currentUser/bookings" id="dropdown">
              My Bookings
            </Link>
            <Link to="/currentUser/reviews" id="dropdown">
              My Reviews
            </Link>
            <Link to="/" id="dropdown">
              <div
                onClick={logout}
                id="dropdown"
                className="logout-profile-button"
              >
                Log out
              </div>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}

export default ProfileButton;
