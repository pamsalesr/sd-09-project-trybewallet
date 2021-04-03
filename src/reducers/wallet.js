// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

const INITIAL_STATE = {
  currencies: [],
  expenses: [// {
  //  id: 0,
  //  value: 0,
  //  description: '',
  //  currency: '',
  //  method: '',
  //  tag: '',
  //  exchangeRates: {},
  ],
};

const wallet = (state = INITIAL_STATE, action) => {
  // console.log(state.expenses.concat(action.state));
  switch (action.type) {
  case 'SUBMIT_FORM':
    return ({
      ...state,
      expenses: state.expenses.concat(action.state),
    });

  case 'SUBMIT_FORM_API':
    return ({
      ...state,
    });

  case 'REMOVE_ID':
    return ({
      ...state,
      expenses: action.newExpenses,
    });

  default:
    return state;
  }
};

export default wallet;
