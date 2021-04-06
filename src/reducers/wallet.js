// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCHING_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_ERROR,
  ADD_EXPENSE_TO_STORE,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
  fullCurrencies: [],
  error: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCHING_CURRENCIES:
    return {
      ...state,
    };

  case FETCH_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: [...Object.keys(action.currencies)
        .filter((currency) => currency !== 'USDT')],
      fullCurrencies: action.currencies,
    };

  case FETCH_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };

  case ADD_EXPENSE_TO_STORE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
    };

  default:
    return state;
  }
};

export default wallet;
