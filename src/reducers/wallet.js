// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import * as actions from '../actions/index';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  fetching: false,
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case actions.ADD_SPENDING:
    return {
      ...state,
      fetching: true,
    };
  case actions.ADD_SPENDING_SUCCESS:
    return {
      ...state,
      fetching: false,
      expenses: [
        ...state.expenses,
        {
          ...action.input,
          exchangeRates: action.fetchData,
        },
      ],
    };
  default:
    return state;
  }
};

export default wallet;
