import { LOGIN } from '../actions';

const INITIAL_STATE_USER = {
  email: '',
};

const user = (state = INITIAL_STATE_USER, action) => {
  if (action.type === LOGIN) return { email: action.value };
  return state;
};

export default user;
