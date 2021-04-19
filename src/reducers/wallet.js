import { EXPENSE_SAVE, EXPENSES_UPDATE, EDIT_BUTTON } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  expenses: [],
  editButton: false,
  expenseId: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EDIT_BUTTON:
    return {
      ...state,
      editButton: action.editButton,
      expenseId: action.expenseId,
    };
  case EXPENSES_UPDATE:
    return {
      ...state,
      expenses: action.expenses,
    };
  case EXPENSE_SAVE:
    return {
      ...state,
      expenses: [...state.expenses, action.expenses],
    };
  default:
    return state;
  }
};

export default wallet;
