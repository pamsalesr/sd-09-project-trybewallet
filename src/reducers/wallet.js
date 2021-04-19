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
  const id = expenses.length;
  const newTotal = total
      + (
        Math.round(
          inputExpense.value * response[inputExpense.currency].ask * 100,
        ) / 100
      ).toFixed(2);
  return {
    total: newTotal,
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
