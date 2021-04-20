export const CHANGE_EMAIL_LOGIN = 'CHANGE_EMAIL_LOGIN';
export const FETCH_CURRENCIES = 'FETCH_CURRENCIES';
export const ADD_EXPENSE = 'ADD_EXPENSE';
export const DEL_EXPENSE = 'DEL_EXPENSE';
export const EDIT_EXPENSE = 'EDIT_EXPENSE';
export const MOVE_TO_STATE = 'MOVE_TO_STATE';
export const SET_OFF_IS_EDITABLE = 'SET_OFF_IS_EDITABLE';
export const SET_ON_EDIT_BUTTON = 'SET_ON_EDIT_BUTTON';

export const handleEmail = (emailLogin) => ({
  type: CHANGE_EMAIL_LOGIN,
  emailLogin,
});

export const handleCurrencies = (currencies) => ({
  type: FETCH_CURRENCIES,
  currencies,
});

export const handleAddExpense = (expense) => ({
  type: ADD_EXPENSE,
  expense,
});

export const handleDelExpense = (id) => ({
  type: DEL_EXPENSE,
  id,
});

export const handleEditExpense = (dataState) => ({
  type: EDIT_EXPENSE,
  dataState,
});

export const handleMoveToState = (editableExpense) => ({
  type: MOVE_TO_STATE,
  globalState: editableExpense,
});

export const setOffIsEditable = () => ({
  type: SET_OFF_IS_EDITABLE,
});

export const setOnEditButton = () => ({
  type: SET_ON_EDIT_BUTTON,
});
