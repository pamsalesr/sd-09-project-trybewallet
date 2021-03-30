// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_SATATE = {
  email: '',
};

const user = (state = INITIAL_SATATE, action) => {
  switch (action.type) {
  case 'SUBMIT_LOGIN':
    return ({
      ...state,
      email: action.email,
    });
  default:
    return state;
  }
};

export default user;
