import { ADD_EXPENSES, RECEIVE_CURRENCIES, REM_EXPENSES } from '../actions';

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
  case REM_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses.filter((line) => line.id !== action.id)],
    };
  default:
    return state;
  }
};

export default walletReducer;
