const initialState = { currencies: [], expenses: [] };

function wallet(state = initialState, actions) {
  switch (actions.type) {
  case 'CURRENCY':
  case 'EXPENSE':
  default:
    return state;
  }
}

export default wallet;
