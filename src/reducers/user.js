import { SET_EMAIL } from '../actions';
// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  case SET_EMAIL:
    return { ...state, email: action.email };
  default:
    return state;
  }
}

export default user;

// const defaultState = {
//   login: false,
// };

// const reducer = (state = defaultState, action) => {
//   // Change code below this line
//   if (action.type === 'LOGIN') {
//     return (state = { login: true });
//   }
//   return defaultState;
//   // Change code above this line
// };

// const store = Redux.createStore(reducer);

// const loginAction = () => {
//   return {
//     type: 'LOGIN',
//   };
// };

// const defaultState = {
//     login: false
//   };

//   const reducer = (state = defaultState, action) => {
//     // Change code below this line
//   switch (action.type){
//     case ('LOGIN'): {
//     return (state = { login: true })
//   }
//   }
//   return defaultState;
//     // Change code above this line
//   };
//   const store = Redux.createStore(reducer);
//   const loginAction = () => {
//     return {
//       type: 'LOGIN'
//     }
//   };
