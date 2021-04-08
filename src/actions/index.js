import requestApi from '../services/requestApi';

export const INPUT_LOGIN = 'INPUT_LOGIN';
export const INPUT_WALLET = 'INPUT_WALLET';
export const REQUEST_CURRENCY = 'REQUEST_CURRENCY';
export const REQUEST_VALUE = 'REQUEST_VALUE';

export const user = (email) => ({
  type: INPUT_LOGIN,
  email,
});

export const wallet = () => ({
  type: INPUT_WALLET,
  currencies: [],
  expenses: [],
});

export const requestCurrecy = (response) => ({
  type: REQUEST_CURRENCY,
  response,
});

export const requestValue = (data) => ({
  type: REQUEST_VALUE,
  data,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await requestApi();
  dispatch(requestCurrecy(Object.keys(currencies)));
};

export const getCurrenciesValues = () => async (dispatch) => {
  const currenciesValue = await requestApi();
  dispatch(requestValue((requestValue(currenciesValue))));
};
