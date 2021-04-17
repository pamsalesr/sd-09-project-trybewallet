import { combineReducers } from 'redux';
import user from './user';
import wallet, { moneyInfo } from './wallet';

const reducers = combineReducers({ user, wallet, moneyInfo });

export default reducers;
