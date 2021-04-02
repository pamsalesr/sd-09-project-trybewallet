// Esse reducer será responsável por tratar as informações da pessoa usuária
import { REQUEST_LOGIN } from '../actions/actionTypes';

const INITIAL_USER_STATE = {
  user: {
    email: 'yoda@starwars.com',
    password: '123456',
    authorizedLogin: false,
  },
};

const user = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
    case REQUEST_LOGIN:
      return {
        ...state,
        authorizedLogin: action.requestLogin,
      }
    default:
      return state;
  }
};

export default user;
