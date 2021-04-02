export default function wallet(state = { currencies: [], expenses: [] }, action) {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'SET_EXPENSES':
    return { ...state, expenses: action.expenses };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  default:
    return state;
  }
}
