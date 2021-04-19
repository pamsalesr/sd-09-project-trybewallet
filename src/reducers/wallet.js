import {
  GET_CURRENCIES,
  TOTAL_PRICE,
  ADD_EXPENSES,
  HANDLE_DELETE,
  HANDLE_NEW_TOTAL,
  EDIT_EXPENSE_ON,
  EDIT_EXPENSE_OFF,
  UPDATE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  totalPrice: 0,
  expenses: [],
  isEditable: false,
  editButtonOn: false,
  editableExpense: {},
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD_EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.expensesObj],
    };
  case GET_CURRENCIES:
    return {
      ...state,
      currencies: action.currencies,
    };
  case TOTAL_PRICE:
    return {
      ...state,
      totalPrice: state.totalPrice + action.value,
    };
  case HANDLE_DELETE:
    return {
      ...state,
      expenses: action.expense,
    };
  case HANDLE_NEW_TOTAL:
    return {
      ...state,
      totalPrice: action.newTotal,
    };
  case EDIT_EXPENSE_ON:
    return {
      ...state,
      isEditable: true,
      editButtonOn: true,
      editableExpense: action.editObject,
    };
  case EDIT_EXPENSE_OFF:
    return {
      ...state,
      isEditable: false,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.updatedExpenses,
      isEditable: false,
      editButtonOn: false,
    };
  default:
    return state;
  }
}

export default wallet;
