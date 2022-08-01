import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
// import { Redirect } from 'react-router-dom';
import "./LoginForm.css";

const LoginForm = () => {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors([]);
    await dispatch(sessionActions.login({ credential, password }))
      .then(() => {
        dispatch(sessionActions.setShowLoginModal(false));
      })
      .catch(async (res) => {
        const data = await res.json();
        // console.log(data.message)
        if (data?.message) setErrors([data.message]);
      });
  };


  return (
    <div>
      <form className="login_container" onSubmit={handleSubmit}>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>
        <h1 className="welcome_container">Welcome Back</h1>
        <label>
          <span>Username or Email:</span>
          <input
            className="login_input_credentials"
            type="text"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label>
          <span>Password:</span>
          <input
            className="login_input_password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className="login_button" type="submit">
          Log In
        </button>
      </form>
      <button className="login_button" onClick={() => {
        dispatch(sessionActions.setShowSignupModal(true))
        dispatch(sessionActions.setShowLoginModal(false))
      }}>Don't have an account? Sign Up here!</button>
    </div>
  );
};

export default LoginForm;
