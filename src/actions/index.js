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

const receiveCurrenciesAction = (data) => ({
  type: 'RECEIVE_CURRENCIES',
  data,
});

export function getUpdatedCurrenciesThunk(currentExpense) {
  return (dispatch) => fetchCurrencies()
    .then((data) => {
      dispatch(receiveCurrenciesAction(data));
      dispatch(addExpenseAction(currentExpense, data));
    });
}
