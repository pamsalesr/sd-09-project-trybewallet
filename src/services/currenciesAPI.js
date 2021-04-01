const currenciesAPI = async (currency) => (
  fetch(`https://economia.awesomeapi.com.br/json/${currency}`)
    .then((response) => (
      response.json()
        .then((data) => {
          delete data.USDT;
          return data;
        })
    ))
);
export default currenciesAPI;
