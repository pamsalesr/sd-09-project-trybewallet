import { ADD_EXPENSES, RECEIVE_CURRENCIES } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.data,
    };
  default:
    return state;
  }
};

export default walletReducer;
