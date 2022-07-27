import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import PropertyDetails from "./components/Properties";
import PropertyForm from "./components/Properties/PropertyForm";
import { Modal } from "../src/context/Modal";
import LoginForm from "./components/LoginFormModal/LoginForm";


function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  // const [showModal, setShowModal] = useState(false);
  const showLoginModal = useSelector((state) => state.session.showLoginModal);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

  // useEffect(() => {
  //   dispatch(sessionActions.setShowLoginModal(true))
  // }, [dispatch]);

  return (
    <>
      <Navigation isLoaded={isLoaded} />
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/properties/:propertyId">
            <PropertyDetails />
          </Route>
          <Route exact path="/properties/">
            <PropertyForm />
          </Route>
        </Switch>
      )}
      {showLoginModal && (
        <Modal
          onClose={() => dispatch(sessionActions.setShowLoginModal(false))}
        >
          You must be logged in.
          <LoginForm />
        </Modal>
      )}
    </>
  );
}

export default App;
