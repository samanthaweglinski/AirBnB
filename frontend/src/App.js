import React from 'react';
import { Route, Switch } from 'react-router-dom';
import LoginFormPage from './components/LoginFormPage';

function App() {
  return (
    <Switch>
      <Route path="/session">
        <LoginFormPage />
      </Route>
    </Switch>
  );
}

export default App;
