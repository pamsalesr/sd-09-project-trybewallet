const INNITAL_STATE = {
  email: '',
};

const userReducer = (state = INNITAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN':
    state = {
      email: action.email,
    };
    return state;
  default:
    return state;
  }
};

export default userReducer;
