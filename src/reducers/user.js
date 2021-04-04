// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL_STATE } from '../actions';

const INITIAL_USER_STATE = {
  email: '',
};

function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
  case ADD_EMAIL_STATE:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
}

export default user;
