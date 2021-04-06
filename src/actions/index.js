export const CHANGE_EMAIL_LOGIN = 'CHANGE_EMAIL_LOGIN';
export const UPDATE_EXCHANGE_RATES = 'UPDATE_EXCHANGE_RATES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
// export const CONVERT_EXPENSE = 'CONVERT_EXPENSE';

export const handleEmail = (emailLogin) => ({
  type: CHANGE_EMAIL_LOGIN,
  emailLogin,
});

export const handleExchangeRates = (exchangeRates) => ({
  type: UPDATE_EXCHANGE_RATES,
  exchangeRates,
});

export const handleAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

// export const handleConvertExpense = (convertedExp) => ({
//   type: CONVERT_EXPENSE,
//   convertedExp,
// });
