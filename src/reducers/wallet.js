import { REQ_CURRENCIES, GET_CURRENCIES, ADD_EXPENSE, DELETED_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isLoading: true,
  addingExpense: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQ_CURRENCIES:
    return {
      ...state,
      isLoading: true,
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      isLoading: false,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      addingExpense: false,
      expenses: [...state.expenses, action.expense],
    };
  case DELETED_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
