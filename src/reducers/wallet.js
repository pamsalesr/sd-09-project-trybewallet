import { LOAD_CURRENCIES, SUBMIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SUBMIT_EXPENSE:
    return { ...state,
      expenses: [...state.expenses, {
        id: action.id,
        value: action.value,
        description: action.description,
        currency: action.currency,
        method: action.method,
        tag: action.tag,
        exchangeRates: action.exchangeRates,
      }] };
  case LOAD_CURRENCIES:
    return { ...state, currencies: [...action.currencies] };
  default:
    return state;
  }
};

export default wallet;
