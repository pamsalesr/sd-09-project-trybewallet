export const IS_LOGGED_IN = 'IS_LOGGED_IN';
export const ADD_USER = 'ADD_USER';
export const ADD_CURRENCY = 'ADD_CURRENCY';

export const isLoggedIn = () => ({
  type: IS_LOGGED_IN,
  loggedIn: true,
});

export const addUser = (email) => ({
  type: ADD_USER,
  user: email,
});

export const addCurrency = (currency) => ({
  type: ADD_CURRENCY,
  currency,
});

export function fetchCurrency() {
  return async (dispatch) => {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await response.json();
    delete currency.USDT;
    return dispatch(addCurrency(currency));
  };
}
