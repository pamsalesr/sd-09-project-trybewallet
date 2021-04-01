const CURRENCIES_BASE_API = 'https://economia.awesomeapi.com.br/json/all';

const filterCurrencies = (data) => {
  delete data.USDT;
  return data;
};

const getCurrencies = () => (
  fetch(CURRENCIES_BASE_API)
    .then((response) => response.json())
    .then((data) => filterCurrencies(data))
    .catch((error) => error)
);

export default getCurrencies;
