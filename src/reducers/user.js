// Esse reducer será responsável por tratar as informações da pessoa usuária
const value = { senha: '123456', despesa: 0 };
const user = (state = value, action) => {
  switch (action.type) {
  case 'addUser':
    return {
      ...state,
      email: action.email,
    };
  case 'addDespesa':
    return {
      ...state,
      despesa: state.despesa + action.despesa,
    };
  case 'removeDespesa':
    return {
      ...state,
      despesa: action.despesa,
    };
  default:
    return state;
  }
};
export default user;
