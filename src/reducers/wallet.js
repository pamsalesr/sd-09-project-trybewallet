const INITIAL_STATE = {
  currencies: ['BRL'],
  expenses: [0],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return state;
  default:
    return state;
  }
};

export default walletReducer;
