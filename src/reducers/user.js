// Esse reducer será responsável por tratar as informações da pessoa usuária
import { USER_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  email: '',
};

const userEmailReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_EMAIL:
    return {
      email: action.email,
    };
  default:
    return state;
  }
};

export default userEmailReducer;
