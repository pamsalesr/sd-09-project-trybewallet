const INITIAL_STATE = {
  /* value: '',
  description: '',
  currency: '',
  method: '',
  tag: '', */
  expenses: [],
  total: 0.00,
};

const addExpense = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, ...action.payload] };
    /* value: action.wallet,
      description: action.wallet,
      currency: action.currency,
      method: action.method,
      tag: action.tag, */
    // };
  case 'SUM_EXPENSES':
    return { ...state, total: parseFloat((state.total + action.payload).toFixed(2)) };
  default:
    return state;
  }
};

export default addExpense;
