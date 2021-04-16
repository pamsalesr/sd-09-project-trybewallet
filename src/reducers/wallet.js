// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expensesSum: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
  const indexOfTheExpenseId = state.expenses
    .indexOf(state.expenses
      .find((expense) => expense.id === action.expenseId));

  switch (action.type) {
  case 'ADD_EXPENSE':

    return {
      ...state,
      expenses: [
        ...state.expenses,
        { ...action.expense, exchangeRates: action.data },
      ],
    };

  case 'RECEIVE_CURRENCIES':
    return {
      ...state,
      currencies: action.data,
    };

  case 'DELETE_ROW':
    return {
      ...state,
      expenses: [
        ...state.expenses.slice(0, indexOfTheExpenseId),
        ...state.expenses.slice(indexOfTheExpenseId + 1, state.expenses.length),
      ],
    };

  case 'SUM_EXPENSES':
    return {
      ...state,
      expensesSum: action.expensesSum,
    };

  default:
    return state;
  }
};

export default wallet;
