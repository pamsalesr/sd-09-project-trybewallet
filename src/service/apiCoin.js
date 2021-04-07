export default async function fetchCurrencies() {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  const response = await fetch(endPoint);
  const currencyObj = await response.json();
  delete currencyObj.USDT;
  return currencyObj;
}
