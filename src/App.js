import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet } from './pages';

function App() {
  return (
    <div>
      <h1>Hello, TrybeWallet!</h1>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
