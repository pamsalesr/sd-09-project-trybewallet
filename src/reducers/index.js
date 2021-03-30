import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import currentPriceReducer from './currentPriceReducer';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

const rootReducer = combineReducers({
  user,
  wallet,
  currentPriceReducer,
});

export default rootReducer;
