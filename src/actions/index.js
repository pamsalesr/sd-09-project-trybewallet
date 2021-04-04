export const LOGIN = 'LOGIN';
export const SAVE = 'SAVE';
export const DEL = 'DEL';
export const EDIT = 'EDIT';
export const EDITION = 'EDITION';
export const SET_CURRENCIES = 'SET_CURRENCIES';

export const saveEmail = (email) => ({
  type: LOGIN,
  value: email,
});

export const saveExpense = (expenseObj) => ({
  type: SAVE,
  value: expenseObj,
});

export const delExpense = (id) => ({
  type: DEL,
  value: id,
});

export const editExpense = (id, expenseObj) => ({
  type: EDIT,
  id,
  value: expenseObj,
});

export const edition = (id = '', status) => ({
  type: EDITION,
  id,
  status,
});

export const setCurrencies = (currencies) => ({
  type: SET_CURRENCIES,
  currencies,
});

export const constructObj = (dataObj) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((resJson) => {
      dispatch(saveExpense({ ...dataObj, exchangeRates: { ...resJson } }));
    });
};
