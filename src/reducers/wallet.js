// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import {
  REQUEST_CURRENT_PRICE,
  RECEIVE_CURRENT_PRICE_SUCCESS,
  RECEIVE_CURRENT_PRICE_FAIL,
  SAVE_USER_EXPENSE,
  ADD_SAVE_USER_EXPENSE,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  isFetching: false,
  error: '',
  expensesCount: 0,
  expenseDetails: {
    id: 0,
    value: '',
    description: '',
    currency: '',
    method: '',
    tag: '',
  },
};

function wallet(state = INITIAL_STATE, action) {
  const { expenseDetails, ask, coins } = action;
  switch (action.type) {
  case REQUEST_CURRENT_PRICE:
    return { ...state, isFetching: true };
  case RECEIVE_CURRENT_PRICE_SUCCESS:
    return {
      ...state,
      isFetching: false,
      currencies: action.data,
    };
  case RECEIVE_CURRENT_PRICE_FAIL:
    return {
      isFetching: false,
      error: action.error,
    };
  case SAVE_USER_EXPENSE:
    return {
      ...state,
      expenseDetails: {
        ...state.expenseDetails,
        ...expenseDetails,
      },
    };
  case ADD_SAVE_USER_EXPENSE:
    console.log(ask);
    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...state.expenseDetails, exchangeRates: coins },
      ],
      expenseDetails: {
        id: state.expenseDetails.id + 1,
        value: '',
        description: '',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
      },
    };
  default:
    return state;
  }
}

export default wallet;
