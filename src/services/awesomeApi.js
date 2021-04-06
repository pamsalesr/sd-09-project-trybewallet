const filterCurrencyTypes = (currencyTypes) => {
  const filtered = [];
  Object.keys(currencyTypes).forEach((currency) => {
    filtered.push({ [currency]: currencyTypes[currency] });
  });
  const result = filtered.filter((value) => (
    Object.keys(value) != 'USDT' && Object.keys(value) != 'DOGE'));
  return result;
};

export const getCurrencyTypes = async () => {
  const awesomeApiEndPoint = 'https://economia.awesomeapi.com.br/json/all';
  try {
    const response = await fetch(awesomeApiEndPoint);
    const searchResult = await response.json();
    return filterCurrencyTypes(searchResult);
  } catch (error) {
    console.log(error);
  }
};
