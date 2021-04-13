import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Carteira from './pages/Carteira';

class App extends React.Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={ Login } />
          <Route path="/carteira" component={ Carteira } />
        </Switch>
      </div>
    );
  }
}

export default App;
