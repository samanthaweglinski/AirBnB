import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Switch } from "react-router-dom";
import * as sessionActions from "./store/session";
import Navigation from "./components/Navigation";
import Homepage from "./components/Homepage";
import PropertyDetails from "./components/Properties/PropertyDetails";
import PropertyForm from "./components/Properties/PropertyForm";
import { Modal } from "../src/context/Modal";
import LoginForm from "./components/LoginFormModal/LoginForm";
import EditProperty from "./components/Properties/EditPropertyForm";
import UsersProperties from "./components/Properties/UsersProperties";
import PropertyReviews from "./components/Reviews/PropertyReviews";
import UsersReviews from "./components/Reviews/UsersReviews";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const showLoginModal = useSelector((state) => state.session.showLoginModal);

  useEffect(() => {
    dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true));
  }, [dispatch]);

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
          <Route exact path="/properties/:propertyId/edit">
            <EditProperty />
          </Route>
          <Route exact path="/currentUser/properties">
            <UsersProperties />
          </Route>
          <Route exact path="/currentUser/reviews">
            <UsersReviews />
          </Route>
          <Route exact path="/properties/:propertyId/reviews">
            <PropertyReviews />
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
