import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from './components/login';
import Wallet from './components/wallet';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Switch>
          <Route exat path="/" component={ Login } />
          <Route path="/carteira" component={ Wallet } />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
