import { LOGIN } from '../actions';

const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, { email, type }) => {
  switch (type) {
  case LOGIN:
    return { email };
  default:
    return state;
  }
};

export default user;
