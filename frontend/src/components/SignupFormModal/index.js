import React from "react";
import { useDispatch } from "react-redux";
import "./SignupForm.css";
import * as sessionActions from "../../store/session";

function SignupFormModal() {
  const dispatch = useDispatch();

  return (
    <button
      className="button-23"
      onClick={() => dispatch(sessionActions.setShowSignupModal(true))}
    >
      Sign Up
    </button>
  );
}

export default SignupFormModal;
