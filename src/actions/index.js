export const LOGIN = 'LOGIN';
export const SAVE = 'SAVE';
export const DEL = 'DEL';
export const EDIT = 'EDIT';

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

export const constructObj = (dataObj) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((resJson) => {
      delete resJson.USDT;
      dispatch(saveExpense({ ...dataObj, exchangeRates: resJson }));
    });
};

export const constructEditObj = (id, dataObj) => (dispatch) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((resJson) => {
      delete resJson.USDT;
      dispatch(editExpense(id, { ...dataObj, exchangeRates: resJson }));
    });
};
