import { ADD_CURRENCY } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_CURRENCY:
    return {
      ...state.wallet,
      currencies: action.currencies,
    };
  default:
    return state;
  }
};

export default wallet;
