import React from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import './DemoUser.css'

export default function DemoUser() {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const credential = "Demo-lition";
    const password = "password";
    return dispatch(sessionActions.login({ credential, password }));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <button type="submit">Demo</button> */}
      <button className="button-23" type="submit">Demo</button>
    </form>
  );
}
