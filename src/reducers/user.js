const userReducer = (user = '', action) => {
  switch (action.type) {
  case 'EMAIL_REGISTERED':
    return {
      user: action.email,
    };
  default:
    return user;
  }
};

export default userReducer;
