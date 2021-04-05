// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  // REQUEST_CURRENT_PRICE,
  RECEIVE_CURRENT_PRICE_SUCCESS,
  RECEIVE_CURRENT_PRICE_FAIL,
  SAVE_USER_EXPENSE,
  ADD_SAVE_USER_EXPENSE,
  DELETE_USER_EXPENSE,
  EDIT_USER_EXPENSE,
} from '../actions';

const INICITAL_EXPENSE_DETAILS = {
  value: '',
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  // isFetching: false,
  error: '',
  editing: false,
  idEdit: '',
  expenseDetails: {
    id: 0,
    ...INICITAL_EXPENSE_DETAILS,
  },
};

function wallet(state = INITIAL_STATE, action) {
  const { expenseDetails, coins, id, editing } = action;
  switch (action.type) {
  // case REQUEST_CURRENT_PRICE:
  //   return { ...state, isFetching: true };
  case RECEIVE_CURRENT_PRICE_SUCCESS:
    return { ...state, currencies: Object.keys(action.data), data: action.data };
  case RECEIVE_CURRENT_PRICE_FAIL:
    return { error: action.error };
  case SAVE_USER_EXPENSE:
    return { ...state, expenseDetails: { ...state.expenseDetails, ...expenseDetails } };
  case EDIT_USER_EXPENSE:
    return { ...state, editing, idEdit: id };
  case ADD_SAVE_USER_EXPENSE:
    console.log(action);
    if (editing) {
      return {
        ...state,
        expenses: [...state.expenses.filter((exp) => exp.id !== id),
          { ...state.expenseDetails,
            id,
            exchangeRates: coins }],
        expenseDetails: {
          id: state.expenseDetails.id,
          ...INICITAL_EXPENSE_DETAILS,
        },
        editing: false,
      };
    }
    return { ...state,
      expenses: [...state.expenses, { ...state.expenseDetails, exchangeRates: coins }],
      expenseDetails: {
        id: state.expenseDetails.id + 1,
        ...INICITAL_EXPENSE_DETAILS,
      },
    };
  case DELETE_USER_EXPENSE:
    return { ...state,
      expenses: [...state.expenses.filter((exp) => exp.id !== id)] };
  default: return state;
  }
}

export default wallet;
