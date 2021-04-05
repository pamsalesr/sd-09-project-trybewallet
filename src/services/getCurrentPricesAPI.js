export const getCurrentPrice = () => fetch('https://economia.awesomeapi.com.br/json/all')
  .then((response) => response.json()
    .then((data) => {
      delete data.USDT;
      return data;
    })
    .catch((error) => (
      error
    )));

export default getCurrentPrice;
