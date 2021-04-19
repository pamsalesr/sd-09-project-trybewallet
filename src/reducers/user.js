import { CREATE_EMAIL } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
  },
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CREATE_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
};

export default user;
