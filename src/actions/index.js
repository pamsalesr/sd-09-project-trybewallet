import currenciesFetch from '../services/api';

export const USER_REGISTER = 'USER_REGISTER';
export const CURRENCIES_VALUES = 'CURRENCIES_VALUES';
export const EXPENSES = 'EXPENSES';

export const userRegister = (email) => ({
  type: USER_REGISTER,
  email,
});

export const currenciesValues = (currencies) => ({
  type: CURRENCIES_VALUES,
  currencies,
});

export const getCurrencies = () => async (dispatch) => {
  const currencies = await currenciesFetch();
  dispatch(currenciesValues(Object.keys(currencies)));
};

export const expenses = (expense) => ({
  type: EXPENSES,
  expense,
});
