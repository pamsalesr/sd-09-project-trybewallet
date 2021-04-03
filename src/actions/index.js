import requestCurrency from '../services/awesomeApi';

export const LOGIN_INFORMATION = 'LOGIN_INFORMATION';
export const GET_CURRENCIES = 'GET_CURRENCIES';
// export const ADD_EXPENSES = 'ADD_EXPENSES';

export function saveLoginInformation(email, validation) {
  return {
    type: 'LOGIN_INFORMATION',
    email,
    validation,
  };
}

// const addExpenses = (expense) => ({
//   type: ADD_EXPENSES,
//   expense,
// });

const saveCurrencies = (currencyList) => ({
  type: GET_CURRENCIES,
  currencyList,
});

export function getCurrency() {
  return async (dispatch) => {
    const currencyList = await requestCurrency();
    return dispatch(saveCurrencies(currencyList));
  };
}
