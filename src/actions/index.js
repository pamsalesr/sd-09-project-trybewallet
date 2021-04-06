// Coloque aqui suas actions
export const LOGIN = 'LOGIN';
export const FETCHING_CURRENCIES = 'FETCHING_CURRENCIES';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_ERROR = 'FETCH_CURRENCIES_ERROR';

export const userAction = (userLogin) => ({
  type: LOGIN,
  userLogin,
});

export const fetchingCurrencies = () => ({
  type: FETCHING_CURRENCIES,
});

export const fetchCurrenciesSuccess = (currencies) => ({
  type: FETCH_CURRENCIES_SUCCESS,
  currencies,
});

export const fetchCurrenciesError = (error) => ({
  type: FETCH_CURRENCIES_ERROR,
  error,
});

export const fetchCurrencyRate = () => ({
  type: FETCH_CURRENCY_RATE,
  currencies,
});

const url = 'https://economia.awesomeapi.com.br/json/all';

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(fetchingCurrencies());
  fetch(url).then((response) => response.json())
    .then((response) => dispatch(fetchCurrenciesSuccess(response)))
    .catch((error) => dispatch(fetchCurrenciesError(error)));
};
