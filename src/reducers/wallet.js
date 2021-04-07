import {
  ADD_TOTAL_PRICE,
  REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES,
  FAILED_REQUEST,
  ADD_EXPENSES_STATE,
} from '../actions';

// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE_WALLET = {
  totalPrice: 0,
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
};

function wallet(state = INITIAL_STATE_WALLET, action) {
  switch (action.type) {
  case ADD_TOTAL_PRICE: {
    const totalPriceState = state.totalPrice;
    const totalPriceAction = action.totalPrice;
    const totalPrice = totalPriceState + totalPriceAction;

    return {
      ...state,
      totalPrice: Math.round((totalPrice) * 100) / 100,
    };
  }
  case REQUEST_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case RECEIVE_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case FAILED_REQUEST:
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  case ADD_EXPENSES_STATE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
}

export default wallet;
