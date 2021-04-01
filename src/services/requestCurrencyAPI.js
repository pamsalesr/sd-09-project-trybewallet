export const requestCurrencies = async () => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const currencies = await response.json();
    return currencies;
  } catch (error) {
    return Error(error);
  }
};

export default requestCurrencies;
