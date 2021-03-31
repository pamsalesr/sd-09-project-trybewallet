import { combineReducers } from 'redux';
import user from './user';
import wallet from './wallet';
import formControl from './formControl';

const rootReducer = combineReducers({ user, wallet, formControl });

export default rootReducer;
