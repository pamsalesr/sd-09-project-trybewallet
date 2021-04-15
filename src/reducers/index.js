import { combineReducers } from 'redux';

import user from './user';
import wallet from './wallet';
import totals from './totals';
import currenciesApi from './currenciesApi';

export default combineReducers({
  user,
  wallet,
  totals,
  currenciesApi,
});

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global
