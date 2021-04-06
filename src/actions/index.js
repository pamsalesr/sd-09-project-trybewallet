// Coloque aqui suas actions
import getCurrencyCotation from '../services/awesomeApi';

export const logUserIn = ({ email }) => ({
  type: 'LOGIN',
  email,
});

export const addExpense = (expense, exchangeRates) => ({
  type: 'ADD_EXPENSE',
  expense,
  exchangeRates,
});

export const fetchCurrencyCotation = async (dispatch) => {
  const currencyCotation = await getCurrencyCotation();
  dispatch(addExpense(currencyCotation));
};

export const requestCurrencies = (currency) => ({
  type: 'REQUEST_CURRENCIES',
  currency,
});

export const addTotalExpenses = (total) => ({
  type: 'TOTAL_EXPENSES',
  total,
});

export const fetchCurrencies = () => async (dispatch) => {
  const resolvedCurrencies = await getCurrencyCotation();
  const currencies = Object.keys(resolvedCurrencies);
  const filteredCurrencies = currencies.filter((currency) => currency !== 'USDT');
  dispatch(requestCurrencies(filteredCurrencies));
};
