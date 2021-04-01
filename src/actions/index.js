import apiCoin from '../service/apiCoin';

export const login = (email) => ({ type: 'LOGIN', email });

const receiveCurrencyOk = (data) => ({
  type: 'SET_CURRENCY_LIST',
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
