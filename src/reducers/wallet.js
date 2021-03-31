const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'addDespesa':
    return ({
      ...state,
      expenses: [...state.expenses, action.value],
    });
  default:
    return state;
  }
}

export default wallet;

