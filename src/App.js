import React from 'react';
import { Switch, Route } from 'react-router';
import ExpensesForm from './components/ExpensesForm';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    <Switch>
      <Route path="/carteira" component={ Wallet } />
      <Route path="/expenses" component={ ExpensesForm } />
      <Route path="/" component={ Login } />
    </Switch>
  );
}

export default App;
