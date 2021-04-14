import getCurrencies from '../api/currencyAPI';

export const login = (user) => ({ type: 'LOGIN', user });
export const addToWallet = (wallet, ask) => ({ type: 'ADD_TO_WALLET', wallet, ask });
export const deleteExpense = (expenses, price, ask) => (
  {
    type: 'DELETE_EXPENSE',
    expenses,
    price,
    ask,
  });
export const editExpenses = (expenses, price) => (
  {
    type: 'EDIT_EXPENSE',
    expenses,
    price,
  });

const requestCurrencies = () => ({
  type: 'REQUEST_CURRENCIES',
});

const receiveCurrenciesFailure = (error) => ({
  type: 'RECEIVE_CURRENCIES_FAILURE',
  error,
});

const receiveCurrenciesSuccess = (data) => ({
  type: 'RECEIVE_CURRENCIES_SUCCESS',
  currencies: data,
});

export function fetchCurrencies() {
  return (dispatch) => {
    dispatch(requestCurrencies());
    return getCurrencies()
      .then(
        (data) => dispatch(receiveCurrenciesSuccess(data)),
        (error) => dispatch(receiveCurrenciesFailure(error.message)),
      );
  };
}
