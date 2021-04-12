import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <div>
      Hello, TrybeWallet! \\//
      <BrowserRouter>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </BrowserRouter>
    </div>);
}

export default App;
