export default function user(state = { email: '' }, action) {
  switch (action.type) {
  case 'LOGIN':
    return { ...state, email: action.email };
  default:
    return state;
  }
}
