const CURRENCY_COTATION_API = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencyCotation = async () => {
  const requestAllCurrencies = await fetch(CURRENCY_COTATION_API);
  const response = await requestAllCurrencies.json();
  return response;
};

export default getCurrencyCotation;
