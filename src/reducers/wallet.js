// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  wallet: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_TO_WALLET':
    return {
      ...state, wallet: state.wallet.concat(action.payload.expense),
    };
  default:
    return state;
  }
};

export default walletReducer;
