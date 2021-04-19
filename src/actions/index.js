// Coloque aqui suas actions
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ENABLE_EDIT_MODE = 'ENABLE_EDIT_MODE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';

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

export function actionDeleteExpense(id) {
  return {
    type: DELETE_EXPENSE,
    payload: id,
  };
}

export function actionEnableEditExpense(id) {
  return {
    type: ENABLE_EDIT_MODE,
    payload: id,
  };
}

export function actionEditExpense(id) {
  return {
    type: EDIT_EXPENSE,
    payload: id,
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
