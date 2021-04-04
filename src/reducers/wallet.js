import { SAVE, DEL, EDIT, EDITION, SET_CURRENCIES } from '../actions';

const INICIAL_STATE_WALLET = {
  statusEdition: false,
  idEdition: '',
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return ({ ...state, currencies: action.currencies });
  case SAVE:
    return ({ ...state, expenses: [...state.expenses, action.value] });
  case DEL:
    return ({
      ...state,
      expenses: [...state.expenses.filter((item) => item.id !== action.value)],
    });
  case EDITION:
    return ({
      ...state,
      statusEdition: action.status,
      idEdition: action.id,
    });
  case EDIT:
    return ({
      ...state,
      expenses: [...state.expenses.map((item) => {
        if (item.id === action.id) return action.value;
        return item;
      })],
    });
  default:
    return state;
  }
};

export default wallet;
