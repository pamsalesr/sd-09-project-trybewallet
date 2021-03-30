// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, { email, type }) => {
  switch (type) {
  case 'LOGIN':
    return { email };
  default:
    return state;
  }
};

export default userReducer;
