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
  return async (dispatch) => {
    try {
      dispatch(requestCoin());
      const response = await fetch(url);
      const data = await response.json();
      dispatch(receiveCoin(data));
    } catch (error) {
      console.log(error);
    }
  };
}
