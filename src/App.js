import React from 'react';
// import { Provider } from 'react-redux';
import { Route } from 'react-router';
import Login from './pages/Login';
import Wallet from './pages/Wallet';
// import store from './store';

function App() {
  return (
    <div>
      <Route exact path="/carteira" component={ Wallet } />
      <Route exact path="/" component={ Login } />
    </div>
  );
}

export default App;
