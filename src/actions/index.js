import { USER_DATA } from '../reducers/user';
import { WALLET_INFO, MONEY_INFO, REQUEST_MONEY } from '../reducers/wallet';
import moneyData from '../services/api';

const userLogin = (email) => ({
  type: USER_DATA,
  email,
});

export const walletUpdate = (expenses) => ({
  type: WALLET_INFO,
  expenses,
});

const requestMoney = () => ({
  type: REQUEST_MONEY,
  isFetching: true,
});

const sendMoneyInfo = (money) => ({
  type: MONEY_INFO,
  money,
  isFetching: false,
});

export function getMoneyInfo() {
  return (dispatch) => {
    dispatch(requestMoney());
    moneyData().then((response) => dispatch(sendMoneyInfo(response)));
  };
}

export default userLogin;
