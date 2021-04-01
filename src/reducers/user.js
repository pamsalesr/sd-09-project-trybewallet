// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SAVE_USER_EMAIL } from '../actions';

const INITIAL_USER_STATE = {
  email: '',
};

function user(state = INITIAL_USER_STATE, action) {
  switch (action.type) {
  case SAVE_USER_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;
