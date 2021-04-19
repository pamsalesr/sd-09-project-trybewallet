const apiURL = 'https://economia.awesomeapi.com.br/json/all';

const getCurrencies = () => (
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
);

export default getCurrencies;
