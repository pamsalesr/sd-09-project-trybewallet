import { DESPESA_TOTAL } from '../actions';
// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  despesaTotal: 0,
};

export default function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DESPESA_TOTAL:
    return {
      ...state,
      despesaTotal: action.despesaTotal,
    };
  default:
    return state;
  }
}
