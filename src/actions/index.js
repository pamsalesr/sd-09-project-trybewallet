import apiCoin from '../service/apiCoin';

export const login = (email) => ({ type: 'LOGIN', email });
export const addExpense = (data) => ({ type: 'ADD_EXPENSE', data });
export const delExpense = (data) => ({ type: 'DELETE_EXPENSE', data });
export const editExpense = (status, id) => ({ type: 'EDIT_EXPENSE', status, id });
export const setEditExpense = (data) => ({ type: 'SET_EDIT', data });

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
