import { SET_CURRENCIES, SET_EXPENSE, SET_TOTAL_PRICE, DELETE_EXPENSE } from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalPrice: 0,
};

const wallet = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case SET_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };
  case SET_TOTAL_PRICE:
    return {
      ...state,
      totalPrice: action.totalPrice,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: action.expenses,
    };
  default:
    return state;
  }
};

export default wallet;
