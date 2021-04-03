// Coloque aqui suas actions

const addEmail = (value) => ({
  type: 'ADD_EMAIL',
  value,
});

const addToWallet = (expense) => ({
  type: 'ADD_TO_WALLET',
  expense,
});

const getCurrency = (currency) => ({
  type: 'GET_CURRENCY',
  currency,
});

const fetchCurrencyThunk = () => (
  async (dispatch) => {
    try {
      const fetchResponse = await fetch('https://economia.awesomeapi.com.br/json/all');
      const currencies = await fetchResponse.json();
      delete currencies.USDT;

      return dispatch(getCurrency(currencies));
    } catch (error) {
      return console.log(error);
    }
  }
);

export { addEmail, addToWallet, fetchCurrencyThunk, getCurrency };
