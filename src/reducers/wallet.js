import { ADD, DELETE } from '../actions/ActionsDescribe';

const INITIAL_STATE = {
  launchs: [],
};

export function launchOperation(state = INITIAL_STATE, action) {
  switch (action.type) {
  case ADD:
    return ({
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
      launchs: state.launchs.filter((operation) => operation !== action.launch),
    });
  default:
    return ({
      state,
    });
  }
}
