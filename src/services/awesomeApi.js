const requestCurrency = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencyList = await response.json();
    return currencyList;
  } catch (error) {
    console.log(error);
  }
};

export default requestCurrency;
