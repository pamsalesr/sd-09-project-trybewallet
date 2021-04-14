import { LOGIN } from '../actions/index';

const INITIAL_STATE = [{
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
}];

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
  case LOGIN:
    return { ...state, email: action.email };
  default:
    return state;
  }
}
