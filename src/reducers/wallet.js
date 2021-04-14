// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalPrice: 0,
  isFetching: false,
};

const walletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case 'REQUEST_CURRENCIES':
    return {
      ...state,
      isFetching: true,
    };
  case 'ADD_TO_WALLET':
    console.log(action);
    return {
      ...state,
      expenses: [...state.expenses, action.wallet],
      totalPrice: state.totalPrice + (action.wallet.value * action.ask),
    };

  case 'DELETE_EXPENSE':
    return {
      ...state,
      expenses: action.expenses,
      totalPrice: state.totalPrice - (action.price * action.ask),
    };
  case 'EDIT_EXPENSE':
    console.log(action);
    return {
      ...state,
      expenses: action.expenses,
      totalPrice: action.price,
    };

  case 'RECEIVE_CURRENCIES_SUCCESS':
    return {
      ...state,
      currencies: action.currencies,
      isFetching: false,
    };
  case 'RECEIVE_CURRENCIES_FAILURE':
    return {
      ...state,
      error: action.error,
      isFetching: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
