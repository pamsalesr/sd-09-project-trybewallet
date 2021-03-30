const INITIAL_EMAIL = {
  email: '',
};

function user(defaultEmail = INITIAL_EMAIL, action) {
  switch (action.type) {
  case 'VALID_EMAIL':
    return action;
  default:
    return defaultEmail;
  }
}

export default user;
