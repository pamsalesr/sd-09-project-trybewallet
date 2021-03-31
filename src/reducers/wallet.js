// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const initialState = {
  currencies: [],
  currenciesCode: [],
  expenses: [],
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
    console.log(action.payload.object);
    return {
      ...state,
      expenses: [...state.expenses, action.payload.object],
    };

  default:
    return state;
  }
};

export default walletReducer;
