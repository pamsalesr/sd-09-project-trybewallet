import React from 'react';
import { Route, Switch } from 'react-router';
import { Login, Wallet } from './pages';

function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </div>
  );
}

export default App;
