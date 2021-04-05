// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SET_CURRENCIES,
  FETCHING_CURRENCIES,
  SET_NEW_EXPENSE,
  GET_TOTAL_VALUE,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  isFetching: false,
};

const walletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currenciesObject,
      isFetching: false,
    };
  case FETCHING_CURRENCIES:
    return {
      ...state,
      isFetching: true,
    };
  case SET_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      isFetching: false,
    };
  case GET_TOTAL_VALUE:
    return {
      ...state,
      totalValue: state.totalValue + action.expenseValue,
    };
  default:
    return state;
  }
};

export default walletReducer;
