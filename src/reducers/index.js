import { combineReducers } from 'redux';
import { LOGIN } from '../actions';

const initialState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const userReducer = (state = initialState.user, action) => {
  switch (action.type) {
  case LOGIN:
    return {
      ...state,
      email: action.email,
    };
  default: return state;
  }
};

const walletReducer = (state = initialState.wallet, action) => {
  switch (action.type) {
  default: return state;
  }
};

const rootReducer = combineReducers({ user: userReducer, walletReducer });

export default rootReducer;
