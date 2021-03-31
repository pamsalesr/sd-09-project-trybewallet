// Coloque aqui suas actions
import fetchCurrency from '../services/currencyApi';

export const USER_LOGIN = 'USER_LOGIN';
export const IS_LOADING = 'IS_LOADING';
export const CURRENCY_VALUES = 'CURRENCY_VALUES';
export const CREATE_EXPENSE = 'CREATE_EXPENSE';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  email,
});

export const isLoading = () => ({
  type: IS_LOADING,
});

export const currencyValues = (currencies) => ({
  type: CURRENCY_VALUES,
  currencies,
});

export const currencyFetching = () => async (dispatch) => {
  dispatch(isLoading());
  const currencies = await fetchCurrency();
  dispatch(currencyValues(Object.keys(currencies)));
};

export const createExpense = (expense) => ({
  type: CREATE_EXPENSE,
  expense,
});
