import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
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
    history.push("/");
  };

  const showUsersProperties = (e) => { };
  const showUsersReviews = (e) => { };


  return (
    <>
      <button onClick={openMenu}>
        <i className="fa-regular fa-user"></i>
      </button>
      {showMenu && (
        <ul className="profile-dropdown">
          <li>Username: {user.username}</li>
          <li>Email: {user.email}</li>
          <li>
            <NavLink to="/currentUser/properties">
              <button onClick={showUsersProperties}>My Properties</button>
            </NavLink>
          </li>
          <li>
            <NavLink to="/currentUser/reviews">
              <button onClick={showUsersReviews}>My Reviews</button>
            </NavLink>
          </li>
          <li>
            <button onClick={logout}>Log Out</button>
          </li>
        </ul>
      )}
    </>
  );
}

export default ProfileButton;
