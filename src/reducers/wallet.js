import { GET_CURRENCIES, TOTAL_PRICE, ADD_EXPENSES } from '../actions';

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
      totalPrice: state.totalPrice + action.totalPrice,
    };
  default:
    return state;
  }
}

export default wallet;
