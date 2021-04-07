import * as Type from '../actions/actionsTypes';

const INITIAL_STATE = {
  total: 0,
  currency: 'BRL',
};

function totalsReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
  case Type.ADD_TOTALS:
    return {
      total: Math.round(action.total),
      currency: action.currency,
    };
  default:
    return state;
  }
}

export default totalsReducer;
