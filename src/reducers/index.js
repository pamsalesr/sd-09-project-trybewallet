import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import formStateReducer from './formStateReducer';

const rootReducer = combineReducers({
  user,
  wallet,
  formStateReducer,
});

export default rootReducer;
