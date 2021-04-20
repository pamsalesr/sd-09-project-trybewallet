import {
  ADD_EXPENSE,
  DELETE_EXPENSE,
  ERROR_CURRENCY,
  GET_CURRENCY,
  GET_HELPER,
  REQUEST_CURRENCY,
  UPDATE_EXPENSE,
} from '../actions/types';

const INITIAL_STATE = {
  isFetching: false,
  currencies: [],
  expenses: [],
};

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
        ...inputExpense.expense,
        exchangeRates: { ...response },
      },
    ],
  };
}

function editExpense({ expenses }, editedExpense) {
  const newExpenses = expenses.map((expense) => {
    if (editedExpense.id === expense.id) {
      const { value, currency, description, method, tag } = editedExpense;
      return {
        ...expense,
        value,
        currency,
        description,
        method,
        tag,
      };
    }
    return expense;
  });
  return {
    expenses: newExpenses,
  };
}

function deleteExpense({ expenses }, { id }) {
  if (expenses.length > 0) {
    const removedExpense = expenses.filter((expense) => expense.id !== id);
    return {
      expenses: removedExpense,
    };
  }
  return {
    expenses: [],
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
  case UPDATE_EXPENSE:
    return {
      ...state,
      ...editExpense(state, payload),
    };
  case REQUEST_CURRENCY:
    return {
      ...state,
      isFetching: true,
    };
  case GET_HELPER:
    return {
      ...state,
      editMethod: payload,
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
