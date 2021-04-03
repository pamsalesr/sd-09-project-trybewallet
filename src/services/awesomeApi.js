// const requestCurrency = () => {
//   fetch('https://economia.awesomeapi.com.br/json/all')
//     .then((response) => (
//       response.json()
//         .then((data) => ({ data }))
//         .catch((error) => ({ error }))
//     ));
// };

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
