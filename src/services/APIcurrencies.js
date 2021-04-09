const API_CURRENCIES = 'https://economia.awesomeapi.com.br';

const apiCurrencies = async () => {
  try {
    const fetchResponse = await fetch(`${API_CURRENCIES}/json/all`);
    const currencies = await fetchResponse.json();
    delete currencies.USDT;
    return currencies;
  } catch (error) {
    console.log(error);
  }
};

export default apiCurrencies;
