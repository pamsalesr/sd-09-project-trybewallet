async function fetchCurrencies() {
  const getCurrencies = await fetch('https://economia.awesomeapi.com.br/json/all');
  const response = await getCurrencies.json();
  return response;
}

export default fetchCurrencies;
