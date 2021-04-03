const INITIAL_STATE = { currencies: [], expenses: [] };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCY_OK':
    return { ...state, currencies: action.data };
  case 'RECEIVE_CURRENCY_FAIL':
    return { error: action.error };
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.data] };
  case 'DELETE_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.data.id] };
  default:
    return state;
  }
};

export default walletReducer;
