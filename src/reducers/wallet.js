import { ADD_EXPENSE, REQUEST_API } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case REQUEST_API:
    return ({ ...state,
      currencies: action.currencies,
    });
  case ADD_EXPENSE:
    return ({ ...state,
      expenses: [...state.expenses, action.expense],
      // total: parseFloat(state.total) + parseFloat(action.expense.value),
    });
  default:
    return state;
  }
};

export default wallet;
