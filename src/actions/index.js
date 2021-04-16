import currencyApi from '../services/currencyApi';

export const USER_LOGIN = 'USER_LOGIN';
export const RECEIVE_CURRENCY = 'RECEIVE_CURRENCY';
export const RECEIVE_CURRENCY_ERROR = 'RECEIVE_CURRENCY_ERROR';
export const RECEIVE_EXPENSES = 'RECEIVE_EXPENSES';
export const TOTAL_EXPENSES = 'TOTAL_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';

export const saveEmail = (email) => ({
  type: USER_LOGIN,
  email,
});

export const receiveCurrency = (currencies) => ({
  type: RECEIVE_CURRENCY,
  currencies,
});

export const receiveCurrencyError = (error) => ({
  type: RECEIVE_CURRENCY_ERROR,
  error,
});

export const fetchCurrencyApi = () => (dispatch) => {
  currencyApi()
    .then(
      (currency) => {
        delete currency.USDT;
        dispatch(receiveCurrency(Object.keys(currency)));
      },
      (error) => dispatch(receiveCurrencyError(error)),
    );
};

export const receiveExpenses = (expenses) => ({
  type: RECEIVE_EXPENSES,
  expenses,
});

export const totalExpenses = (total) => ({
  type: TOTAL_EXPENSES,
  total,
});

export const deleteExpense = (expense) => ({
  type: DELETE_EXPENSE,
  expense,
});
