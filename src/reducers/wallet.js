// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { ADD_EXPENSE, ERROR_EXPENSE, SUM_PRICE_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const reducerDispesas = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case ADD_EXPENSE:
    return {
      currencies: action.moedas,
      expenses: [...state.expenses, {
        ...action.dispesaAtual,
        exchangeRates: action.moedas,
      }],
    };
  case ERROR_EXPENSE:
    return {
      ...state,
      error: action.error,
    };
  default:
    return state;
  }
};

const INITIAL_SUM_STATE = {
  total: 0,
};

const reducerSumTotal = (state = INITIAL_SUM_STATE, action) => {
  switch (action.type) {
  case SUM_PRICE_VALUE:
    return {
      ...state,
      total: action.value + action.moeda,
    };
  default:
    return state;
  }
};

export { reducerDispesas, reducerSumTotal };
