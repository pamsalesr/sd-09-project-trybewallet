// Esse reducer será responsável por tratar as informações da pessoa usuária
import { EMAIL_INPUT } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  // console.log('Action user recebida: ', action.type);
  switch (action.type) {
  case EMAIL_INPUT:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default user;
