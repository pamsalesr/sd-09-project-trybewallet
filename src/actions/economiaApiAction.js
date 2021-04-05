export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const RECEIVE_CURRENCIES = 'RECEIVE_CURRENCIES';
export const ADD_TO_WALLET = 'ADD_TO_WALLET';
export const SEND_INFOS = 'SEND_INFOS';

// const requestCurrencies = () => ({ type: REQUEST_CURRENCIES, payload: true });

export const receiveExchangeInfos = (exchangeInfos) => (
  { type: SEND_INFOS, payload: exchangeInfos });

const receiveCurrencies = (currencies) => (
  { type: RECEIVE_CURRENCIES, payload: currencies });
export const addInfos = (infos, currentExpense) => (
  { type: ADD_TO_WALLET, payload: infos, expense: currentExpense });

export function fetchCurrencies() {
  return async (dispatch) => {
    const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const economiaInfos = await responseApi.json();
    const economiaInfosCleaned = Object.keys(economiaInfos).filter((currency) => (
      currency !== 'USDT'));
    dispatch(receiveCurrencies(economiaInfosCleaned));
  };
}

export function fetchExchangeInfos() {
  return async (dispatch) => {
    const responseApi = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeInfos = await responseApi.json();
    dispatch(receiveExchangeInfos(exchangeInfos));
  };
}
