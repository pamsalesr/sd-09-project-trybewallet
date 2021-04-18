import { ADD_EXPENSE } from '../actions/types';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      ...payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
