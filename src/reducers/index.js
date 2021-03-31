import { combineReducers } from 'redux';
import user from './user';
import { launchOperation, deletOperation, fetchingCoins } from './wallet';

const rootReducer = combineReducers({
  user,
  launchOperation,
  deletOperation,
  fetchingCoins,
});

export default rootReducer;
