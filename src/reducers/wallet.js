// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INICIAL_STATE = {
  currencies: [],
  expenses: [],
  total: 0,
};

const wallet = (state = INICIAL_STATE, action) => {
  switch (action.type) {
  case '':
    return { };
  default:
    return state;
  }
};

export default wallet;
