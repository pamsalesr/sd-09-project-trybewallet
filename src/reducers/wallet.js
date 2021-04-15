import {
  CURRENCIES,
  SAVE_EXPENSES,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
  SAVE_EDIT_EXPENSE,
  REQUEST_CURRENCIES_SUCCESS,
} from '../actions/actionsType';

const INITIAL_STATE_WALLET = {
  currencies: [],
  expenses: [],
  editExpense: false,
};

const walletReducer = (state = INITIAL_STATE_WALLET, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state, currencies: Object.keys(action.currencies),
    };

  case SAVE_EXPENSES:
    return {
      ...state, expenses: [...state.expenses, action.expenses],
    };

  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => expense.id !== action.id),
    };

  case EDIT_EXPENSE:
    return {
      ...state,
      expenseToEdit: action.expense,
      editExpense: true,
    };

  case SAVE_EDIT_EXPENSE:
    return ({
      ...state,
      expenses: state.expenses.map((expense) => {
        if (expense.id === action.expense.id) {
          return ({ ...expense, ...action.expense });
        }
        return expense;
      }),
      editExpense: false,
    });

  case REQUEST_CURRENCIES_SUCCESS:
    return {
      ...state,
      currencies: action.currencies,
      isFetching: action.isFetching,
    };

  default:
    return state;
  }
};

export default walletReducer;
