// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { GET_CURRENCY_AND_DISPENSE } from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case GET_CURRENCY_AND_DISPENSE:
    return { ...state, expenses: [...state.expenses, action.dispenseData] };
  default:
    return state;
  }
};

export default wallet;
