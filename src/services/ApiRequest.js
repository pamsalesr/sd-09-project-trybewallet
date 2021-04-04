async function fetchApi() {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await response.json();
    delete currency.USDT;
    return currency;
  } catch (error) {
    console.log(error);
  }
}

export default fetchApi;
