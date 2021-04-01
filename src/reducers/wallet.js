import { SAVE } from '../actions';

const INICIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INICIAL_STATE_WALLET, action) => {
  if (action.type === SAVE) {
    return { ...state, expenses: [...state.expenses, action.value] };
  }
  return state;
};

export default wallet;
