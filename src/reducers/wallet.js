import { SAVE, DEL, EDIT } from '../actions';

const INICIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case SAVE:
    return ({ ...state, expenses: [...state.expenses, action.value] });
  case DEL:
    return ({
      ...state,
      expenses: state.expenses.filter((item) => item.id !== action.value),
    });
  case EDIT:
    return ({
      ...state,
      expenses: state.expenses.map((item) => {
        if (item.id === action.id) return { ...action.value };
        return { ...item };
      }),
    });
  default:
    return state;
  }
};

export default wallet;
