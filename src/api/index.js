function fetchCurrencies() {
  return (fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => response.json())
    .catch((error) => console.log(error))
  );
}

export default fetchCurrencies;
