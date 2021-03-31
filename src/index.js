import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './index.css';
import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import Wallet from './pages/Wallet';
import store from './store';
import App from './App';

ReactDOM.render(
  <BrowserRouter>
    <Provider store={ store }>
      <Switch>
        <Route exact path="/" component={ App } />
        <Route exact path="/carteira" component={ Wallet } />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root'),
);

serviceWorker.unregister();
