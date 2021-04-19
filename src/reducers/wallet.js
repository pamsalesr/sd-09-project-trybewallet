import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
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

function deleteExpense({ expenses }, { id }) {
  if (expenses.length > 0) {
    const removedExpense = expenses.reduce((removedObj, expense, index) => {
      if (expense.id === id) {
        removedObj.index = index;
      }
      return removedObj;
    }, {});
    return {
      expenses: [
        ...expenses.slice(0, removedExpense.index),
        ...expenses.slice(removedExpense.index + 1),
      ],
    };
  }
  return {
    expenses: [],
  };
}

function newExpense({ expenses }, { expense: inputExpense, response }) {
  let id = 0;
  if (expenses.length > 0) {
    id = expenses[expenses.length - 1].id + 1;
  }
  return {
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
  case DELETE_EXPENSE:
    return {
      ...state,
      ...deleteExpense(state, payload),
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
