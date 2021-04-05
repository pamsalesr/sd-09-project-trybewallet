// Esse reducer será responsável por tratar as informações da pessoa usuária
import { ADD_EMAIL } from '../actions';

const INITIAL_STATE = { email: '' };

const actionUser = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    console.log('teste');
    return {
      ...state, email: action.payload,
    };

  default:
    return state;
  }
};

export default actionUser;
