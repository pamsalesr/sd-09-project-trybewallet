async function fetchExchange(currency = 'all') {
  const endpoint = `https://economia.awesomeapi.com.br/json/${currency}`;
  try {
    const response = await fetch(endpoint);
    const currencies = await response.json();
    if ('USDT' in currencies) {
      delete currencies.USDT;
    }
    return currencies;
  } catch (error) {
    console.log(error);
  }
}

export default fetchExchange;
