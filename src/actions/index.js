import { USER_DATA } from '../reducers/user';
import { WALLET_INFO, MONEY_INFO, REQUEST_MONEY } from '../reducers/wallet';

const userLogin = (email) => ({
  type: USER_DATA,
  email,
});

export const walletUpdate = ({ currencies, expenses }) => ({
  type: WALLET_INFO,
  currencies,
  expenses,
});

const requestMoney = () => ({
  type: REQUEST_MONEY,
  isFetching: false,
});

const sendMoneyInfo = (money) => ({
  type: MONEY_INFO,
  money,
});

export function getMoneyInfo() {
  return (dispatch) => {
    dispatch(requestMoney());
    return fetch('https://economia.awesomeapi.com.br/json/all')
      .then((response) => response.json())
      .then((result) => {
        const keys = Object.keys(result);
        const allKeys = keys.filter((coin) => coin !== 'USDT');
        const allMoney = allKeys.map((key) => result[key]);
        dispatch(sendMoneyInfo(allMoney));
      });
  };
}

export default userLogin;
