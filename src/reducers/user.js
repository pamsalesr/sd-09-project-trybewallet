// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  loggedIn: false,
};

const user = (state = INITIAL_STATE, { type, email }) => {
  switch (type) {
  case 'LOGIN':
    return {
      ...state,
      loggedIn: true,
      email,
    };
  default:
    return state;
  }
};

export default user;
