// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  ADD_EXPENSE,
  ADD_CURRENCIES,
  DELETE_EXPENSE,
  ENABLE_EDIT_MODE,
  EDIT_EXPENSE,
} from '../actions';

function getExpensesEdited(state, action) {
  const oldElement = state.expenses.find((expense) => expense.id === action.payload.id);
  const expenseIndex = state.expenses.indexOf(oldElement, action.payload);
  const newExpenses = [...state.expenses];
  newExpenses[expenseIndex] = { ...newExpenses[expenseIndex], ...action.payload };
  return newExpenses;
}

const INITIAL_STATE = {

  currencies: [],
  expenses: [],
  editingExpense: {
    isEditableMode: false,
    id: 0,
  },

};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      ...state, expenses: [...state.expenses, action.payload],
    };
  case ADD_CURRENCIES:
    return {
      ...state, currencies: action.payload,
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses.filter((expense) => expense.id !== action.payload)],
    };
  case ENABLE_EDIT_MODE:
    return {
      ...state,
      editingExpense: {
        isEditableMode: true,
        id: action.payload,
      },
    };
  case EDIT_EXPENSE:
    return {
      ...state,
      expenses: getExpensesEdited(state, action),
      editingExpense: {
        isEditableMode: false,
      },
    };
  default:
    return state;
  }
};

export default wallet;
