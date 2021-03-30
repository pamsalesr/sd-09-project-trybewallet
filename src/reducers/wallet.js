// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: [],
  totalExpense: 0,
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO_WALLET':
    return {
      // ...state, wallet: state.wallet.concat(action.payload.expense),
      wallet: [...state.wallet, action.payload.expense],
      totalExpense: state.totalExpense + action.payload.expense,
    };
  default:
    return state;
  }
};

export default walletReducer;
