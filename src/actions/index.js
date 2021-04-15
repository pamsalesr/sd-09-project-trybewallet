import fetchCurrencies from '../services/fetchCurrencies';

const LOGIN = 'LOGIN';
const EXPENSE = 'EXPENSE';
const DELETE = 'DELETE';
const EDIT = 'EDIT';
const CURRENCIES = 'CURRENCIES';

export const loginAction = (email) => ({
  type: LOGIN,
  email,
});

export const expenseAction = (expense) => ({
  type: EXPENSE,
  expense,
});

export const deleteExpenseAction = (newExpenses) => ({
  type: DELETE,
  newExpenses,
});

export const editExpenseAction = (expense) => ({
  type: EDIT,
  expense,
});

export const currenciesAction = (currencies) => ({
  type: CURRENCIES,
  currencies,
});

const ratesAction = (rates) => ({
  type: 'RATES',
  rates,
});

export async function expenseThunk(
  { id,
    value,
    description,
    currency,
    method,
    tag,
    exchangeRates },
) {
  return async (dispatch) => {
    dispatch(expenseAction(
      { id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates },
    ));
  };
}

export async function currenciesThunk() {
  return async (dispatch) => {
    const getCurrency = await fetchCurrencies();
    const currenciesArray = Object.keys(getCurrency);
    const newCurrencies = currenciesArray.filter((elem) => elem !== 'USDT');

    dispatch(currenciesAction(newCurrencies));
  };
}

export const fetchCurrency = () => (
  async (dispatch) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const responseObject = await response.json();
      const currenciesArray = Object.keys(responseObject);
      const newCurrencies = currenciesArray.filter((elem) => elem !== 'USDT');
      dispatch(currenciesAction(newCurrencies));
      dispatch(ratesAction(responseObject));
    } catch (error) {
      console.log(error);
    }
  }
);
