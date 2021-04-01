// Coloque aqui suas actions
import getCurrency from '../api';

const addEmail = (value) => ({
  type: 'ADD_EMAIL',
  value,
});

const addToWallet = (expense) => ({
  type: 'ADD_TO_WALLET',
  expense,
});

const getCurrencyAction = (data) => ({
  type: 'GET-CURRENCY',
  data,
});

function fetchCurrencyAction() {
  return async (dispatch) => {
    try {
      const data = await getCurrency();
      delete data.USDT;
      return dispatch(getCurrencyAction(data));
    } catch (error) {
      console.error(error);
    }
  };
}

export { addEmail, addToWallet, fetchCurrencyAction, getCurrencyAction };
