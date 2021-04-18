const apiURL = 'https://economia.awesomeapi.com.br/json/all';

/* async function getCurrencies() {
  try {
    const response = await fetch(apiURL);
    const object = await response.json();
    return object;
  } catch (error) {
    console.log(error);
  }
} */

const getCurrencies = () => (
  fetch(apiURL)
    .then((response) => response.json())
    .then((data) => data)
    .catch((error) => error)
);

export default getCurrencies;
