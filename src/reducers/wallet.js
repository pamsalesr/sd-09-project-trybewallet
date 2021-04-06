import { ADD_EXPENSE,
  DELETE_EXPENSE,
  REQUEST_API,
  UPDATE_TOTAL } from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
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
    });
  case DELETE_EXPENSE:
    return ({ ...state,
      expenses: [...action.newExpenses],
    });
  case UPDATE_TOTAL:
    return ({ ...state,
      total: action.value,
    });
  default:
    return state;
  }
};

export default wallet;
