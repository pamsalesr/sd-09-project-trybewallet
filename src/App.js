import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Wallet from './pages/Wallet';

function App() {
  return (
    // Duas maneiras diferentes de criar rotas:
    // 1ª colocando o destido como filho de Route -- 2ª usando component={}
    <Switch>
      <Route exact path="/"><Login /></Route>
      <Route path="/carteira" component={ Wallet } />
    </Switch>
  );
}

export default App;
