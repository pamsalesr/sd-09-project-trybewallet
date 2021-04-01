// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
};

const expenses = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'ADD_EXPENSES':
    return { ...state, expenses: [...state.expenses, action.expenses] };
  case 'REMOVE_EXPENSES':
    return { ...state };
  default:
    return state;
  }
};

export default expenses;
