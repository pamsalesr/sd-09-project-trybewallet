import { combineReducers } from 'redux';
import user from './user';
import { launchOperation, deletOperation } from './wallet';

const rootReducer = combineReducers({
  user,
  launchOperation,
  deletOperation,
});

export default rootReducer;
