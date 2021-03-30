import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      Hello, TrybeWallet!
      <Switch>
        <Route path="/carteira" component={ Wallet } />
        <Route path="/" exact component={ Login } />
      </Switch>
    </div>
  );
}

export default App;
