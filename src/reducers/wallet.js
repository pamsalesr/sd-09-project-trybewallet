import {
  ADD_EXPENSE,
  FETCH_CURRENCIES,
  REMOVE_EXPENSE,
  EDIT_EXPENSE,
  FINISH_EDIT,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  edit: false,
  upDate: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return { ...state, expenses: state.expenses.concat(action.payload) };
  case REMOVE_EXPENSE:
    return { expenses: state.expenses.filter((item) => item.id !== action.payload) };
  case FETCH_CURRENCIES:
    return { ...state,
      currencies: Object.keys(action.payload)
        .filter((item) => item !== 'USDT') };
  case EDIT_EXPENSE:
    return { ...state, edit: true, upDate: action.payload };
  case FINISH_EDIT:
    return { ...state, edit: false };
  default:
    return state;
  }
};

export default wallet;
