import {
  CURRENCIES,
  ADD_EXPENSE,
  UPDATE_TOTAL_EXPENSE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
} from '../actions';

const initialState = {
  currencies: [],
  expenses: [],
  expensesTotal: 0,
};

function wallet(state = initialState, actions) {
  switch (actions.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: actions.currencies,
    };
  case ADD_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, actions.expense],
    };
  case UPDATE_TOTAL_EXPENSE:
    return {
      ...state,
      expensesTotal: actions.value,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [
        ...state.expenses
          .filter((expense) => String(expense.id) !== String(actions.id)),
      ],
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: [
        actions.expense,
        ...state.expenses
          .filter((expense) => String(expense.id) !== String(actions.id)),
      ],
    };
  default:
    return state;
  }
}

export default wallet;
