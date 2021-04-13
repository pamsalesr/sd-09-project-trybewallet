import { EMAIL_INSERT, PASSWORD_INSERT } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
  password: '',
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL_INSERT:
    return {
      ...state,
      email: action.email,
    };
  case PASSWORD_INSERT:
    return {
      ...state,
      password: action.password,
    };
  default:
    return state;
  }
};

export default user;
