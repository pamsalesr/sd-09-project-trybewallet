const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'GET_CURRENCY':
    return { ...state, currencies: action.payload };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.payload] };
  case 'DELETE_EXPENSE':
    console.log(state, 'estado');
    console.log(action, 'ação');
    const newArray = []
    state.expenses.filter((expenseId, id) => (expenseId !== id));
    return { ...state };
  default:
    return state;
  }
};

export default walletReducer;

// dúvida: o que eu passo para currencies?
