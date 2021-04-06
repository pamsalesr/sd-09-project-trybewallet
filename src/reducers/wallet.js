import { UPDATE_EXCHANGE_RATES, ADD_EXPENSE, CONVERT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  exchangeRates: {},
  expenses: [],
  currencies: [],
  convertedExp: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case UPDATE_EXCHANGE_RATES:
    return ({
      ...state,
      exchangeRates: action.exchangeRates,
    });
  case ADD_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expense],
    });
  case CONVERT_EXPENSE:
    return ({
      ...state,
      convertedExp: [...state.convertedExp, action.convertedExp],
    });
  default:
    return state;
  }
};

export default wallet;
