import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Carteira from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Carteira } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}
export default App;
