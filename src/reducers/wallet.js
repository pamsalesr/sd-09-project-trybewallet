// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  FETCHING_CURRENCIES,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_ERROR,
} from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
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
    };

  case FETCH_CURRENCIES_ERROR:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

export default wallet;
