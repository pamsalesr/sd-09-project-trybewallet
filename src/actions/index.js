import apiCoin from '../service/apiCoin';

export const login = (email) => ({ type: 'LOGIN', email });
export const addExpenses = (data) => ({ type: 'ADD_EXPENSES', data });
export const delExpenses = (data) => ({ type: 'DELETE_EXPENSE', data });

const receiveCurrencyOk = (data) => ({
  type: 'RECEIVE_CURRENCY_OK',
  data,
});

const receiveCurrencyFail = (error) => ({
  type: 'RECEIVE_CURRENCY_FAIL',
  error,
});

export function currenciesObj() {
  return (dispatch) => apiCoin()
    .then((data) => dispatch(receiveCurrencyOk(data)))
    .catch((error) => dispatch(receiveCurrencyFail(error)));
}
