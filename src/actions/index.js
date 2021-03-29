export const USER_REGISTER = 'USER_REGISTER';

export const userRegister = (email) => ({
  type: USER_REGISTER,
  email,
});
