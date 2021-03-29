import {
  FETCH_START,
  FETCH_SUCCESS,
  FETCH_FAIL,
  ADD_EXPENSE,
} from '../actions/actionsTypes';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case FETCH_START:
    return ({
      ...state,
      loading: true,
    });
  case FETCH_SUCCESS:
    // console.log(action.data);
    return ({
      ...state,
      loading: false,
      currencies: [...Object.keys(action.data)],
    });
  case FETCH_FAIL:
    return ({
      ...state,
      loading: false,
      error: action.error,
    });
  case ADD_EXPENSE:
    return ({
      ...state,
      expenses: [...state.expenses, action.expense],
    });
  default:
    return state;
  }
};

export default wallet;
