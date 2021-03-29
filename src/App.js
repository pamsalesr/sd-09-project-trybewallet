import React, { Component } from 'react';
import Login from './pages/Login';
import Wallet from './pages/Wallet'
import './App.css'


class App extends Component {
  render() {
    return (
      <div className="App">
        <Login />
        <Wallet />
      </div>
    );
  }
};

export default App;
