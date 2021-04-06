import { SET_CURRENCIES, ADD_EXPENSES } from '.';
import fetchApi from '../api';

const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

const addExpenses = (expenses) => ({
  type: ADD_EXPENSES,
  expenses,
});

const fetchCurrencies = () => async (dispatch) => {
  const currencies = await fetchApi();

  return dispatch(setCurrencies(currencies));
};

export { fetchCurrencies, addExpenses };
