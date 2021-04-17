import { USER_DATA } from '../reducers/user';
import { WALLET_INFO, MONEY_INFO } from '../reducers/wallet';

const userLogin = (email) => ({
  type: USER_DATA,
  email,
});

export const walletUpdate = ({ currencies, expenses }) => ({
  type: WALLET_INFO,
  currencies,
  expenses,
});

export const sendMoneyInfo = (money) => ({
  type: MONEY_INFO,
  money,
});

export default userLogin;
