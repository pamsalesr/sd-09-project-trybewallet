import { SET_CURRENCIES, ADD_EXPENSES, SET_EXPENSES, EDIT_EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return { ...state, currencies: action.currencies };
  case ADD_EXPENSES:
    return { ...state, expenses: [...state.expenses, action.expense] };
  case SET_EXPENSES:
    return { ...state, expenses: action.expenses };
  case EDIT_EXPENSES:
    return { ...state, eventEdit: action.eventEdit, expense: action.expense };
  default:
    return state;
  }
};

export default wallet;
