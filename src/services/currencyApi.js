const fetchCurrency = async () => {
  try {
    const repsonse = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currency = await repsonse.json();
    delete currency.USDT;
    return currency;
  } catch (error) {
    console.error(error);
  }
};
export default fetchCurrency;
