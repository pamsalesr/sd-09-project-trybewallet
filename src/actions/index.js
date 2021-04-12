import { USER_DATA } from '../reducers/user';
// import { WALLET_INFO } from '../reducers/wallet';

const userLogin = (email) => ({
  type: USER_DATA,
  email,
});

export default userLogin;
