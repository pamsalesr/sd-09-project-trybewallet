// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import ADD_EXPENSE from '../actions/actionTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSE:
    return { email: action.wallet };
  default:
    return state;
  }
}

export default wallet;
