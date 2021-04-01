import { SAVE, DEL } from '../actions';

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
  default:
    return state;
  }
};

export default wallet;
