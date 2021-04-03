// Esse reducer será responsável por tratar as informações da pessoa usuária
import { HANDLE_EMAIL } from '../actions';

const INITIAL_USER_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_USER_STATE, action) => {
  switch (action.type) {
  case HANDLE_EMAIL:
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};

export default userReducer;
