import { USER_LOGIN } from '../actions';

// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  text: '',
  number: '',
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case USER_LOGIN:
    return {
      ...state,
      text: action.text,
      number: action.number,
    };
  default:
    return state;
  }
};

export default userReducer;
