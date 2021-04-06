const CURRENCIES_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = async () => {
  const currenciesRequest = await fetch(`${CURRENCIES_API}`);
  const currenciesJson = await currenciesRequest.json();
  delete currenciesJson.USDT;
  return currenciesJson;
};

export default getCurrencies;
