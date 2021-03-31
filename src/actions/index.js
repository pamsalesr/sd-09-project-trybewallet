import { LOGIN, ADD, REQUEST_COIN, RECEIVE_COIN } from './ActionsDescribe';

export const login = (email) => ({
  type: LOGIN,
  email,
});

export const launchOperation = (launch) => ({
  type: ADD,
  launch,
});

export const requestCoin = () => ({
  type: REQUEST_COIN,
});

export const receiveCoin = (data) => ({
  type: RECEIVE_COIN,
  coin: data,
});

export function fetchApi() {
  const url = 'https://economia.awesomeapi.com.br/json/all';
  return (dispatch) => {
    dispatch(requestCoin);
    return fetch(url)
      .then((response) => response.json())
      .then((result) => console.log(result));
  };
}
