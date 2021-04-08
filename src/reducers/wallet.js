import { UPDATE_EXCHANGE_RATES, ADD_EXPENSE, DEL_EXPENSE } from '../actions';

const INITIAL_STATE = {
  expenses: [],
  currencies: [],
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
  case DEL_EXPENSE:
    return ({
      ...state,
      expenses: action.expense,
    });
  default:
    return state;
  }
};

export default wallet;
