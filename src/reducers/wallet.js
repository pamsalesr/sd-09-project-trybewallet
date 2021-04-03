const initialState = { currencies: [], expenses: [], edit: false, editid: 0 };

export default function wallet(state = initialState, action) {
  switch (action.type) {
  case 'SET_CURRENCIES':
    return { ...state, currencies: action.currencies };
  case 'SET_EXPENSES':
    return { ...state, expenses: action.expenses };
  case 'ADD_EXPENSE':
    return { ...state, expenses: [...state.expenses, action.expense] };
  case 'SET_EDIT':
    return { ...state, edit: action.condition, editid: action.id };
  default:
    return state;
  }
}
