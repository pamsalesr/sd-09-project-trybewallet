const INITIAL_STATE = {};
const user = 'user';

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case user:
    return 0;
  default:
    return state;
  }
};

export default userReducer;
