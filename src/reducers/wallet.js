// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  SET_CURRENCIES,
  SET_NEW_EXPENSE,
  GET_TOTAL_VALUE,
  UPDATE_EXPENSES,
  UPDATE_TOTAL_VALUE,
  SET_EDITABLE_EXPENSE,
  SET_EDITABLE_OFF,
} from '../actions';

const INITIAL_WALLET_STATE = {
  currencies: [],
  expenses: [],
  totalValue: 0,
  isEditable: false,
  isButtonEditable: false,
  editableExpense: {},
};

const walletReducer = (state = INITIAL_WALLET_STATE, action) => {
  switch (action.type) {
  case SET_CURRENCIES:
    return {
      ...state,
      currencies: action.currenciesObject,
      isFetching: false,
    };
  case SET_NEW_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.expense],
      isFetching: false,
      isButtonEditable: false,
    };
  case GET_TOTAL_VALUE:
    return {
      ...state,
      totalValue: state.totalValue + action.expenseValue,
    };
  case UPDATE_EXPENSES:
    return {
      ...state,
      expenses: action.updatedExpenses,
      isButtonEditable: false,
    };
  case UPDATE_TOTAL_VALUE:
    return {
      ...state,
      totalValue: action.expenses,
    };
  case SET_EDITABLE_EXPENSE:
    return {
      ...state,
      isEditable: true,
      isButtonEditable: true,
      editableExpense: action.object,
    };
  case SET_EDITABLE_OFF:
    return {
      ...state,
      isEditable: false,
    };
  default:
    return state;
  }
};

export default walletReducer;
