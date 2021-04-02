const initialState = { currencies: [], expenses: [] };

const wallet = (state = initialState, action) => {
  switch (action.type) {
  case 'UPDATE_CURR':
    return { ...state, currencies: action.currencies };
  case 'UPDATE_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  default:
    return state;
  }
};

export default wallet;
