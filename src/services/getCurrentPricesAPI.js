export const getCurrentPrice = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json()
    .then((data) => (
      data
    ))
    .catch((error) => (
      error
    )));

export default getCurrentPrice;
