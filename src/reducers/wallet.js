// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const ADD_EXPENSE = 'ADD_EXPENSE';

const WALLET_INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = WALLET_INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    // falta implementar lógica, obviamente
    return state;
  default:
    return state;
  }
};

export default walletReducer;
