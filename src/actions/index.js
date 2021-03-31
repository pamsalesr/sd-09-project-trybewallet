import fetchCurrencies from '../services';

// Coloque aqui suas actions
export const registerEmailAction = (email) => ({
  type: 'REGISTER_EMAIL',
  email,
});

export const addExpenseAction = (expense) => ({
  type: 'ADD_EXPENSE',
  expense,
});

export const registerCurrenciesAction = (currencies) => ({
  type: 'REGISTER_CURRENCIES',
  currencies,
});

// const fetchCurrenciesAction = () => ({
//   type: 'REQUEST_CURRENCIES',
// });

const receiveCurrenciesAction = (data) => ({
  type: 'RECEIVE_CURRENCIES',
  data,
});

export function getUpdatedCurrenciesThunk() {
  return (dispatch) => (
    // dispatch(fetchCurrenciesAction());
    fetchCurrencies()
      .then((data) => dispatch(receiveCurrenciesAction(data)))
  );
}
