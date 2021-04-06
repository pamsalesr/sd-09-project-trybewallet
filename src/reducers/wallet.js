// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { REQUEST_CURRENCIES,
  RECEIVE_CURRENCIES_SUCCESS,
  ADD_NEW_EXPENSE } from '../actions';
// const ADD_EXPENSE = 'ADD_EXPENSE';
// const GET_CURRENCIES = 'GET_CURRENCIES';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  id: 0,
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_CURRENCIES:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_CURRENCIES_SUCCESS:
    return ({
      ...state,
      currencies: [action.currencies],
      isFetching: false,
    });
  case ADD_NEW_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, {
        ...action.newExpense,
        id: state.id,
        exchangeRates: action.lastCurrencies,
      }],
      id: state.id + 1,
      isFetching: false,
    });
  default:
    return state;
  }
};

export default walletReducer;
