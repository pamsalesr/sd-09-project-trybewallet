import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Login from './pages/Login';
import NotFound from './pages/NotFound';


function App() {
  return (
    <Switch>
      <Route exact path="/" component={ Login } />
      <Route component={ NotFound } />
    </Switch>
  );
}

export default App;
