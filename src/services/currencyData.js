export const ENDPOINT = "https://economia.awesomeapi.com.br/json/all";

export function requestCurrency() {
  const currencyArray = fetch(ENDPOINT)
    .then((response) => response.json())
    .then((currencies) => Object.keys(currencies)
    .filter(currency => currency !== 'USDT'));

    return currencyArray;
}
