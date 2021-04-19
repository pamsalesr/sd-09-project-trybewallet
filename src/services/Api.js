export async function fecthApi() {
  return (fetch('https://economia.awesomeapi.com.br/json/all'))
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error);
}

export async function getCurrencies() {
  const currencies = await fecthApi();
  delete currencies.USDT;
  return Object.keys(currencies);
}

export async function getExchangeRates() {
  const exchangeRates = await fecthApi();
  delete exchangeRates.USDT;
  return exchangeRates;
}
