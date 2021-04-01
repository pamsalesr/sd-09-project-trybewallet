export const ADD_EXPENSE = 'ADD_EXPANSE';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const LOGIN = 'LOGIN';

export const login = (email) => ({ type: LOGIN, email });

export const requestCurrency = () => ({
  type: 'REQUEST',
  idFetching: true,
});

export const newExpanseAndCurrency = (expense, exchangeRates) => {
  const coin = Object.values(exchangeRates).find((moeda) => (
    moeda.code === expense.currency
  ));
  const {
    value,
    description,
    tag,
    currency,
    payment,
  } = expense;
  return {
    type: ADD_EXPENSE,
    value,
    description,
    tag,
    currency,
    payment,
    exchangeRates,
    totalExpense: parseFloat(value) * parseFloat(coin.ask),
    coin,
  };
};

export const deleteExpense = (index, expense) => ({
  type: DELETE_EXPENSE,
  index,
  expense,
});

export const editExpense = (editID) => ({
  type: EDIT_EXPENSE,
  editActivated: true,
  editID,
});

export const expenseThunk = (expense) => (dispatch) => {
  dispatch(requestCurrency());
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((resp) => resp.json())
    .then((obj) => dispatch(newExpanseAndCurrency(expense, obj)));
};
