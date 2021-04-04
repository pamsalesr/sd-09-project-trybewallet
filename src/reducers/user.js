// Esse reducer será responsável por tratar as informações da pessoa usuária
const user = (state = {}, action) => {
  switch(action.type) {
    case 'addUser':
      return {
        email: action.email
      };
    default:
      return state;
  }
}
export default user;
