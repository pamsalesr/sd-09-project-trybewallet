// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  currenciesCode: [],
  expenses: [],
  totalPrice: 0,
};

const walletReducer = (state = initialState, action) => {
  switch (action.type) {
  case 'FETCH_STARTED':
    return {
      ...state,
    };

  case 'FETCH_SUCCESS':
    return {
      ...state,
      currencies: action.data,
    };

  case 'SAVE_DESPENSES':
    return {
      ...state,
      expenses: [...state.expenses, action.payload.object],
    };

  case 'SET_TOTAL':
    return {
      ...state,
      totalPrice: state.totalPrice + action.payload.total,
    };

  default:
    return state;
  }
};

export default walletReducer;
