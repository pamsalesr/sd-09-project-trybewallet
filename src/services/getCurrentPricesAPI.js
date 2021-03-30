export const getCurrentPrice = () => {
  return fetch('https://economia.awesomeapi.com.br/json/all')
    .then((response) => {
      response.json()
        .then((data) => console.log(data));
    })
    .catch((error) => error);
};

export default getCurrentPrice;
