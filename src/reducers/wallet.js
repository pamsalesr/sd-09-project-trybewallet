export const REQUEST_MONEY = 'REQUEST_MONEY';
export const WALLET_INFO = 'WALLET_INFO';
export const MONEY_INFO = 'MONEY_INFO';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

const initialState = {
  currencies: [],
  expenses: [],
  isFetching: false,
};

function wallet(state = initialState, action) {
  const { type, isFetching, money, expenses } = action;
  switch (type) {
  case WALLET_INFO:
    return {
      ...state,
      expenses: [...state.expenses, expenses],
    };
  case MONEY_INFO:
    return { ...state, currencies: money, isFetching };
  case REQUEST_MONEY:
    return { ...state, isFetching };
  case DELETE_EXPENSE: {
    const filteredExpenses = state.expenses.filter((e) => e.id !== expenses.id);
    return { ...state, expenses: filteredExpenses };
  }
  default:
    return state;
  }
}

export default wallet;
