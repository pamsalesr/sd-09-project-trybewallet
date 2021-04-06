const fetchAllCurrencyData = async () => {
  const endPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(endPoint);
    const currenciesList = await response.json();
    return currenciesList;
  } catch (error) {
    console.log(error);
  }
};

export default fetchAllCurrencyData;
