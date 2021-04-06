import { ADD_EXPENSE, FETCH_CURRENCIES } from '../actions';

const INITIAL_STATE = {
  currenciesList: {},
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.newExpense],
    };
  case FETCH_CURRENCIES:
    return {
      ...state,
      currenciesList: action.currenciesList,
    };
  default:
    return state;
  }
};

export default wallet;
