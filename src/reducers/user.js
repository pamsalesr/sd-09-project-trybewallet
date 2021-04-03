// Esse reducer será responsável por tratar as informações da pessoa usuária
import { CHANGE_EMAIL_LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case CHANGE_EMAIL_LOGIN:
    return {
      ...state,
      email: action.emailLogin,
    };
  default:
    return state;
  }
}

export default user;
