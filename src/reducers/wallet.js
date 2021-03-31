import { ADD, DELETE, REQUEST_COIN, RECEIVE_COIN } from '../actions/ActionsDescribe';

const INITIAL_STATE = {
  launchs: [],
  isFetching: false,
  coinBase: '',
};

export function launchOperation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD:
    return ({
      ...state,
      launchs: [...state.launchs, action.launch],
    });
  default:
    return ({
      state,
    });
  }
}

export function deletOperation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case DELETE:
    return ({
      ...state,
      launchs: state.launchs.filter((operation) => operation !== action.launch),
    });
  default:
    return ({
      state,
    });
  }
}

export function fetchingCoins(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_COIN:
    return ({
      ...state,
      isFetching: true,
    });
  case RECEIVE_COIN:
    return ({
      ...state,
      isFetching: false,
      coinBase: action.coin,
    });
  default:
    return ({
      state,
    });
  }
}
