import fetchCurrencies from '../services';

// Coloque aqui suas actions
export const registerEmailAction = (email) => ({
  type: 'REGISTER_EMAIL',
  email,
});

export const addExpenseAction = (expense, data) => ({
  type: 'ADD_EXPENSE',
  expense,
  data,
});

export const deleteRowAction = (expenseId) => ({
  type: 'DELETE_ROW',
  expenseId,
});

const receiveCurrenciesAction = (data) => ({
  type: 'RECEIVE_CURRENCIES',
  data,
});

export const sumExpensesAction = (expensesSum) => ({
  type: 'SUM_EXPENSES',
  expensesSum,
});

export function getUpdatedCurrenciesThunk(currentExpense) {
  return (dispatch) => fetchCurrencies()
    .then((data) => {
      dispatch(receiveCurrenciesAction(data));
      dispatch(addExpenseAction(currentExpense, data));
    });
}
