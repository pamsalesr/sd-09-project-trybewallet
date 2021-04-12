import {
  GET_CURRENCIES,
  TOTAL_PRICE,
  ADD_EXPENSES,
  HANDLE_NEW_TOTAL,
  DELETE_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencyList: {},
  totalPrice: 0,
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expensesObj],
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencyList: action.currencyList,
    };
  case TOTAL_PRICE:
    return {
      ...state,
      totalPrice: state.totalPrice + action.value,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expense,
    };
  case HANDLE_NEW_TOTAL:
    return {
      ...state,
      totalPrice: action.newTotal,
    };
  default:
    return state;
  }
}

export default wallet;
