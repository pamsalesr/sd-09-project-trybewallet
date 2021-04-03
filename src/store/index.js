// import { createStore , applyMiddleware } from 'redux';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import thunk from 'redux-thunk';
// import rootReducers from '../reducers';

// const INITIAL_STATE = {
//   user: {
//     email: '',
//   },
//   wallet: {
//     currencies: [],
//     expenses: [],
//   },
// };

// const store = createStore(
//   rootReducers,
//   INITIAL_STATE,
//   composeWithDevTools(/* applyMiddleware(thunk) */),
// );

// export default store;

import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const store = createStore(rootReducer, composeWithDevTools());

export default store;
