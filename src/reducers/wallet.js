const INITIAL_STATE = { currencies: [], expenses: [], edit: { status: false, id: '' } };

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'RECEIVE_CURRENCY_OK':
    return { ...state, currencies: action.data };
  case 'RECEIVE_CURRENCY_FAIL':
    return { error: action.error };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.data] };
  case 'DELETE_EXPENSE':
    return { ...state,
      expenses: [...state.expenses.filter((expenses) => action.data !== expenses.id)] };
  case 'EDIT_EXPENSE':
    return { ...state, edit: { status: action.status, id: action.id } };
  default:
    return state;
  }
};

export default walletReducer;
