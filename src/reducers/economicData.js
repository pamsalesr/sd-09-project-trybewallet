import {
  REQUEST_ECONOMIC_DATA,
  REQUEST_ECONOMIC_DATA_SUCCESS,
} from '../actions';

const INITIAL_STATE = {
  data: [],
  isFetching: false,
};

const economicData = (state = INITIAL_STATE, action) => {
  // console.log('Action economicData recebida: ', action.type);
  switch (action.type) {
  case REQUEST_ECONOMIC_DATA:
    return {
      ...state,
      isFetching: true,
    };
  case REQUEST_ECONOMIC_DATA_SUCCESS:
    return {
      ...state,
      data: [...state.data, action.data],
      isFetching: false,
    };
  default:
    return state;
  }
};

export default economicData;
