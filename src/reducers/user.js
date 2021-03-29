const INITIAL_EMAIL = {
  email: '',
};

function user(email = INITIAL_EMAIL, action) {
  switch (action.type) {
  case 'VALID_EMAIL':
    return { email: action.email };
  default:
    return email;
  }
}

export default user;
