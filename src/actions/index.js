import fetchCurrency from '../services/currencyApi';

export const SET_EMAIL = 'GET_EMAIL';
export const setEmail = (email) => (
  { type: SET_EMAIL, email }
);

export const SET_CURRENCIES = 'GET_CURRENCIES';
export const setCurrencies = (currencies) => (
  { type: SET_CURRENCIES, currencies }
);

export const ADD_EXPENSES = 'ADD_EXPENSES';
export const addExpenses = (expenses) => (
  { type: ADD_EXPENSES, expenses }
);

export const SET_EXPENSES = 'SET_EXPENSES';
export const setExpenses = (expenses) => (
  { type: SET_EXPENSES, expenses }
);

export const thunk = () => (
  async (dispatch) => {
    const result = await fetchCurrency();
    return dispatch(result);
  }
);

// export const Wallet = 'Wallet';

// export const wallet = (currency) => ({ type: Wallet, currency });
