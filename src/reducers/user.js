// Esse reducer será responsável por tratar as informações da pessoa usuária
import * as actions from '../actions/index';

const INITIAL_STATE = {
  email: null,
  passwordMD5: null,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actions.SAVE_LOGIN_INFO:
    return ({
      ...state,
      email: action.inputEmail,
      passwordMD5: action.inputPassword,
    });
  default:
    return state;
  }
};

export default user;
