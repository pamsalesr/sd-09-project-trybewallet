// import { SET_EMAIL } from '../actions/actionTypes';

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case 'SET_EMAIL':
    return { email: action.user };
  default:
    return state;
  }
}

export default user;
