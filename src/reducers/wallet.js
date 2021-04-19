import { DELETE_EXPENSE, SUBMIT_EXPENSE } from '../actions';

const INITIAL_STATE = {
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
  case DELETE_EXPENSE:
    return { ...state, expenses: [...action.expenses] };
  default:
    return state;
  }
};

export default wallet;
