const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const ADD_TO_WALLET = 'ADD_TO_WALLET';

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_TO_WALLET:
    return { ...state, expenses: action.expense };
  default:
    return state;
  }
}

export default wallet;
