import {
  ADD_EXPENSE,
  ERROR_CURRENCY,
  GET_CURRENCY,
  REQUEST_CURRENCY,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
  total: 0,
};

function newExpense({ expenses, total }, { expense: inputExpense, response }) {
  const FIXED_FLOAT = 3;
  const id = expenses.length;
  const newTotal = total
    + parseFloat(inputExpense.value) * response[inputExpense.currency].ask;
  return {
    total: parseFloat(newTotal.toFixed(FIXED_FLOAT)),
    expenses: [
      ...expenses,
      {
        id,
        ...inputExpense,
        exchangeRates: { ...response },
      },
    ],
  };
}

const walletReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case ADD_EXPENSE:
    return {
      ...state,
      ...newExpense(state, payload),
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case GET_CURRENCY:
    return {
      ...state,
      isFetching: false,
      currencies: [...Object.values(payload)],
    };
  case ERROR_CURRENCY:
    return {
      ...state,
      error: payload.error,
    };
  default:
    return state;
  }
};

export default walletReducer;
