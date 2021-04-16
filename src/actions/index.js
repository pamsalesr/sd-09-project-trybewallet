// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';

export function actionUser(email) {
  return {
    type: ADD_EMAIL,
    payload: email,
  };
}

export function actionExpense(expense) {
  return {
    type: ADD_EXPENSE,
    payload: expense,
  };
}

export function actionCurrencies(currencies) {
  return {
    type: ADD_CURRENCIES,
    payload: currencies,
  };
}

const fetchCurrencyQuotes = async () => {
  const fetchCurrency = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await fetchCurrency.json();
  delete response.USDT;
  return response;
};

export const addExpenseWithCurrentQuotes = (expense) => async (dispatch) => {
  const quotes = await fetchCurrencyQuotes();
  // expense.exchangeRates = quotes;
  dispatch(actionExpense({ ...expense, exchangeRates: quotes }));
};

export const setDropdownCurrencies = () => async (dispatch) => {
  const quotes = await fetchCurrencyQuotes();
  const quotesKeys = Object.keys(quotes);
  // expense.exchangeRates = quotes;
  dispatch(actionCurrencies(quotesKeys));
};
