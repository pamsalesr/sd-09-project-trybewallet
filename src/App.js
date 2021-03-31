import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { Login, Wallet } from './pages';

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/carteira" component={ Wallet } />
      </Switch>
    );
  }
}

export default App;
