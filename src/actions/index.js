// Coloque aqui suas actions

export const SAVE_LOGIN_INFO = 'SAVE_LOGIN_INFO';

export const saveLoginInfo = (data) => ({
  type: SAVE_LOGIN_INFO,
  inputEmail: data.email,
  inputPassword: data.password,
});

export const ADD_SPENDING_SUCCESS = 'ADD_SPENDING_SUCESS';

export const addSpendingSucess = (input, fetchData) => ({
  type: ADD_SPENDING_SUCCESS,
  ...input,
  fetchData,
});

export const ADD_SPENDING = 'ADD_SPENDING';

export const addSpending = (dispatch, input) => {
  fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .then((data) => dispatch(addSpendingSucess(input, data)));
  return {
    type: ADD_SPENDING,
  };
};

export const REMOVE_SPENDING = 'REMOVE_SPENDING';

export const removeSpending = (id) => ({
  type: REMOVE_SPENDING,
  id,
});

export const TRIGGER_EDITING = 'TRIGGER_EDITING';

export const triggerEditing = (id) => ({
  type: TRIGGER_EDITING,
  id,
});
