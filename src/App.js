import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';

export default class App extends Component {
  renderRoutes() {
    return (
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    );
  }

  render() {
    return (
      <>
        { this.renderRoutes() }
      </>
    );
  }
}
