// Esse reducer será responsável por tratar as informações da pessoa usuária
const value = { senha: '123456' };
const user = (state = value, action) => {
  switch (action.type) {
  case 'addUser':
    return {
      ...state,
      email: action.email,
    };
  default:
    return state;
  }
};
export default user;
