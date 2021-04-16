import { ADD_EXPENSES, EDIT_EXPENSES,
  RECEIVE_CURRENCIES, REM_EXPENSES } from '../actions';

const INITIAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.data],
    };
  case EDIT_EXPENSES:
    console.log(action.data);
    return {
      ...state,
      expenses: [...state.expenses.map((expense) => (expense.id
          === action.data.id ? action.data : expense))],
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
