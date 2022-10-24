import React from "react";
import { useDispatch } from "react-redux";
import "./LoginForm.css";
import * as sessionActions from "../../store/session";

function LoginFormModal() {
  const dispatch = useDispatch();

  return (
    <button
      className="button-24"
      onClick={() => dispatch(sessionActions.setShowLoginModal(true))}
    >
      Log In
    </button>
  );
}

export default LoginFormModal;
