async function fetchCurrency() {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const exchangeRates = await response.json();
  delete exchangeRates.USDT;
  return exchangeRates;
}

export default fetchCurrency;
