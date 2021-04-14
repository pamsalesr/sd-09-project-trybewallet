import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
import { Provider } from 'react-redux';
import store from './store/index';

function App() {
  return (
    <Provider store={ store }>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    </Provider>
  );
}

export default App;
